// src/pages/_app.tsx
import '../styles/globals.css';
import type { AppType } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { trpc } from '../utils/trpc';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Head from 'next/head';

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const path = usePathname();
  return (
    <>
      <Head>
        <title>Mvies</title>
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <ClerkProvider {...pageProps}>
        <motion.main key={path} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Component {...pageProps} />
        </motion.main>
      </ClerkProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
