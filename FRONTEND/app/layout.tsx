import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata = {
  title: 'SportLens',
  description: 'AI-Powered Mobile Platform for Democratizing Sports Talent Assessment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet"/>
      </head>
      <body className="layer-base text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
