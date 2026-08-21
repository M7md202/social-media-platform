'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, description, footer, hoverable, children, ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-xl border border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-800 p-6 ${hoverable ? 'hover:shadow-lg transition-shadow' : ''} ${className || ''}`}
      {...props}
    >
      {title && <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">{title}</h3>}
      {description && <p className="text-sm text-dark-600 dark:text-dark-400 mb-4">{description}</p>}
      <div className="flex-1">{children}</div>
      {footer && <div className="mt-4 pt-4 border-t border-dark-200 dark:border-dark-700">{footer}</div>}
    </div>
  )
);

Card.displayName = 'Card';
