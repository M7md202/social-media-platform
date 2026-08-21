'use client';

import React from 'react';
import { useNotificationStore } from '@store/index';
import Toast from './Toast';

export const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-md">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};
