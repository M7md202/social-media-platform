'use client';

import React, { useState } from 'react';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Input } from '@components/Input';
import { Badge } from '@components/Badge';
import { PlatformBadge } from '@components/PlatformBadge';

const connectedAccounts = [
  {
    id: 1,
    platform: 'instagram',
    username: '@mybrand',
    displayName: 'My Brand',
    followers: 45000,
    avatar: '📷',
    connectedAt: '2024-01-15',
  },
  {
    id: 2,
    platform: 'facebook',
    username: 'MyBrand Page',
    displayName: 'My Brand',
    followers: 32000,
    avatar: '👍',
    connectedAt: '2024-01-15',
  },
  {
    id: 3,
    platform: 'twitter',
    username: '@mybrand',
    displayName: 'My Brand',
    followers: 12000,
    avatar: '🐦',
    connectedAt: '2024-02-01',
  },
];

const availablePlatforms = ['linkedin', 'youtube', 'tiktok', 'telegram', 'whatsapp', 'pinterest'];

export default function AccountsPage() {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Social Accounts</h1>
          <p className="text-dark-600 dark:text-dark-400 mt-2">Manage your connected social media accounts</p>
        </div>
        <Button variant="primary" onClick={() => setShowConnectModal(true)}>
          + Connect Account
        </Button>
      </div>

      {/* Connected Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {connectedAccounts.map((account) => (
          <Card key={account.id} hoverable>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{account.avatar}</span>
                  <div>
                    <h3 className="font-semibold text-dark-900 dark:text-white">{account.displayName}</h3>
                    <p className="text-sm text-dark-600 dark:text-dark-400">@{account.username}</p>
                  </div>
                </div>
              </div>
              <Badge label="Connected" variant="success" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-dark-600 dark:text-dark-400">Followers</span>
                <span className="font-medium text-dark-900 dark:text-white">{account.followers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-600 dark:text-dark-400">Connected</span>
                <span className="font-medium text-dark-900 dark:text-white">{account.connectedAt}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-dark-200 dark:border-dark-700 flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1">
                Settings
              </Button>
              <Button variant="danger" size="sm" className="flex-1">
                Disconnect
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Available Platforms */}
      <Card title="Connect More Accounts" description="Add additional social media platforms">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {availablePlatforms.map((platform) => (
            <button
              key={platform}
              onClick={() => {
                setSelectedPlatform(platform);
                setShowConnectModal(true);
              }}
              className="p-4 border-2 border-dashed border-dark-200 dark:border-dark-700 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all"
            >
              <div className="text-center">
                <PlatformBadge platform={platform as any} size="sm" />
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Connect Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-dark-900 dark:text-white">Connect Account</h2>
              <button onClick={() => setShowConnectModal(false)} className="text-dark-600 dark:text-dark-400 text-2xl">
                ×
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-dark-600 dark:text-dark-400">
                Select a platform to connect your account. You'll be redirected to authenticate.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {['instagram', 'facebook', 'twitter', 'linkedin', 'youtube', 'tiktok'].map((platform) => (
                  <Button
                    key={platform}
                    variant="secondary"
                    onClick={() => {
                      console.log(`Connecting ${platform}`);
                      setShowConnectModal(false);
                    }}
                  >
                    <PlatformBadge platform={platform as any} size="sm" />
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
