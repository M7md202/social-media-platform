'use client';

import React, { useState } from 'react';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { Input } from '@components/Input';
import { Badge } from '@components/Badge';
import { Tabs } from '@components/Tabs';
import { PlatformBadge } from '@components/PlatformBadge';

const messages = [
  {
    id: 1,
    platform: 'instagram',
    conversationId: 'conv_1',
    senderName: 'Sarah Johnson',
    senderAvatar: '👩',
    text: 'Hi! I love your new collection! When will it be available?',
    status: 'unread',
    timestamp: '2 minutes ago',
    isReply: false,
  },
  {
    id: 2,
    platform: 'facebook',
    conversationId: 'conv_2',
    senderName: 'Mike Anderson',
    senderAvatar: '👨',
    text: 'Can you tell me more about the pricing?',
    status: 'read',
    timestamp: '15 minutes ago',
    isReply: false,
  },
  {
    id: 3,
    platform: 'twitter',
    conversationId: 'conv_3',
    senderName: '@brandlover',
    senderAvatar: '🐦',
    text: '@yourbrand your latest post was amazing!',
    status: 'read',
    timestamp: '1 hour ago',
    isReply: false,
  },
  {
    id: 4,
    platform: 'linkedin',
    conversationId: 'conv_4',
    senderName: 'Emma Williams',
    senderAvatar: '👩‍💼',
    text: 'Great insights in your latest article!',
    status: 'unread',
    timestamp: '3 hours ago',
    isReply: false,
  },
];

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const tabs = [
    { id: 'all', label: 'All Messages', icon: '📬' },
    { id: 'unread', label: 'Unread', icon: '🔔' },
    { id: 'archived', label: 'Archived', icon: '📦' },
  ];

  const filteredMessages = activeTab === 'all' ? messages : activeTab === 'unread' ? messages.filter(m => m.status === 'unread') : [];

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-900 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Messages & Inbox</h1>
        <p className="text-dark-600 dark:text-dark-400 mt-2">Unified inbox for all your social media messages</p>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Messages Grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-3">
          {filteredMessages.map((msg) => (
            <Card
              key={msg.id}
              hoverable
              className={`cursor-pointer ${
                selectedConversation === msg.id ? 'ring-2 ring-primary-500' : ''
              } ${msg.status === 'unread' ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
              onClick={() => setSelectedConversation(msg.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="text-2xl">{msg.senderAvatar}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-dark-900 dark:text-white truncate">{msg.senderName}</h4>
                      <PlatformBadge platform={msg.platform as any} size="sm" />
                    </div>
                    <p className="text-sm text-dark-600 dark:text-dark-400 truncate">{msg.text}</p>
                    <p className="text-xs text-dark-500 dark:text-dark-500 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
                {msg.status === 'unread' && <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0 mt-1"></div>}
              </div>
            </Card>
          ))}
        </div>

        {/* Conversation Detail */}
        {selectedConversation && (
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-dark-200 dark:border-dark-700">
                <div>
                  <h3 className="text-lg font-semibold text-dark-900 dark:text-white">
                    {messages.find(m => m.id === selectedConversation)?.senderName}
                  </h3>
                  <p className="text-sm text-dark-600 dark:text-dark-400 mt-1">
                    <PlatformBadge platform={messages.find(m => m.id === selectedConversation)?.platform as any} size="sm" />
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">🏷️ Label</Button>
                  <Button variant="secondary" size="sm">📌 Archive</Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                <div className="bg-primary-100 dark:bg-primary-900/20 p-3 rounded-lg max-w-xs">
                  <p className="text-sm text-dark-900 dark:text-white">
                    {messages.find(m => m.id === selectedConversation)?.text}
                  </p>
                  <p className="text-xs text-dark-600 dark:text-dark-400 mt-2">
                    {messages.find(m => m.id === selectedConversation)?.timestamp}
                  </p>
                </div>

                <div className="bg-dark-100 dark:bg-dark-700 p-3 rounded-lg max-w-xs ml-auto">
                  <p className="text-sm text-dark-900 dark:text-white">Thanks for reaching out! We appreciate your interest.</p>
                  <p className="text-xs text-dark-600 dark:text-dark-400 mt-2">sent</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-dark-200 dark:border-dark-700">
                <div className="flex gap-2">
                  <Input placeholder="Type your reply..." value={replyText} onChange={(e) => setReplyText(e.target.value)} />
                  <Button variant="primary" size="sm">Send</Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
