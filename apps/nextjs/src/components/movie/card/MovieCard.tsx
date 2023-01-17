import { Movie } from '@acme/api/src/types/tmdb';
import { clientEnv } from '../../../env/schema.mjs';
import Image from 'next/image';

export type MovieCardProps = {
  movie: Movie;
};
export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="relative aspect-[9/16] w-[200px]">
      <Image
        fill
        objectFit="cover"
        className="pointer-events-none"
        src={`https://${clientEnv.NEXT_PUBLIC_TMDB_IMAGE_URL}/t/p/w500${movie.poster_path}`}
        alt={`Poster of ${movie.title}`}
      />
    </div>
  );
}
