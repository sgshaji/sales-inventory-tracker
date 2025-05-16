
'use client';

import { Mail } from 'lucide-react';
import { SocialButton } from './social-button';
import { memo } from 'react';

interface SocialAuthProps {
  onGoogleSignIn: () => void;
  onMagicLink: () => void;
  isGoogleLoading: boolean;
  isMagicLinkLoading: boolean;
}

export const SocialAuth = memo(function SocialAuth({
  onGoogleSignIn,
  onMagicLink,
  isGoogleLoading,
  isMagicLinkLoading,
}: SocialAuthProps) {
  return (
    <div className="space-y-4">
      <SocialButton
        icon={<Mail className="h-4 w-4" />}
        text="Continue with Google"
        onClick={onGoogleSignIn}
        isLoading={isGoogleLoading}
      />
      <SocialButton
        icon={<Mail className="h-4 w-4" />}
        text="Send Magic Link"
        onClick={onMagicLink}
        isLoading={isMagicLinkLoading}
      />
    </div>
  );
});
