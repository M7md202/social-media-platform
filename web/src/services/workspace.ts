import apiClient from './api';

export const workspaceService = {
  getWorkspaces: () =>
    apiClient.get('/workspaces'),
  
  getWorkspace: (id: string) =>
    apiClient.get(`/workspaces/${id}`),
  
  createWorkspace: (name: string, slug: string, description?: string) =>
    apiClient.post('/workspaces', { name, slug, description }),
  
  updateWorkspace: (id: string, data: any) =>
    apiClient.put(`/workspaces/${id}`, data),
  
  deleteWorkspace: (id: string) =>
    apiClient.delete(`/workspaces/${id}`),
  
  getMembers: (workspaceId: string) =>
    apiClient.get(`/workspaces/${workspaceId}/members`),
  
  inviteMember: (workspaceId: string, email: string, role: string) =>
    apiClient.post(`/workspaces/${workspaceId}/members/invite`, { email, role }),
  
  updateMemberRole: (workspaceId: string, memberId: string, role: string) =>
    apiClient.put(`/workspaces/${workspaceId}/members/${memberId}`, { role }),
  
  removeMember: (workspaceId: string, memberId: string) =>
    apiClient.delete(`/workspaces/${workspaceId}/members/${memberId}`),
};
