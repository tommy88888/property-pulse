'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';

type InfoBoxProps = {
  heading: string;
  backgroundColor: string;
  textColor?: string;
  buttonInfo: {
    text: string;
    link: string;
    backgroundColor: string;
  };
  children: React.ReactNode;
};

const InfoBox = ({
  heading,
  backgroundColor,
  textColor,
  buttonInfo,
  children,
}: InfoBoxProps) => {
  return (
    <div className={cn('p-6 rounded-lg shadow-md', backgroundColor)}>
      <h2 className={cn('text-2xl font-bold', textColor)}>{heading}</h2>
      <p className={cn('mt-2 mb-4', textColor)}>{children}</p>
      <Link
        href={buttonInfo.link}
        className={cn(
          'inline-block  text-white rounded-lg px-4 py-2 hover:opacity-80',
          buttonInfo.backgroundColor
        )}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
