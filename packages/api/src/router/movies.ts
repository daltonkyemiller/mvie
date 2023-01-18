import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { Movie, TMDBDiscoverResponse, TMDBMovieDetailsResponse } from '../utils/types/tmdb';
import { flatten } from 'lodash';
import { TMDB_GENRES } from '../utils/constants';

export const moviesRouter = router({
  discover: publicProcedure.input(z.number().optional()).query(async ({ input: numOfPagesToFetch }) => {
    const results = await Promise.all(
      new Array(numOfPagesToFetch || 10).fill(0).map(async (_, i) => {
        const res = await fetch(
          `${process.env.TMDB_URL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&page=${
            i + 1
          }&with_watch_providers=99&watch_region=US`,
        );
        const data = (await res.json()) as TMDBDiscoverResponse;
        return data.results;
      }),
    );

    const flattend = flatten(results);
    const moviesByGenre = flattend.reduce((acc, movie) => {
      const primaryGenreName = TMDB_GENRES.find((g) => g.id === movie.genre_ids[0])?.name;
      if (!primaryGenreName) return acc;
      if (!acc[primaryGenreName]) acc[primaryGenreName] = [];
      acc[primaryGenreName]?.push(movie);
      return acc;
    }, {} as { [key in typeof TMDB_GENRES[number]['name']]?: Movie[] });

    return moviesByGenre;
  }),
  moreDetails: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input: { id } }) => {
    const res = await fetch(`${process.env.TMDB_URL}/movie/${id}?api_key=${process.env.TMDB_API_KEY}`);
    return (await res.json()) as TMDBMovieDetailsResponse;
  }),
});
