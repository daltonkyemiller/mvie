import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useCallback } from 'react';
import { useAuth, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import clsx from 'clsx';

export const Nav = ({ path }: { path: string | null }) => {
  const { isSignedIn } = useAuth();
  const pathStyles = useCallback(
    (p: string) => clsx('transition-all opacity-50 hover:opacity-100', { 'opacity-100': p === path }),
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
            <li className={pathStyles('/sign-in')}>
              <Link href="/sign-in">Sign in</Link>
            </li>
            <li className={pathStyles('/sign-up')}>
              <Link href="/sign-up">Sign up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default function Layout({ children }: PropsWithChildren) {
  const path = usePathname();
  return (
    <>
      <Nav path={path} />
      <motion.main key={path} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {children}
      </motion.main>
    </>
  );
}
