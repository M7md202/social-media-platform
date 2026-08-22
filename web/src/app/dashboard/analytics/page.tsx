'use client';

import React, { useState } from 'react';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Tabs } from '@components/Tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const analyticsData = {
  dailyEngagement: [
    { date: 'Mon', engagement: 450, reach: 2400, impressions: 4800 },
    { date: 'Tue', engagement: 520, reach: 2800, impressions: 5200 },
    { date: 'Wed', engagement: 480, reach: 2600, impressions: 4900 },
    { date: 'Thu', engagement: 690, reach: 3200, impressions: 6100 },
    { date: 'Fri', engagement: 810, reach: 3800, impressions: 7200 },
    { date: 'Sat', engagement: 720, reach: 3400, impressions: 6500 },
    { date: 'Sun', engagement: 640, reach: 3100, impressions: 5900 },
  ],
  topPosts: [
    { name: 'Post 1', value: 2450, likes: 1200, comments: 180, shares: 320 },
    { name: 'Post 2', value: 1890, likes: 980, comments: 150, shares: 250 },
    { name: 'Post 3', value: 1640, likes: 820, comments: 120, shares: 210 },
    { name: 'Post 4', value: 1240, likes: 620, comments: 90, shares: 180 },
  ],
  platformComparison: [
    { platform: 'Instagram', engagement: 4500, reach: 25000, conversions: 340 },
    { platform: 'Facebook', engagement: 3200, reach: 18000, conversions: 230 },
    { platform: 'Twitter', engagement: 2100, reach: 12000, conversions: 145 },
    { platform: 'LinkedIn', engagement: 1800, reach: 9000, conversions: 120 },
  ],
};

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'platforms', label: 'By Platform', icon: '🌐' },
    { id: 'content', label: 'Content Performance', icon: '📝' },
    { id: 'audience', label: 'Audience', icon: '👥' },
  ];

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Analytics</h1>
          <p className="text-dark-600 dark:text-dark-400 mt-2">Detailed analytics and performance metrics</p>
        </div>
        <select className="px-4 py-2 border border-dark-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Last year</option>
        </select>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="mt-6 space-y-6">
          <Card title="Engagement Trend">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.dailyEngagement}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="engagement" stroke="#0ea5e9" strokeWidth={2} />
                <Line type="monotone" dataKey="reach" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Top Performing Posts">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.topPosts}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Engagement Breakdown">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={analyticsData.topPosts} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                    {analyticsData.topPosts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#0ea5e9', '#10b981', '#f59e0b', '#ef4444'][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      )}

      {/* Platforms Tab */}
      {activeTab === 'platforms' && (
        <div className="mt-6">
          <Card>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={analyticsData.platformComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="platform" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="engagement" fill="#0ea5e9" />
                <Bar dataKey="reach" fill="#10b981" />
                <Bar dataKey="conversions" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="mt-6 space-y-4">
          {analyticsData.topPosts.map((post, idx) => (
            <Card key={idx} hoverable>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-dark-900 dark:text-white">{post.name}</h3>
                  <div className="flex gap-6 mt-2 text-sm">
                    <span className="text-dark-600 dark:text-dark-400">❤️ {post.likes} Likes</span>
                    <span className="text-dark-600 dark:text-dark-400">💬 {post.comments} Comments</span>
                    <span className="text-dark-600 dark:text-dark-400">🔗 {post.shares} Shares</span>
                  </div>
                </div>
                <Button variant="secondary" size="sm">View Post</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
