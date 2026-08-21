'use client';

import React from 'react';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  icon?: React.ReactNode;
  onClose?: () => void;
}

const variantStyles = {
  success: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
  warning: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
  error: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
  info: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
  default: 'bg-dark-100 dark:bg-dark-700 text-dark-900 dark:text-white',
};

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'default', icon, onClose }) => {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${variantStyles[variant]}`}>
      {icon}
      {label}
      {onClose && (
        <button onClick={onClose} className="ml-1 hover:opacity-70">
          ×
        </button>
      )}
    </span>
  );
};
