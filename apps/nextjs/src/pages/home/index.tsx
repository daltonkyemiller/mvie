import { Carousel, Loading, Page } from '@components';
import { trpc } from '@utils/trpc';
import MovieCard from '../../components/movie/card/MovieCard';

export default function Home() {
  const { data: moviesByGenre, isLoading } = trpc.movies.discover.useQuery(100);
  if (isLoading || !moviesByGenre) return <Loading />;
  return (
    <Page title="Home">
      {Object.entries(moviesByGenre).map(([genre, movies]) => (
        <Carousel gap="0.5rem" caption={genre} key={genre} childKeyPrefix={genre}>
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Carousel>
      ))}
    </Page>
  );
}
