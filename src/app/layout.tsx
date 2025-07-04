import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { DEFAULT_METADATA } from '@/app.config';
import '@/theme/index.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: DEFAULT_METADATA.title,
  description:
    'A modern design system, component library and application development kit'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
