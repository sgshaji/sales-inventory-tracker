// File: src/features/auth/components/forgot-password-form.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabaseClient';
import { loginSchema } from '@/lib/validations/auth';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type ForgotValues = Pick<typeof loginSchema._type, 'email'>;

export default function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ForgotValues>({
    resolver: zodResolver(loginSchema.pick({ email: true })),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotValues) => {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast.error(`Error: ${error.message}`);
    } else {
      toast.success('Password reset link sent. Check your email.');
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="p-4 text-center">
        <p className="text-green-600">A reset link has been sent to your email.</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Send reset link
        </Button>
      </form>
    </Form>
  );
}
