'use client';

import React from 'react';

interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

const typeStyles = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-blue-500 text-white',
  warning: 'bg-yellow-500 text-white',
};

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${typeStyles[type]} rounded-lg px-4 py-3 shadow-lg animate-slideIn`}>
      <div className="flex items-center gap-2">
        {type === 'success' && '✓'}
        {type === 'error' && '✕'}
        {type === 'info' && 'ⓘ'}
        {type === 'warning' && '⚠'}
        {message}
      </div>
    </div>
  );
};
