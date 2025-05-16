'use client';

import dynamic from 'next/dynamic';

const LoginPageContent = dynamic(
  () => import('@/features/auth/pages/login/page'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }
);

export default function LoginPage() {
  return <LoginPageContent />;
}
