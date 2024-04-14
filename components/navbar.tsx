'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { Dancing_Script } from 'next/font/google';
import { FcGoogle } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Logo from './logo';
import Sidebar from './sidebar';
import MobileSidebar from './mobile-sidebar';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import Notification from './ui/notification';
import UnreadMessageCount from './unread-message-count';

const ds = Dancing_Script({ subsets: ['latin'] });

type NavbarProps = {
  providers: {
    callbackUrl: string;
    id: string;
    name: string;
    signinUrl: string;
    type: 'string';
  };
};

const Navbar = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState<any | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  // console.log(profileImage);

  return (
    <nav className='bg-blue-700/90 border-b border-blue-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          {/* <div className='absolute inset-y-0 left-0 flex items-center md:hidden'> */}
          {/* Mobile menu button*/}

          <MobileSidebar />

          <div className='hidden  md:flex flex-1 items-center justify-center md:items-center md:justify-start'>
            {/* Logo */}
            <Link className='  flex flex-shrink-0 items-center ' href='/'>
              <Logo />
              <span
                className={cn(
                  'hidden md:block text-white text-sm font-bold ml-2',
                  ds.className
                )}
              >
                Property
              </span>
            </Link>
            {/* Desktop Menu Hidden below md screens */}
            <div className='hidden md:ml-6 md:block'>
              <div className='flex flex-row  space-x-2 items-center'>
                <Link
                  href='/'
                  className={cn(
                    'text-white text-xs my-auto h-full  hover:bg-blue-800 hover:text-white rounded-md px-3 py-2  shadow-md',
                    pathname === '/' && 'bg-blue-700 text-white/90'
                  )}
                >
                  Home
                </Link>
                <Link
                  href='/properties'
                  className={cn(
                    'text-white text-xs  hover:bg-blue-800 hover:text-white rounded-md px-3 py-2  shadow-md',
                    pathname === '/properties' && 'bg-blue-700 text-white/90'
                  )}
                >
                  Properties
                </Link>

                {session && (
                  <Link
                    href='/properties/add'
                    className={cn(
                      'text-white text-xs  hover:bg-blue-800 hover:text-white rounded-md px-3 py-2  shadow-md',
                      pathname === '/properties/add' &&
                        'bg-blue-700 text-white/90'
                    )}
                  >
                    Add Property
                  </Link>
                )}
              </div>
            </div>
          </div>
          {/* Right Side Menu (Logged Out) */}
          {!session && (
            <div className='hidden md:block md:ml-6'>
              <div className='flex items-center'>
                {providers &&
                  Object.values(providers).map((provider: any, i) => (
                    <button
                      key={i}
                      onClick={() => signIn(provider.id)}
                      className='flex items-center text-sm shadow-md text-white bg-gray-700/60 hover:bg-gray-700/30 hover:text-white rounded-md px-3 py-2'
                    >
                      <FcGoogle className='text-white mr-2 h-5 w-5 ' />
                      <span>Login or Register</span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Right Side Menu (Logged In) */}
          {session && (
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0'>
              <Link href='/messages' className='relative group'>
                <button
                  type='button'
                  className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                >
                  <span className='absolute -inset-1.5' />
                  <span className='sr-only'>View notifications</span>
                  {/* <svg
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                    />
                  </svg> */}
                  <Notification className='h-6 w-6' />
                </button>
                <UnreadMessageCount session={session} />
              </Link>
              {/* Profile dropdown button */}
              <div className='relative ml-3'>
                <div>
                  <Button
                    type='button'
                    className='relative flex rounded-full border-0 bg-sky-500/20 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500/60 focus:ring-offset-2 focus:ring-offset-sky-500/10 hover:bg-sky-500/40'
                    id='user-menu-button'
                    aria-expanded='false'
                    aria-haspopup='true'
                    size='icon'
                    onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  >
                    <span className='absolute -inset-1.5' />
                    <span className='sr-only'>Open user menu</span>
                    <Image
                      className='h-8 w-auto rounded-full'
                      width={40}
                      height={40}
                      src={profileImage || '/profile.svg'}
                      alt='profile'
                      priority
                    />
                  </Button>
                </div>
                {/* Profile dropdown */}
                {isProfileMenuOpen && (
                  <div
                    id='user-menu'
                    className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='user-menu-button'
                    tabIndex={-1}
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <Button
                      asChild
                      className='block px-4 py-2 text-sm text-gray-700'
                      size='sm'
                      variant='ghost'
                      role='menuitem'
                      tabIndex={-1}
                      id='user-menu-item-1'
                    >
                      <Link
                        href='/profile'
                        className='block px-4 py-2 text-sm text-gray-700'
                        role='menuitem'
                        tabIndex={0}
                        id='user-menu-item-0'
                      >
                        Your Profile
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className='block px-4 py-2 text-sm text-gray-700'
                      size='sm'
                      variant='ghost'
                      role='menuitem'
                      tabIndex={-1}
                      id='user-menu-item-3'
                    >
                      <Link
                        href='/properties/saved'
                        className='block px-4 py-2 text-sm text-gray-700'
                        role='menuitem'
                        tabIndex={-1}
                        id='user-menu-item-4'
                      >
                        Saved Properties
                      </Link>
                    </Button>
                    <Button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        signOut();
                      }}
                      asChild
                      type='button'
                      className='block px-4 py-2 text-sm text-gray-700'
                      size='sm'
                      variant='ghost'
                      role='menuitem'
                      tabIndex={-1}
                      id='user-menu-item-5'
                    >
                      <Link
                        href='/'
                        className='block px-4 py-2 text-sm text-gray-700'
                        role='menuitem'
                        tabIndex={-1}
                        id='user-menu-item-6'
                      >
                        Sign out
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}

      {isMobileMenuOpen && (
        <div className='hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 '>
          <Sidebar />

          {!session &&
            providers &&
            Object.values(providers).map((provider: any, i) => (
              <button
                key={i}
                onClick={() => signIn(provider.id)}
                className='flex items-center text-sm shadow-md text-white bg-gray-700/60 hover:bg-gray-700/30 hover:text-white rounded-md px-3 py-2'
              >
                <FcGoogle className='text-white mr-2 h-5 w-5 ' />
                <span>Login or Register</span>
              </button>
            ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
