import { Loading, Page } from '@components';
import { trpc } from '@utils/trpc';
import { useRouter } from 'next/router';
import { clientEnv } from '../../env/schema.mjs';
import Image from 'next/image';

export default function MovieDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  if (typeof id !== 'string') return null;

  const { data: movie, isLoading } = trpc.movies.moreDetails.useQuery({ id }, { enabled: !!id });
  if (isLoading || !movie) return <Loading />;
  return (
    <Page>
      <div className="relative aspect-[1.77/1] w-full">
        <Image
          className="object-cover object-center"
          src={`https://${clientEnv.NEXT_PUBLIC_TMDB_IMAGE_URL}/t/p/original${movie.backdrop_path}`}
          fill
          alt={`Poster for ${movie.title}`}
        />
      </div>
    </Page>
  );
}
