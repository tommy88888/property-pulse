'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import Sidebar from './sidebar';
import { FcMenu } from 'react-icons/fc';

type MobileSidebarProps = {};

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition '>
        <FcMenu className='h-10 w-10 ' />
      </SheetTrigger>
      <SheetContent side='left' className='p-0 bg-white '>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
