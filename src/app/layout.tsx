import { Providers } from '@/components/providers';
import '@/styles/globals.css';

export const metadata = {
  title: 'Authentication - Your App',
  description: 'Authentication system for your application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
