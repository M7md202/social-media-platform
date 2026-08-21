export type Platform = 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'tiktok' | 'telegram' | 'whatsapp' | 'pinterest';

export interface SocialAccount {
  id: string;
  platform: Platform;
  platformId: string;
  username: string;
  displayName: string;
  avatar: string;
  followers: number;
  following: number;
  bio: string;
  isConnected: boolean;
  connectedAt: string;
  lastSync?: string;
}

export interface Post {
  id: string;
  title?: string;
  content: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  scheduledAt?: string;
  publishedAt?: string;
  media: MediaItem[];
  captions: string[];
  hashtags: string[];
  mentions: string[];
  platforms: Platform[];
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  impressions: number;
  createdAt: string;
  updatedAt: string;
}

export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video' | 'document' | 'link';
  duration?: number;
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  objective: 'awareness' | 'engagement' | 'conversions' | 'leads';
  status: 'planning' | 'scheduled' | 'active' | 'paused' | 'completed';
  platforms: Platform[];
  startDate: string;
  endDate: string;
  budget?: number;
  posts: Post[];
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  id: string;
  date: string;
  followers: number;
  following: number;
  engagement: number;
  reach: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  source: 'social' | 'website' | 'form' | 'import' | 'manual';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  tags: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  attachments: string[];
  status: 'unread' | 'read' | 'archived';
  labels: string[];
  createdAt: string;
}

export interface Automation {
  id: string;
  name: string;
  description?: string;
  type: 'scheduled' | 'recurring' | 'trigger-based' | 'rss';
  status: 'active' | 'paused' | 'inactive';
  workflow: WorkflowNode[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'condition' | 'delay' | 'action' | 'notification';
  label: string;
  config: Record<string, any>;
  connections: string[];
}

export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  language: string;
  timezone: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  currency: string;
  timezone: string;
  owner: User;
  members: WorkspaceMember[];
  createdAt: string;
}

export interface WorkspaceMember {
  id: string;
  user: User;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  permissions: string[];
  joinedAt: string;
}
