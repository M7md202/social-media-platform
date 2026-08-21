'use client';

import React from 'react';
import { Sidebar } from '@components/Sidebar';
import { ToastContainer } from '@components/ToastContainer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64">
        {children}
        <ToastContainer />
      </main>
    </div>
  );
}
