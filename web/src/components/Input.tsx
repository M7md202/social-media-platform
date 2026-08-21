'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-600 dark:text-dark-400">{icon}</div>}
        <input
          ref={ref}
          className={`w-full rounded-lg border border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-800 px-4 py-2 ${icon ? 'pl-10' : ''} text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            error ? 'border-red-500 focus:ring-red-500' : ''
          } ${className || ''}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
);

Input.displayName = 'Input';
