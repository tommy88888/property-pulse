import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Nunito } from 'next/font/google';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { cn } from '@/lib/utils';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from '@/context/global-context';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'photoswipe/dist/photoswipe.css';

const inter = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PropertyPulse | FInd The Perfect Rental',
  description: 'Find your dream rental property',
  keywords: 'rental, find rentals, property, find properties',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <GlobalProvider>
      <SessionProvider session={session}>
        <html lang='en'>
          <body
            className={cn('flex flex-col justify-between', inter.className)}
          >
            <Navbar />
            {children}
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </SessionProvider>
    </GlobalProvider>
  );
}
