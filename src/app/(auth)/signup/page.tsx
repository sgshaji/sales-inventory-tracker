// File: src/app/(auth)/signup/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { AuthCard } from '@/features/auth';
import { SignUpForm } from '@/features/auth/components/signup-form';
import { SocialAuth } from '@/features/auth/components/social-auth';
import { useToast } from '@/hooks/use-toast';
export const dynamic = 'force-dynamic';

export default function SignupPage() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isMagicLinkLoading, setIsMagicLinkLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleSignIn = useCallback(() => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      toast({
        title: 'Success',
        description: 'You have successfully signed in with Google!',
      });
    }, 2000);
  }, [toast]);

  const handleMagicLink = useCallback(() => {
    setIsMagicLinkLoading(true);
    setTimeout(() => {
      setIsMagicLinkLoading(false);
      toast({
        title: 'Magic Link Sent',
        description: 'Please check your email for the magic link.',
      });
    }, 2000);
  }, [toast]);

  return (
    <AuthCard>
      <SignUpForm />
      <SocialAuth
        onGoogleSignIn={handleGoogleSignIn}
        onMagicLink={handleMagicLink}
        isGoogleLoading={isGoogleLoading}
        isMagicLinkLoading={isMagicLinkLoading}
      />
    </AuthCard>
);
}
