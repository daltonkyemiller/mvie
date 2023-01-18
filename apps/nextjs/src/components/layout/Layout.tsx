import { AnimatePresence, motion } from 'framer-motion';
import { PropsWithChildren, useCallback } from 'react';
import { useAuth, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import clsx from 'clsx';

export const Nav = ({ path }: { path: string | null }) => {
  const { isSignedIn } = useAuth();
  const pathStyles = useCallback(
    (p: string, other?: string) =>
      clsx('relative transition-all opacity-50 hover:opacity-100', other, { 'opacity-100': p === path }),
    [path],
  );
  return (
    <nav className="fixed top-0 z-[9999] flex w-full p-2">
      <ul className="ml-auto flex w-full items-center gap-4">
        <li className={clsx('font-display mr-auto text-3xl', pathStyles('/'))}>
          <Link href="/">mvie</Link>
        </li>
        {isSignedIn ? (
          <li>
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
          </li>
        ) : (
          <>
            <li className={pathStyles('/sign-in', 'relative')}>
              <Link href="/sign-in">Sign in</Link>
              {path === '/sign-in' && (
                <motion.div layoutId="nav-underline" className="bg-dark absolute bottom-0 h-0.5 w-full" />
              )}
            </li>
            <li className={pathStyles('/sign-up')}>
              <Link href="/sign-up">Sign up</Link>
              {path === '/sign-up' && (
                <motion.div layoutId="nav-underline" className="bg-dark absolute bottom-0 h-0.5 w-full" />
              )}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default function Layout({ children, router }: PropsWithChildren<{ router: any }>) {
  return (
    <>
      <Nav path={router.asPath} />
      <AnimatePresence mode="wait">
        <motion.main key={router.asPath} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
}
