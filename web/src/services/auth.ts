import apiClient from './api';
import { User } from '@types/index';

export const authService = {
  signup: (email: string, username: string, password: string, firstName?: string, lastName?: string) =>
    apiClient.post('/auth/signup', { email, username, password, firstName, lastName }),
  
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  
  logout: () =>
    apiClient.post('/auth/logout'),
  
  getCurrentUser: () =>
    apiClient.get('/auth/me'),
  
  resetPassword: (email: string) =>
    apiClient.post('/auth/reset-password', { email }),
  
  confirmResetPassword: (token: string, password: string) =>
    apiClient.post('/auth/confirm-reset-password', { token, password }),
  
  enableTwoFactor: () =>
    apiClient.post('/auth/2fa/enable'),
  
  verifyTwoFactor: (code: string) =>
    apiClient.post('/auth/2fa/verify', { code }),
};
