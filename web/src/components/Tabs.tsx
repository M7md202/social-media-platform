'use client';

import React from 'react';

interface TabsProps {
  tabs: Array<{ id: string; label: string; icon?: React.ReactNode }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children?: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange, children }) => {
  return (
    <div className="w-full">
      <div className="flex gap-1 border-b border-dark-200 dark:border-dark-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-all border-b-2 ${
              activeTab === tab.id
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
};
