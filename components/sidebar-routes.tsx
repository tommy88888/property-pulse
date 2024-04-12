'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { FcAbout, FcDepartment, FcHome, FcPlus } from 'react-icons/fc';
import SidebarItem from './sidebar-item';

type SidebarRoutesProps = {};

const SidebarRoutes = () => {
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
        href: '/properties',
      },
      {
        icon: FcPlus,
        label: 'Add Property',
        active: pathname === '/properties/add',
        href: '/properties/add',
      },
      {
        icon: FcPlus,
        label: 'TESTING',
        active: pathname === '/test',
        href: '/test',
      },
      {
        icon: FcAbout,
        label: 'About',
        active: pathname === '/about',
        href: '/about',
      },
    ],
    [pathname]
  );
  return (
    <div className='flex flex-col w-full '>
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
