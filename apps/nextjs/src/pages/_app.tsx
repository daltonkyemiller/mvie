// src/pages/_app.tsx
import '../styles/globals.css';
import type { AppType } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { trpc } from '../utils/trpc';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { Layout } from '@components';

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <>
      <Head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClerkProvider {...pageProps}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ClerkProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
