'use client';

import React, { useState } from 'react';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Badge } from '@components/Badge';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 7, 1));
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const calendarPosts: Record<number, any[]> = {
    15: [{ platform: 'instagram', title: 'Summer Launch' }],
    18: [{ platform: 'facebook', title: 'Weekly Tips' }],
    22: [{ platform: 'twitter', title: 'Live Session' }],
  };

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Content Calendar</h1>
        <p className="text-dark-600 dark:text-dark-400 mt-2">Schedule and manage your posts across all platforms</p>
      </div>

      {/* View Selector */}
      <div className="mb-6 flex gap-2">
        {(['month', 'week', 'day'] as const).map((v) => (
          <Button
            key={v}
            variant={view === v ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setView(v)}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </Button>
        ))}
      </div>

      {/* Month View */}
      {view === 'month' && (
        <Card>
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-dark-900 dark:text-white">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              >
                ← Prev
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              >
                Next →
              </Button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-semibold text-dark-900 dark:text-white py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square"></div>
            ))}
            {days.map((day) => {
              const posts = calendarPosts[day] || [];
              return (
                <div
                  key={day}
                  className="aspect-square border border-dark-200 dark:border-dark-700 rounded-lg p-2 bg-white dark:bg-dark-800 hover:bg-dark-50 dark:hover:bg-dark-700 cursor-pointer transition-colors"
                >
                  <div className="text-sm font-medium text-dark-900 dark:text-white mb-1">{day}</div>
                  <div className="space-y-1">
                    {posts.map((post, idx) => (
                      <div
                        key={idx}
                        className="text-xs px-1.5 py-0.5 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 truncate"
                      >
                        {post.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Quick Add Button */}
      <div className="mt-8">
        <Button variant="primary" size="lg">
          + Schedule Post
        </Button>
      </div>
    </div>
  );
}
