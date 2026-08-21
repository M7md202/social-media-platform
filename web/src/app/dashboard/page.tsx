'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@store/index';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { KPICard } from '@components/KPICard';
import { Tabs } from '@components/Tabs';
import { PlatformBadge } from '@components/PlatformBadge';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
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

const dashboardData = {
  kpis: [
    { label: 'Total Followers', value: '125.4K', unit: '', trend: { value: 12, direction: 'up' as const }, color: 'blue' as const },
    { label: 'Engagement Rate', value: '4.8', unit: '%', trend: { value: 2, direction: 'up' as const }, color: 'green' as const },
    { label: 'Posts This Month', value: '48', unit: '', trend: { value: 5, direction: 'down' as const }, color: 'purple' as const },
    { label: 'Reach', value: '2.1M', unit: '', trend: { value: 18, direction: 'up' as const }, color: 'red' as const },
  ],
  engagement: [
    { date: 'Mon', likes: 400, comments: 240, shares: 120 },
    { date: 'Tue', likes: 520, comments: 280, shares: 150 },
    { date: 'Wed', likes: 480, comments: 220, shares: 110 },
    { date: 'Thu', likes: 690, comments: 360, shares: 200 },
    { date: 'Fri', likes: 810, comments: 420, shares: 240 },
    { date: 'Sat', likes: 720, comments: 380, shares: 210 },
    { date: 'Sun', likes: 640, comments: 340, shares: 180 },
  ],
  growth: [
    { date: 'Week 1', followers: 120000 },
    { date: 'Week 2', followers: 122000 },
    { date: 'Week 3', followers: 124000 },
    { date: 'Week 4', followers: 125400 },
  ],
  platformBreakdown: [
    { name: 'Instagram', value: 45, color: '#E1306C' },
    { name: 'Facebook', value: 30, color: '#1877F2' },
    { name: 'Twitter', value: 15, color: '#1DA1F2' },
    { name: 'LinkedIn', value: 10, color: '#0A66C2' },
  ],
  recentPosts: [
    { id: 1, platform: 'instagram', title: 'Summer Campaign Launch', status: 'published', likes: 1240, comments: 89 },
    { id: 2, platform: 'facebook', title: 'Product Update Announcement', status: 'published', likes: 856, comments: 42 },
    { id: 3, platform: 'twitter', title: 'Live Session Tomorrow!', status: 'scheduled', likes: 0, comments: 0 },
    { id: 4, platform: 'linkedin', title: 'Team Growth Story', status: 'draft', likes: 0, comments: 0 },
  ],
};

export default function DashboardPage() {
  const { user, workspace } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('7d');

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Dashboard</h1>
        <p className="text-dark-600 dark:text-dark-400 mt-2">Welcome back, {user?.firstName || 'User'}!</p>
      </div>

      {/* Date Range Filter */}
      <div className="mb-6 flex gap-2">
        {['24h', '7d', '30d', '90d'].map((range) => (
          <Button
            key={range}
            variant={dateRange === range ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setDateRange(range)}
          >
            {range === '24h' ? 'Last 24h' : range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last 30 days' : 'Last 90 days'}
          </Button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardData.kpis.map((kpi, idx) => (
          <KPICard key={idx} {...kpi} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Engagement Chart */}
        <Card title="Engagement Metrics" description="Last 7 days">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dashboardData.engagement}>
              <defs>
                <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Area type="monotone" dataKey="likes" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorLikes)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Follower Growth */}
        <Card title="Follower Growth" description="Monthly trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.growth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="followers" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Platform Breakdown */}
        <Card title="Platform Distribution" description="By followers">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={dashboardData.platformBreakdown} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name} ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                {dashboardData.platformBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Post Performance */}
        <Card title="Post Performance" description="Top performing posts">
          <div className="space-y-4">
            {dashboardData.recentPosts.map((post) => (
              <div key={post.id} className="p-4 border border-dark-200 dark:border-dark-700 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-dark-900 dark:text-white">{post.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <PlatformBadge platform={post.platform as any} size="sm" />
                      <span className={`text-xs px-2 py-1 rounded ${
                        post.status === 'published' ? 'bg-green-100 text-green-700' :
                        post.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {post.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-dark-600 dark:text-dark-400">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity Section */}
      <Card title="Recent Activity" description="Latest updates across all accounts">
        <div className="space-y-3">
          {[
            { action: 'Post published', description: 'Summer Campaign on Instagram', time: '2 hours ago' },
            { action: 'New followers', description: '156 new followers', time: '4 hours ago' },
            { action: 'Comment received', description: 'On "Product Update" post', time: '6 hours ago' },
            { action: 'Campaign started', description: '"Q3 Marketing Push" went live', time: '1 day ago' },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border-b border-dark-200 dark:border-dark-700 last:border-0">
              <div>
                <p className="font-medium text-dark-900 dark:text-white">{activity.action}</p>
                <p className="text-sm text-dark-600 dark:text-dark-400">{activity.description}</p>
              </div>
              <span className="text-sm text-dark-500 dark:text-dark-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
