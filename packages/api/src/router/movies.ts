import { publicProcedure, router } from '../trpc';
import { TMDBApiResponse } from '../types/tmdb';

export const moviesRouter = router({
  discover: publicProcedure.query(async () => {
    const res = await fetch(`${process.env.TMDB_URL}/discover/movie?api_key=${process.env.TMDB_API_KEY}`);
    return (await res.json()) as TMDBApiResponse;
  }),
});
