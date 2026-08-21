'use client';

import React from 'react';
import { Platform } from '@types/index';

const platformColors: Record<Platform, { bg: string; text: string; icon: string }> = {
  facebook: { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-700 dark:text-blue-300', icon: '𝕱' },
  instagram: { bg: 'bg-pink-100 dark:bg-pink-900', text: 'text-pink-700 dark:text-pink-300', icon: '📷' },
  twitter: { bg: 'bg-sky-100 dark:bg-sky-900', text: 'text-sky-700 dark:text-sky-300', icon: '𝕏' },
  linkedin: { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-700 dark:text-blue-300', icon: 'in' },
  youtube: { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-700 dark:text-red-300', icon: '▶' },
  tiktok: { bg: 'bg-gray-100 dark:bg-gray-900', text: 'text-gray-700 dark:text-gray-300', icon: '♪' },
  telegram: { bg: 'bg-cyan-100 dark:bg-cyan-900', text: 'text-cyan-700 dark:text-cyan-300', icon: '✈' },
  whatsapp: { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-700 dark:text-green-300', icon: '💬' },
  pinterest: { bg: 'bg-red-100 dark:bg-red-900', text: 'text-red-700 dark:text-red-300', icon: '📌' },
};

interface PlatformBadgeProps {
  platform: Platform;
  size?: 'sm' | 'md' | 'lg';
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({ platform, size = 'md' }) => {
  const style = platformColors[platform];
  const sizeClass = size === 'sm' ? 'px-2 py-1 text-xs' : size === 'md' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-base';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${style.bg} ${style.text} ${sizeClass}`}>
      <span>{style.icon}</span>
      {platform.charAt(0).toUpperCase() + platform.slice(1)}
    </span>
  );
};
