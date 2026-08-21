import apiClient from './api';

export const postService = {
  getPosts: (workspaceId: string, filters?: any) =>
    apiClient.get(`/workspaces/${workspaceId}/posts`, { params: filters }),
  
  getPost: (postId: string) =>
    apiClient.get(`/posts/${postId}`),
  
  createPost: (workspaceId: string, data: any) =>
    apiClient.post(`/workspaces/${workspaceId}/posts`, data),
  
  updatePost: (postId: string, data: any) =>
    apiClient.put(`/posts/${postId}`, data),
  
  deletePost: (postId: string) =>
    apiClient.delete(`/posts/${postId}`),
  
  publishPost: (postId: string) =>
    apiClient.post(`/posts/${postId}/publish`),
  
  schedulePost: (postId: string, scheduledAt: string) =>
    apiClient.post(`/posts/${postId}/schedule`, { scheduledAt }),
  
  duplicatePost: (postId: string) =>
    apiClient.post(`/posts/${postId}/duplicate`),
  
  getTemplates: (workspaceId: string) =>
    apiClient.get(`/workspaces/${workspaceId}/templates`),
  
  saveTemplate: (workspaceId: string, data: any) =>
    apiClient.post(`/workspaces/${workspaceId}/templates`, data),
};
