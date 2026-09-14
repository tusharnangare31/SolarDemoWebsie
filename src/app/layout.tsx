import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'SunTech Solar | India\'s Trusted Solar EPC Company',
    template: '%s | SunTech Solar',
  },
  description:
    'Leading solar EPC company in India. Residential, commercial & industrial solar panel installation with government subsidy assistance. Get free quote today!',
  keywords: [
    'solar panels India',
    'solar installation',
    'rooftop solar',
    'solar EPC',
    'PM Surya Ghar Yojana',
    'solar subsidy',
    'renewable energy',
  ],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'SunTech Solar | India\'s Trusted Solar EPC Company',
    description: 'Save up to 90% on electricity bills. Get a free solar quote today!',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col bg-white">
        <Toaster position="top-right" />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
