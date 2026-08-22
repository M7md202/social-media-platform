'use client';

import React, { useState } from 'react';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Input } from '@components/Input';
import { Tabs } from '@components/Tabs';
import { Badge } from '@components/Badge';

const aiFeatures = [
  {
    id: 1,
    name: 'Caption Generator',
    icon: '✍️',
    description: 'Generate engaging captions for your posts',
    status: 'ready',
  },
  {
    id: 2,
    name: 'Hashtag Suggestions',
    icon: '#️⃣',
    description: 'Get relevant hashtags for better reach',
    status: 'ready',
  },
  {
    id: 3,
    name: 'Content Ideas',
    icon: '💡',
    description: 'AI-powered content ideas based on trends',
    status: 'ready',
  },
  {
    id: 4,
    name: 'Best Time to Post',
    icon: '⏰',
    description: 'Optimal posting times for your audience',
    status: 'ready',
  },
  {
    id: 5,
    name: 'Image Enhancement',
    icon: '🎨',
    description: 'Auto-enhance and optimize images',
    status: 'coming',
  },
  {
    id: 6,
    name: 'Competitor Analysis',
    icon: '📊',
    description: 'Analyze competitor strategies',
    status: 'coming',
  },
];

export default function AiStudioPage() {
  const [activeTab, setActiveTab] = useState('tools');
  const [selectedTool, setSelectedTool] = useState<number | null>(null);
  const [inputText, setInputText] = useState('');
  const [output, setOutput] = useState('');

  const tabs = [
    { id: 'tools', label: 'AI Tools', icon: '🤖' },
    { id: 'history', label: 'History', icon: '📜' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const handleGenerate = () => {
    if (selectedTool === 1) {
      setOutput('🎯 Your engaging caption will appear here!\n\n📱 Perfect for Instagram, Facebook, TikTok and more.\n\n#MadeByAI #SocialMedia #Marketing');
    } else if (selectedTool === 2) {
      setOutput('#Instagram #SocialMedia #Marketing #Content #Digital #Creative #Trending #BrandAwareness #EngagementBoost #CommunityFirst');
    } else if (selectedTool === 3) {
      setOutput('💡 Content Ideas:\n1. Behind-the-scenes videos\n2. User testimonials\n3. Trending challenges\n4. Educational tips\n5. Interactive polls');
    }
  };

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900 dark:text-white">AI Studio</h1>
        <p className="text-dark-600 dark:text-dark-400 mt-2">Powered by advanced AI to enhance your content</p>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tools Tab */}
      {activeTab === 'tools' && (
        <div className="mt-6">
          {!selectedTool ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiFeatures.map((feature) => (
                <Card
                  key={feature.id}
                  hoverable
                  onClick={() => feature.status === 'ready' && setSelectedTool(feature.id)}
                  className={feature.status === 'coming' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{feature.icon}</span>
                    {feature.status === 'coming' && (
                      <Badge label="Coming Soon" variant="warning" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">{feature.name}</h3>
                  <p className="text-dark-600 dark:text-dark-400 text-sm">{feature.description}</p>
                  {feature.status === 'ready' && (
                    <Button variant="primary" size="sm" className="mt-4 w-full">
                      Open Tool
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-dark-900 dark:text-white">
                  {aiFeatures.find(f => f.id === selectedTool)?.name}
                </h2>
                <Button variant="secondary" size="sm" onClick={() => setSelectedTool(null)}>← Back</Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input */}
                <div>
                  <label className="block text-sm font-medium text-dark-900 dark:text-white mb-3">Input</label>
                  <textarea
                    className="w-full h-64 p-4 border border-dark-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your text here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <Button variant="primary" size="lg" className="mt-4 w-full" onClick={handleGenerate}>
                    ✨ Generate
                  </Button>
                </div>

                {/* Output */}
                <div>
                  <label className="block text-sm font-medium text-dark-900 dark:text-white mb-3">Generated Content</label>
                  <div className="h-64 p-4 border border-dark-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800">
                    <p className="text-dark-900 dark:text-white whitespace-pre-wrap">{output}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="secondary" size="sm" className="flex-1">📋 Copy</Button>
                    <Button variant="secondary" size="sm" className="flex-1">🔄 Regenerate</Button>
                    <Button variant="primary" size="sm" className="flex-1">✅ Use</Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="mt-6 space-y-4">
          {[...Array(5)].map((_, idx) => (
            <Card key={idx}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-dark-900 dark:text-white">Generated content #{idx + 1}</p>
                  <p className="text-sm text-dark-600 dark:text-dark-400">2 hours ago • Caption Generator</p>
                </div>
                <Button variant="secondary" size="sm">📋 Copy</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
