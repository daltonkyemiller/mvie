import Head from 'next/head';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';

export default function Page({
  children,
  className,
  title = 'mvie',
  withPadding = true,
}: PropsWithChildren<{ title?: string; className?: string; withPadding?: boolean }>) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section
        className={clsx(
          'flex min-h-screen w-full flex-col gap-10 overflow-auto overflow-hidden pt-[3rem]',
          withPadding && 'p-10',
          className,
        )}>
        {children}
      </section>
    </>
  );
}
