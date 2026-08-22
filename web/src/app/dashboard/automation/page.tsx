'use client';

import React, { useState } from 'react';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Input } from '@components/Input';
import { Badge } from '@components/Badge';
import { Tabs } from '@components/Tabs';

const automations = [
  {
    id: 1,
    name: 'Auto-Reply to Comments',
    type: 'trigger-based',
    status: 'active',
    triggers: ['new_comment'],
    actions: ['send_message'],
    platforms: ['instagram', 'facebook'],
    executedCount: 1240,
  },
  {
    id: 2,
    name: 'Daily Post Schedule',
    type: 'scheduled',
    status: 'active',
    triggers: ['time'],
    actions: ['publish_post'],
    platforms: ['all'],
    executedCount: 45,
  },
  {
    id: 3,
    name: 'Lead Nurture Sequence',
    type: 'recurring',
    status: 'paused',
    triggers: ['new_lead'],
    actions: ['send_message', 'tag_lead'],
    platforms: ['instagram', 'facebook'],
    executedCount: 320,
  },
];

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [showBuilder, setShowBuilder] = useState(false);

  const tabs = [
    { id: 'all', label: 'All Automations', icon: '⚙️' },
    { id: 'active', label: 'Active', icon: '▶️' },
    { id: 'paused', label: 'Paused', icon: '⏸️' },
  ];

  const filteredAutomations = activeTab === 'all' ? automations : automations.filter(a => a.status === activeTab);

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Automation</h1>
          <p className="text-dark-600 dark:text-dark-400 mt-2">Create automated workflows for your social media</p>
        </div>
        <Button variant="primary" onClick={() => setShowBuilder(true)}>
          ⚡ New Automation
        </Button>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Automations List */}
      <div className="mt-6 space-y-4">
        {filteredAutomations.map((automation) => (
          <Card key={automation.id} hoverable>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-dark-900 dark:text-white">{automation.name}</h3>
                  <Badge label={automation.status} variant={automation.status === 'active' ? 'success' : 'default'} />
                </div>
                <div className="flex gap-6 text-sm mb-3">
                  <span className="text-dark-600 dark:text-dark-400">Type: <strong>{automation.type}</strong></span>
                  <span className="text-dark-600 dark:text-dark-400">Executed: <strong>{automation.executedCount}</strong> times</span>
                </div>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-dark-600 dark:text-dark-400">Triggers: </span>
                    {automation.triggers.map(t => (
                      <Badge key={t} label={t} variant="info" />
                    ))}
                  </div>
                  <div>
                    <span className="text-dark-600 dark:text-dark-400">Actions: </span>
                    {automation.actions.map(a => (
                      <Badge key={a} label={a} variant="info" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">Edit</Button>
                <Button variant="secondary" size="sm">{automation.status === 'active' ? 'Pause' : 'Resume'}</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Workflow Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-dark-900 dark:text-white">Automation Builder</h2>
              <button onClick={() => setShowBuilder(false)} className="text-dark-600 dark:text-dark-400 text-2xl">
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Workflow Canvas */}
              <div className="border-2 border-dashed border-dark-200 dark:border-dark-700 rounded-lg p-8 min-h-96 bg-white dark:bg-dark-800">
                <div className="text-center text-dark-600 dark:text-dark-400">
                  <p className="text-lg font-medium mb-2">Workflow Canvas</p>
                  <p className="text-sm">Drag and drop nodes to create your automation workflow</p>
                  <div className="mt-4 flex gap-2 justify-center">
                    <Button variant="secondary" size="sm">+ Trigger</Button>
                    <Button variant="secondary" size="sm">+ Condition</Button>
                    <Button variant="secondary" size="sm">+ Action</Button>
                    <Button variant="secondary" size="sm">+ Delay</Button>
                  </div>
                </div>
              </div>

              {/* Automation Details */}
              <div className="space-y-4">
                <Input label="Automation Name" placeholder="e.g., Auto-Reply to New Comments" />
                <div>
                  <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">Automation Type</label>
                  <select className="w-full p-2 border border-dark-200 dark:border-dark-700 rounded-lg bg-white dark:bg-dark-800 text-dark-900 dark:text-white">
                    <option>Trigger-based</option>
                    <option>Scheduled</option>
                    <option>Recurring</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button variant="secondary" size="lg" className="flex-1" onClick={() => setShowBuilder(false)}>Cancel</Button>
                <Button variant="primary" size="lg" className="flex-1">Create Automation</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
