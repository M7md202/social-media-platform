'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@store/index';
import { useRouter } from 'next/navigation';
import { authService } from '@services/auth';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Card } from '@components/Card';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.login(email, password);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50 dark:from-dark-900 dark:to-dark-800 p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Welcome Back</h1>
          <p className="text-dark-600 dark:text-dark-400 mt-2">Sign in to your social media platform</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-sm">
              {error}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-dark-600 dark:text-dark-400">
            Don't have an account?{' '}
            <a href="/auth/signup" className="text-primary-500 hover:text-primary-600 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}
