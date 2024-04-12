'use client';

// import { UserButton, useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

import { LogOut } from 'lucide-react';
import Link from 'next/link';
import SearchInput from './search-input';
import { useHydration } from '@/lib/hydration';
// import { isTeacher } from '@/lib/teacher';
import { Button } from '../ui/button';
import { useState } from 'react';

type NavbarRoutesProps = {};

const NavbarRoutes = () => {
  const isMounted = useHydration();
  const pathname = usePathname();
  // const { userId } = useAuth();

  // if (!userId) return null;
  // to fake userId & teacher status
  const [isTeacher, setIsTeacher] = useState(null);

  let userId = null;

  if (!isTeacher === null) return;

  const isTeacherPage = pathname?.startsWith('/teacher');
  const isPlayerPage = pathname?.includes('/courses');
  const isSearchPage = pathname === '/search';

  if (!isMounted) return null;

  return (
    <>
      {isSearchPage && (
        <div className='hidden md:block'>
          <SearchInput />
        </div>
      )}
      <div className='flex gap-x-2 ml-auto '>
        {isTeacherPage || isPlayerPage ? (
          <Link href='/'>
            <Button size='sm' variant='ghost'>
              <LogOut className='h-4 w-4 mr-2 ' />
              Exit
            </Button>
          </Link>
        ) : // @ts-ignore
        isTeacher(userId) ? (
          <Link href='/teacher/courses'>
            <Button size='sm' variant='ghost'>
              Teacher Mode
            </Button>
          </Link>
        ) : null}
        {/* <UserButton afterSignOutUrl='/' /> */}
      </div>
    </>
  );
};

export default NavbarRoutes;
