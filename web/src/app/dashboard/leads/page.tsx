'use client';

import React, { useState } from 'react';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Input } from '@components/Input';
import { Badge } from '@components/Badge';
import { Tabs } from '@components/Tabs';

const leads = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1-555-0123',
    company: 'Tech Corp',
    position: 'Marketing Manager',
    source: 'instagram',
    status: 'qualified',
    score: 85,
    addedAt: '2024-08-15',
  },
  {
    id: 2,
    name: 'Mike Anderson',
    email: 'mike@example.com',
    company: 'Creative Agency',
    position: 'Creative Director',
    source: 'facebook',
    status: 'contacted',
    score: 65,
    addedAt: '2024-08-18',
  },
  {
    id: 3,
    name: 'Emma Davis',
    email: 'emma@example.com',
    phone: '+1-555-0456',
    company: 'Design Studio',
    position: 'Owner',
    source: 'linkedin',
    status: 'new',
    score: 45,
    addedAt: '2024-08-20',
  },
];

const statusColors = {
  new: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
  contacted: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
  qualified: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
  converted: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
};

export default function LeadsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [showDetail, setShowDetail] = useState<number | null>(null);

  const tabs = [
    { id: 'all', label: 'All Leads', icon: '👥' },
    { id: 'new', label: 'New', icon: '✨' },
    { id: 'contacted', label: 'Contacted', icon: '📞' },
    { id: 'qualified', label: 'Qualified', icon: '✅' },
  ];

  const filteredLeads = activeTab === 'all' ? leads : leads.filter(l => l.status === activeTab);

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Leads</h1>
          <p className="text-dark-600 dark:text-dark-400 mt-2">Manage leads from your social media campaigns</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">📊 Export</Button>
          <Button variant="primary">➕ Add Lead</Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Leads Grid or List */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads List */}
        <div className="lg:col-span-1 space-y-3">
          {filteredLeads.map((lead) => (
            <Card
              key={lead.id}
              hoverable
              className={`cursor-pointer ${
                showDetail === lead.id ? 'ring-2 ring-primary-500' : ''
              }`}
              onClick={() => setShowDetail(lead.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-dark-900 dark:text-white">{lead.name}</h4>
                  <p className="text-sm text-dark-600 dark:text-dark-400">{lead.company}</p>
                </div>
                <Badge label={lead.status} variant={statusColors[lead.status as keyof typeof statusColors] as any} />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-dark-600 dark:text-dark-400">Score: {lead.score}</span>
                <span className="text-xs text-dark-500 dark:text-dark-500">{lead.source}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Lead Detail */}
        {showDetail && (
          <div className="lg:col-span-2">
            <Card className="h-full">
              {(() => {
                const lead = leads.find(l => l.id === showDetail);
                return lead ? (
                  <div>
                    <div className="flex items-start justify-between mb-6 pb-6 border-b border-dark-200 dark:border-dark-700">
                      <div>
                        <h3 className="text-2xl font-bold text-dark-900 dark:text-white">{lead.name}</h3>
                        <div className="flex gap-2 mt-2">
                          <Badge label={lead.status} variant={statusColors[lead.status as keyof typeof statusColors] as any} />
                          <Badge label={`Score: ${lead.score}`} />
                        </div>
                      </div>
                      <Button variant="primary">📧 Send Email</Button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-dark-600 dark:text-dark-400 mb-1">Email</p>
                          <p className="font-medium text-dark-900 dark:text-white">{lead.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-dark-600 dark:text-dark-400 mb-1">Phone</p>
                          <p className="font-medium text-dark-900 dark:text-white">{lead.phone || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-dark-600 dark:text-dark-400 mb-1">Company</p>
                          <p className="font-medium text-dark-900 dark:text-white">{lead.company}</p>
                        </div>
                        <div>
                          <p className="text-sm text-dark-600 dark:text-dark-400 mb-1">Position</p>
                          <p className="font-medium text-dark-900 dark:text-white">{lead.position}</p>
                        </div>
                        <div>
                          <p className="text-sm text-dark-600 dark:text-dark-400 mb-1">Source</p>
                          <p className="font-medium text-dark-900 dark:text-white uppercase">{lead.source}</p>
                        </div>
                        <div>
                          <p className="text-sm text-dark-600 dark:text-dark-400 mb-1">Added</p>
                          <p className="font-medium text-dark-900 dark:text-white">{lead.addedAt}</p>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-dark-200 dark:border-dark-700">
                        <h4 className="font-semibold text-dark-900 dark:text-white mb-3">Actions</h4>
                        <div className="space-y-2">
                          <Button variant="secondary" className="w-full">📞 Call</Button>
                          <Button variant="secondary" className="w-full">💬 Send Message</Button>
                          <Button variant="secondary" className="w-full">📋 Change Status</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
