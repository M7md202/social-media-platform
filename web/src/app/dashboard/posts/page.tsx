'use client';

import React, { useState } from 'react';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Input } from '@components/Input';
import { Tabs } from '@components/Tabs';
import { Badge } from '@components/Badge';
import { PlatformBadge } from '@components/PlatformBadge';

const recentPosts = [
  {
    id: 1,
    title: 'Summer Collection Launch',
    content: 'Excited to announce our new summer collection! 🌞',
    platforms: ['instagram', 'facebook'],
    status: 'published',
    likes: 2450,
    comments: 189,
    publishedAt: '2024-08-20 14:30',
  },
  {
    id: 2,
    title: 'Weekly Tips & Tricks',
    content: 'Top 5 productivity hacks for marketers',
    platforms: ['twitter', 'linkedin'],
    status: 'scheduled',
    publishedAt: '2024-08-22 10:00',
  },
  {
    id: 3,
    title: 'Behind the Scenes',
    content: 'Check out our team in action!',
    platforms: ['instagram'],
    status: 'draft',
  },
];

export default function PostsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [showComposer, setShowComposer] = useState(false);

  const tabs = [
    { id: 'all', label: 'All Posts', icon: '📄' },
    { id: 'published', label: 'Published', icon: '✅' },
    { id: 'scheduled', label: 'Scheduled', icon: '⏰' },
    { id: 'draft', label: 'Drafts', icon: '📝' },
  ];

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Posts</h1>
          <p className="text-dark-600 dark:text-dark-400 mt-2">Create, schedule, and manage your social media posts</p>
        </div>
        <Button variant="primary" onClick={() => setShowComposer(true)}>
          ✍️ Create Post
        </Button>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Posts List */}
      <div className="mt-6 space-y-4">
        {recentPosts.map((post) => (
          <Card key={post.id} hoverable>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-dark-900 dark:text-white">{post.title}</h3>
                  <Badge
                    label={post.status}
                    variant={post.status === 'published' ? 'success' : post.status === 'scheduled' ? 'info' : 'default'}
                  />
                </div>
                <p className="text-dark-600 dark:text-dark-400 mb-3">{post.content}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.platforms.map((platform) => (
                    <PlatformBadge key={platform} platform={platform as any} size="sm" />
                  ))}
                </div>
                {post.publishedAt && (
                  <p className="text-sm text-dark-500 dark:text-dark-500">
                    {post.status === 'published' ? 'Published:' : 'Scheduled:'} {post.publishedAt}
                  </p>
                )}
              </div>
              <div className="text-right">
                {post.status === 'published' && (
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="font-medium text-dark-900 dark:text-white">{post.likes}</span>
                      <span className="text-dark-600 dark:text-dark-400"> ❤️</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-dark-900 dark:text-white">{post.comments}</span>
                      <span className="text-dark-600 dark:text-dark-400"> 💬</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-dark-200 dark:border-dark-700 flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1">
                Edit
              </Button>
              <Button variant="secondary" size="sm" className="flex-1">
                View
              </Button>
              {post.status === 'draft' && (
                <Button variant="primary" size="sm" className="flex-1">
                  Publish
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Post Composer Modal */}
      {showComposer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-dark-900 dark:text-white">Create Post</h2>
              <button onClick={() => setShowComposer(false)} className="text-dark-600 dark:text-dark-400 text-2xl">
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-medium text-dark-900 dark:text-white mb-3">Select Platforms</label>
                <div className="grid grid-cols-3 gap-3">
                  {['instagram', 'facebook', 'twitter', 'linkedin', 'youtube', 'tiktok'].map((platform) => (
                    <button
                      key={platform}
                      className="p-3 border-2 border-dark-200 dark:border-dark-700 rounded-lg hover:border-primary-500 transition-all"
                    >
                      <PlatformBadge platform={platform as any} size="sm" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">Content</label>
                <textarea
                  className="w-full h-32 p-3 border border-dark-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="What's on your mind?"
                />
              </div>

              {/* Scheduling */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">Time</label>
                  <Input type="time" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button variant="secondary" size="lg" className="flex-1" onClick={() => setShowComposer(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="lg" className="flex-1">
                  Schedule Post
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
