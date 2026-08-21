import apiClient from './api';

export const campaignService = {
  getCampaigns: (workspaceId: string, filters?: any) =>
    apiClient.get(`/workspaces/${workspaceId}/campaigns`, { params: filters }),
  
  getCampaign: (campaignId: string) =>
    apiClient.get(`/campaigns/${campaignId}`),
  
  createCampaign: (workspaceId: string, data: any) =>
    apiClient.post(`/workspaces/${workspaceId}/campaigns`, data),
  
  updateCampaign: (campaignId: string, data: any) =>
    apiClient.put(`/campaigns/${campaignId}`, data),
  
  deleteCampaign: (campaignId: string) =>
    apiClient.delete(`/campaigns/${campaignId}`),
  
  publishCampaign: (campaignId: string) =>
    apiClient.post(`/campaigns/${campaignId}/publish`),
  
  pauseCampaign: (campaignId: string) =>
    apiClient.post(`/campaigns/${campaignId}/pause`),
  
  resumeCampaign: (campaignId: string) =>
    apiClient.post(`/campaigns/${campaignId}/resume`),
  
  getCampaignAnalytics: (campaignId: string) =>
    apiClient.get(`/campaigns/${campaignId}/analytics`),
};
