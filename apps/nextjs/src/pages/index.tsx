import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import type { inferProcedureOutput } from '@trpc/server';
import type { AppRouter } from '@acme/api';
import { useAuth, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { FC, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';

const PostCard: FC<{
  post: inferProcedureOutput<AppRouter['post']['all']>[number];
}> = ({ post }) => {
  return (
    <div className="max-w-2xl rounded-lg border-2 border-gray-500 p-4 transition-all hover:scale-[101%]">
      <h2 className="text-2xl font-bold text-[hsl(280,100%,70%)]">{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

const Home: NextPage = () => {
  const imgProps = useMemo(() => ({ fill: true, className: 'h-full w-full object-cover' }), []);
  const imgContainerProps = useMemo(
    () => ({ className: 'relative aspect-[4/3] w-[200px] overflow-hidden rounded-xl' }),
    [],
  );

  const images = [
    'fight_club.jpeg',
    'halloween.png',
    'taxi_driver.jpeg',
    'tenebre.jpeg',
    'virgin_suicides.jpeg',
  ] as const;

  const centerVariants: Variants = {
    start: { opacity: 1, scale: 5 },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: { opacity: 0 },
  };

  return (
    <>
      <Head>
        <title>Mvie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex h-full w-full items-center justify-center">
        <div className="grid grid-flow-col grid-cols-3 items-center justify-items-center gap-10">
          <motion.div className="flex flex-col gap-5">
            <div {...imgContainerProps}>
              <Image src={`/img/${images[0]}`} alt={images[0]} {...imgProps} />
            </div>
            <div {...imgContainerProps}>
              <Image src={`/img/${images[1]}`} alt={images[1]} {...imgProps} />
            </div>
          </motion.div>
          <motion.div variants={centerVariants} initial="start" animate="in" exit="out">
            <div {...imgContainerProps} className={clsx(imgContainerProps.className, 'w-[400px]')}>
              <Image src={`/img/${images[2]}`} alt={images[2]} {...imgProps} />
            </div>
          </motion.div>
          <div className="flex flex-col gap-5">
            <div {...imgContainerProps}>
              <Image src={`/img/${images[3]}`} alt={images[3]} {...imgProps} />
            </div>
            <div {...imgContainerProps}>
              <Image src={`/img/${images[4]}`} alt={images[4]} {...imgProps} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

const AuthShowcase: FC = () => {
  const { isSignedIn } = useAuth();
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(undefined, { enabled: !!isSignedIn });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isSignedIn && (
        <>
          <p className="text-center text-2xl text-white">
            {secretMessage && (
              <span>
                {' '}
                {secretMessage} click the user button!
                <br />
              </span>
            )}
          </p>
          <div className="flex items-center justify-center">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: '3rem',
                    height: '3rem',
                  },
                },
              }}
            />
          </div>
        </>
      )}
      {!isSignedIn && (
        <p className="text-center text-2xl text-white">
          <Link href="/sign-in">Sign In</Link>
        </p>
      )}
    </div>
  );
};
