'use client';
// Disable Next.js Static Generation for this page
export const dynamic = 'force-dynamic';

import React from 'react';
import dynamicImport from 'next/dynamic';

// Dynamically load the forgot-password form component on the client
const ForgotPasswordForm = dynamicImport(
  () => import('@/features/auth/components/forgot-password-form'),
  { ssr: false }
);

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
      <ForgotPasswordForm />
    </div>
  );
}
