import apiClient from './api';

export const analyticsService = {
  getOverview: (workspaceId: string, params?: any) =>
    apiClient.get(`/workspaces/${workspaceId}/analytics/overview`, { params }),
  
  getAccountAnalytics: (accountId: string, params?: any) =>
    apiClient.get(`/social-accounts/${accountId}/analytics`, { params }),
  
  getPostAnalytics: (postId: string) =>
    apiClient.get(`/posts/${postId}/analytics`),
  
  getTrends: (workspaceId: string, params?: any) =>
    apiClient.get(`/workspaces/${workspaceId}/analytics/trends`, { params }),
  
  getBestPerforming: (workspaceId: string, type: string) =>
    apiClient.get(`/workspaces/${workspaceId}/analytics/best-performing`, { params: { type } }),
  
  getEngagementMetrics: (workspaceId: string, params?: any) =>
    apiClient.get(`/workspaces/${workspaceId}/analytics/engagement`, { params }),
  
  generateReport: (workspaceId: string, data: any) =>
    apiClient.post(`/workspaces/${workspaceId}/analytics/reports`, data),
  
  exportReport: (reportId: string, format: 'pdf' | 'csv') =>
    apiClient.get(`/analytics/reports/${reportId}/export`, { params: { format } }),
};
