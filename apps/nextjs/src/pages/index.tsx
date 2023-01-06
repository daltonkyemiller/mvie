import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import type { inferProcedureOutput } from '@trpc/server';
import type { AppRouter } from '@acme/api';
import { useAuth, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { FC, useEffect, useMemo, useState } from 'react';
import { motion, MotionConfig, TargetAndTransition, useAnimationControls, useScroll, Variants } from 'framer-motion';
import { random } from 'lodash';

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
    () => ({ className: 'relative aspect-[4/3] w-[300px] overflow-hidden rounded-xl' }),
    [],
  );

  const images = [
    'fight_club.jpeg',
    'halloween.png',
    'taxi_driver.jpeg',
    'tenebre.jpeg',
    'virgin_suicides.jpeg',
  ] as const;

  const containerControls = useAnimationControls();
  const centerControls = useAnimationControls();
  const leftSideControls = useAnimationControls();
  const rightSideControls = useAnimationControls();
  const headerControls = useAnimationControls();
  const individualImageControls = useAnimationControls();

  const floatAround: TargetAndTransition = {
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    },
  };

  const sequence = async () => {
    containerControls.set({ y: -100 });
    leftSideControls.set({ opacity: 0 });
    rightSideControls.set({ opacity: 0 });
    await individualImageControls.start((i) => ({
      scale: [0, 1],
      transition: {
        delay: (i ?? 1) * random(1, 0.5),
        type: 'spring',
        damping: 10,
        duration: 0.35,
      },
    }));
    leftSideControls.start({ opacity: 1, transition: { duration: 0.25 } });
    rightSideControls.start({ opacity: 1, transition: { duration: 0.25 } });
    await containerControls.start({
      y: [-100, 0],
    });
    headerControls.start({
      opacity: [0, 1],
    });
  };

  useEffect(() => {
    sequence();
  }, [sequence]);

  return (
    <>
      <Head>
        <title>Mvie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex h-full w-full flex-col items-center justify-center gap-10 p-10">
        <motion.header className="self-start" animate={headerControls} initial={{ opacity: 0 }}>
          <h1 className="font-brand font-display text-9xl">mvie</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, quaerat.</p>
        </motion.header>
        <MotionConfig transition={{ duration: 2 }}>
          <motion.div className="flex items-center justify-center gap-10" animate={containerControls}>
            {/*Far Left Side*/}
            <motion.div animate={leftSideControls}>
              <div {...imgContainerProps} className={clsx(imgContainerProps.className, '!w-[300px]')}>
                <Image src={`/img/${images[2]}`} alt={images[2]} {...imgProps} />
              </div>
            </motion.div>

            {/*Left Side*/}
            <div className="flex flex-col items-center justify-center gap-5">
              <motion.div
                {...imgContainerProps}
                className={clsx(imgContainerProps.className, `!aspect-[3/4] !w-[200px]`)}
                animate={individualImageControls}>
                <Image src={`/img/${images[0]}`} alt={images[0]} {...imgProps} />
              </motion.div>
              <motion.div {...imgContainerProps} animate={individualImageControls}>
                <Image src={`/img/${images[1]}`} alt={images[1]} {...imgProps} />
              </motion.div>
            </div>

            {/*Center */}
            <motion.div animate={centerControls}>
              <motion.div
                {...imgContainerProps}
                className={clsx(imgContainerProps.className, 'w-[400px]')}
                animate={individualImageControls}
                custom={0}>
                <Image src={`/img/${images[2]}`} alt={images[2]} {...imgProps} />
              </motion.div>
            </motion.div>

            {/*Right side*/}
            <div className="flex flex-col items-center justify-center gap-5">
              <motion.div {...imgContainerProps} animate={individualImageControls}>
                <Image src={`/img/${images[3]}`} alt={images[3]} {...imgProps} />
              </motion.div>
              <motion.div
                {...imgContainerProps}
                className={clsx(imgContainerProps.className, '!aspect-square w-[200px]')}
                animate={individualImageControls}>
                <Image src={`/img/${images[4]}`} alt={images[4]} {...imgProps} />
              </motion.div>
            </div>

            {/*Far Right side*/}
            <motion.div animate={rightSideControls}>
              <div {...imgContainerProps} className={clsx(imgContainerProps.className, '!w-[300px]')}>
                <Image src={`/img/${images[2]}`} alt={images[2]} {...imgProps} />
              </div>
            </motion.div>
          </motion.div>
        </MotionConfig>
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
