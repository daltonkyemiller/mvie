import { Carousel, Page } from '@components';
import { trpc } from '@utils/trpc';
import MovieCard from '../../components/movie/card/MovieCard';

export default function Home() {
  const { data, isLoading } = trpc.movies.discover.useQuery(undefined);
  if (isLoading) return <div>Loading...</div>;
  console.log({ data });
  return (
    <Page title="Home">
      <Carousel>
        {data?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Carousel>
    </Page>
  );
}
