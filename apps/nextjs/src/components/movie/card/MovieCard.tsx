import { clientEnv } from '../../../env/schema.mjs';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@acme/api/src/utils/types/tmdb';

export type MovieCardProps = {
  movie: Movie;
};
export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="relative aspect-[1/1.5] w-[100px] overflow-hidden rounded-md md:w-[200px]">
      <Link href={`/movie/${movie.id}`} draggable={false} className="relative block h-full w-full">
        <Image
          width={200}
          height={300}
          loading="eager"
          className="object-cover"
          draggable={false}
          src={`https://${clientEnv.NEXT_PUBLIC_TMDB_IMAGE_URL}/t/p/w200${movie.poster_path}`}
          alt={`Poster of ${movie.title}`}
        />
      </Link>
    </div>
  );
}
