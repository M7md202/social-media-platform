'use client';

import React, { useState } from 'react';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Input } from '@components/Input';
import { Badge } from '@components/Badge';
import { Tabs } from '@components/Tabs';

const campaigns = [
  {
    id: 1,
    name: 'Summer Collection 2024',
    objective: 'awareness',
    status: 'active',
    platforms: ['instagram', 'facebook', 'tiktok'],
    budget: 5000,
    spent: 2340,
    reach: 125000,
    impressions: 450000,
    clicks: 8500,
    conversions: 340,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
  },
  {
    id: 2,
    name: 'Back to School',
    objective: 'conversions',
    status: 'planning',
    platforms: ['instagram', 'facebook'],
    budget: 3000,
    startDate: '2024-09-01',
    endDate: '2024-09-30',
  },
  {
    id: 3,
    name: 'Holiday Season',
    objective: 'engagement',
    status: 'paused',
    platforms: ['all'],
    budget: 8000,
    spent: 4500,
    startDate: '2024-11-01',
    endDate: '2024-12-31',
  },
];

const objectiveEmojis = {
  awareness: '👁️',
  engagement: '💬',
  conversions: '🛒',
  leads: '📧',
};

const statusColors = {
  active: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
  planning: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
  paused: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
  completed: 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300',
};

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [showNewCampaign, setShowNewCampaign] = useState(false);

  const tabs = [
    { id: 'all', label: 'All Campaigns', icon: '📊' },
    { id: 'active', label: 'Active', icon: '🎯' },
    { id: 'planning', label: 'Planning', icon: '📝' },
    { id: 'completed', label: 'Completed', icon: '✅' },
  ];

  const filteredCampaigns = activeTab === 'all' ? campaigns : campaigns.filter(c => c.status === activeTab);

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Campaigns</h1>
          <p className="text-dark-600 dark:text-dark-400 mt-2">Create and manage marketing campaigns across platforms</p>
        </div>
        <Button variant="primary" onClick={() => setShowNewCampaign(true)}>
          🚀 New Campaign
        </Button>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Campaigns Grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} hoverable>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-dark-900 dark:text-white">{campaign.name}</h3>
                <p className="text-sm text-dark-600 dark:text-dark-400 mt-1">
                  {campaign.startDate} to {campaign.endDate}
                </p>
              </div>
              <Badge label={campaign.status} variant={statusColors[campaign.status as keyof typeof statusColors] as any} />
            </div>

            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-600 dark:text-dark-400">Objective</span>
                <span className="font-medium text-dark-900 dark:text-white">
                  {objectiveEmojis[campaign.objective as keyof typeof objectiveEmojis]} {campaign.objective}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-600 dark:text-dark-400">Platforms</span>
                <span className="font-medium text-dark-900 dark:text-white">{campaign.platforms.join(', ')}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-600 dark:text-dark-400">Budget</span>
                <span className="font-medium text-dark-900 dark:text-white">${campaign.budget}</span>
              </div>
            </div>

            {campaign.status === 'active' && (
              <>
                <div className="mb-4 space-y-3 pb-4 border-b border-dark-200 dark:border-dark-700">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-dark-600 dark:text-dark-400">Spent</p>
                      <p className="font-bold text-dark-900 dark:text-white">${campaign.spent}</p>
                    </div>
                    <div>
                      <p className="text-dark-600 dark:text-dark-400">Reach</p>
                      <p className="font-bold text-dark-900 dark:text-white">{(campaign.reach / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-dark-600 dark:text-dark-400">Clicks</p>
                      <p className="font-bold text-dark-900 dark:text-white">{campaign.clicks}</p>
                    </div>
                    <div>
                      <p className="text-dark-600 dark:text-dark-400">Conversions</p>
                      <p className="font-bold text-dark-900 dark:text-white">{campaign.conversions}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1">
                View Details
              </Button>
              <Button variant="secondary" size="sm" className="flex-1">
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* New Campaign Modal */}
      {showNewCampaign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-dark-900 dark:text-white">Create Campaign</h2>
              <button onClick={() => setShowNewCampaign(false)} className="text-dark-600 dark:text-dark-400 text-2xl">
                ×
              </button>
            </div>

            <div className="space-y-4">
              <Input label="Campaign Name" placeholder="e.g., Summer 2024 Collection" />
              <div>
                <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">Objective</label>
                <select className="w-full p-2 border border-dark-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white">
                  <option>Awareness</option>
                  <option>Engagement</option>
                  <option>Conversions</option>
                  <option>Leads</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Start Date" type="date" />
                <Input label="End Date" type="date" />
              </div>
              <Input label="Budget" type="number" placeholder="0.00" />
              <div>
                <label className="block text-sm font-medium text-dark-900 dark:text-white mb-3">Platforms</label>
                <div className="grid grid-cols-3 gap-2">
                  {['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok', 'youtube'].map(p => (
                    <label key={p} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{p}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="secondary" size="lg" className="flex-1" onClick={() => setShowNewCampaign(false)}>Cancel</Button>
                <Button variant="primary" size="lg" className="flex-1">Create Campaign</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
