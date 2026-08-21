'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@store/index';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@components/Button';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Accounts', href: '/dashboard/accounts', icon: '🔗' },
  { name: 'Posts', href: '/dashboard/posts', icon: '✍️' },
  { name: 'Calendar', href: '/dashboard/calendar', icon: '📅' },
  { name: 'Campaigns', href: '/dashboard/campaigns', icon: '🚀' },
  { name: 'Messages', href: '/dashboard/messages', icon: '💬' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
  { name: 'Automation', href: '/dashboard/automation', icon: '⚙️' },
  { name: 'Leads', href: '/dashboard/leads', icon: '👥' },
  { name: 'AI Studio', href: '/dashboard/ai-studio', icon: '🤖' },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-dark-800 border-r border-dark-200 dark:border-dark-700 transition-all duration-300 flex flex-col h-screen fixed left-0 top-0 z-40`}>
      {/* Logo */}
      <div className="p-6 border-b border-dark-200 dark:border-dark-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && <h1 className="text-xl font-bold text-primary-500">SocialHub</h1>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-dark-100 dark:hover:bg-dark-700 rounded"
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium'
                  : 'text-dark-600 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-dark-200 dark:border-dark-700 space-y-3">
        {!isCollapsed && (
          <div className="p-3 bg-dark-50 dark:bg-dark-700 rounded-lg">
            <p className="text-sm font-medium text-dark-900 dark:text-white">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-dark-600 dark:text-dark-400">{user?.email}</p>
          </div>
        )}
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={() => {
            logout();
            window.location.href = '/auth/login';
          }}
        >
          {isCollapsed ? '🚪' : 'Logout'}
        </Button>
      </div>
    </div>
  );
};
