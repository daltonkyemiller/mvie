import Head from 'next/head';
import { PropsWithChildren } from 'react';

export default function Page({ children, title = 'mvie' }: PropsWithChildren<{ title?: string }>) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className="flex h-screen w-full flex-col gap-10 overflow-hidden p-10 pt-[3rem]">{children}</section>
    </>
  );
}
