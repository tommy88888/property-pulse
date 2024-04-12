import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { FcAbout, FcDepartment, FcHome } from 'react-icons/fc';

export const Route = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: FcHome,
        label: 'Home',
        active: pathname === '/',
        href: '/',
      },
      {
        icon: FcDepartment,
        label: 'Properties',
        active: pathname === '/properties',
        href: '/Properties',
      },
      {
        icon: FcAbout,
        label: 'About',
        active: pathname === '/about',
        href: '/About',
      },
    ],
    [pathname]
  );

  return routes;
};
