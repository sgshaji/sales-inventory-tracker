'use client';

import dynamic from 'next/dynamic';

const SignupPageContent = dynamic(
  () => import('@/features/auth/pages/signup/page'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }
);

export default function SignupPage() {
  return <SignupPageContent />;
}
