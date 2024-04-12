'use client';

import { useGlobalContext } from '@/context/global-context';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';

type UnreadMessageCountProps = {
  session: Session;
};

const UnreadMessageCount = ({ session }: UnreadMessageCountProps) => {
  const { unreadCount, setUnreadCount } = useGlobalContext();
  useEffect(() => {
    if (!session) return;

    const fetchUnreadMessages = async () => {
      try {
        const res = await fetch('/api/messages/unread-count');

        if (res.status === 200) {
          const data = await res.json();
          setUnreadCount(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUnreadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    unreadCount > 0 && (
      <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
        {unreadCount}
      </span>
    )
  );
};

export default UnreadMessageCount;
