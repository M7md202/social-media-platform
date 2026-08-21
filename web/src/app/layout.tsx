'use client';

import React from 'react';
import { useThemeStore } from '@store/index';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDark } = useThemeStore();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <html lang="en" dir="ltr">
      <head>
        <title>Social Media Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="min-h-screen bg-white dark:bg-dark-900">
          {children}
        </div>
      </body>
    </html>
  );
}
