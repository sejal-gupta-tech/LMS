import { Inter, Dancing_Script } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';
import AppShell from '@/components/layout/AppShell';
import { isRtlLocale } from '@/lib/i18n';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing-script' });

export const metadata = {
  title: 'LMS One Platform',
  description: 'A modular Next.js LMS platform with Opportunities integration.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get('x-locale') || 'en';

  return (
    <html lang={locale} dir={isRtlLocale(locale) ? 'rtl' : 'ltr'}>
      <body className={`${inter.variable} ${dancingScript.variable} font-sans`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
