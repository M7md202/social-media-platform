'use client';

import React, { useState } from 'react';
import { authService } from '@services/auth';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Card } from '@components/Card';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await authService.signup(
        formData.email,
        formData.username,
        formData.password,
        formData.firstName,
        formData.lastName
      );
      
      router.push('/auth/login?message=Signup successful, please login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50 dark:from-dark-900 dark:to-dark-800 p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Create Account</h1>
          <p className="text-dark-600 dark:text-dark-400 mt-2">Join us and manage your social media</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Username"
            name="username"
            placeholder="johndoe"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-dark-600 dark:text-dark-400">
            Already have an account?{' '}
            <a href="/auth/login" className="text-primary-500 hover:text-primary-600 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}
