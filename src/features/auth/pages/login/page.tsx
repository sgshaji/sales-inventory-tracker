'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { AuthCard, AuthDivider, AuthLogo } from '@/features/auth';
import { LoginForm } from '@/features/auth/components/login-form';
import { SocialAuth } from '@/features/auth/components/social-auth';
import { toast } from 'sonner';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isMagicLinkLoading, setIsMagicLinkLoading] = useState(false);

  const handleSubmit = useCallback((data: { email: string; password: string }) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log(data);
      setIsLoading(false);
      toast.success('Success', {
        description: 'You have successfully signed in!',
      });
    }, 2000);
  }, []);

  const handleGoogleSignIn = useCallback(() => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      toast.success('Success', {
        description: 'You have successfully signed in with Google!',
      });
    }, 2000);
  }, []);

  const handleMagicLink = useCallback(() => {
    setIsMagicLinkLoading(true);
    setTimeout(() => {
      setIsMagicLinkLoading(false);
      toast.success('Magic Link Sent', {
        description: 'Please check your email for the magic link.',
      });
    }, 2000);
  }, []);

  return (
    <AuthCard>
      <div className="space-y-6">
        <AuthLogo />

        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <SocialAuth
          onGoogleSignIn={handleGoogleSignIn}
          onMagicLink={handleMagicLink}
          isGoogleLoading={isGoogleLoading}
          isMagicLinkLoading={isMagicLinkLoading}
        />

        <AuthDivider />

        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />

        <div className="text-center text-sm">
          <Link
            href="/forgot-password"
            className="text-sm text-[#3E6AE1] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">New here? </span>
          <Link href="/signup" className="text-sm text-[#3E6AE1] hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}