import apiClient from './api';

export const socialAccountService = {
  getAccounts: (workspaceId: string) =>
    apiClient.get(`/workspaces/${workspaceId}/social-accounts`),
  
  getAccount: (accountId: string) =>
    apiClient.get(`/social-accounts/${accountId}`),
  
  connectAccount: (workspaceId: string, platform: string) =>
    apiClient.post(`/workspaces/${workspaceId}/social-accounts/connect`, { platform }),
  
  disconnectAccount: (accountId: string) =>
    apiClient.delete(`/social-accounts/${accountId}`),
  
  reconnectAccount: (accountId: string) =>
    apiClient.post(`/social-accounts/${accountId}/reconnect`),
  
  switchAccount: (accountId: string) =>
    apiClient.post(`/social-accounts/${accountId}/switch`),
  
  syncAccount: (accountId: string) =>
    apiClient.post(`/social-accounts/${accountId}/sync`),
};
