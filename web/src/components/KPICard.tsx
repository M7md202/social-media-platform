'use client';

import React from 'react';

interface KPICardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  color?: 'blue' | 'green' | 'red' | 'purple';
}

const colorStyles = {
  blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
};

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  unit,
  icon,
  trend,
  color = 'blue',
}) => {
  return (
    <div className="rounded-xl border border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-800 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-dark-600 dark:text-dark-400">{label}</p>
          <div className="mt-2 flex items-baseline gap-1">
            <h3 className="text-3xl font-bold text-dark-900 dark:text-white">{value}</h3>
            {unit && <span className="text-lg text-dark-600 dark:text-dark-400">{unit}</span>}
          </div>
          {trend && (
            <div className={`mt-2 flex items-center gap-1 text-sm font-medium ${
              trend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {trend.direction === 'up' ? '↑' : '↓'} {trend.value}% from last month
            </div>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-lg ${colorStyles[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
