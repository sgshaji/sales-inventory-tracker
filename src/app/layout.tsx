import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Authentication - Your App</title>
      </head>
      <body>
        <ThemeProvider defaultTheme="light" storageKey="auth-theme">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}