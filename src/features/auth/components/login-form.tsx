'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/auth';
import { Mail, Loader2, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/lib/store/auth-store';
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth';
import { memo } from 'react';
import { toast } from 'sonner';

interface LoginFormProps {
  onSubmit?: (data: LoginFormValues) => void;
  isLoading?: boolean;
}

export const LoginForm = memo(function LoginForm({ onSubmit: externalSubmit, isLoading }: LoginFormProps) {
  const { setUser } = useAuthStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.user);
      externalSubmit?.({ email: data.user.email, password: '' });
    },
    onError: (error: Error) => {
      toast.error('Login failed', {
        description: error.message,
      });
    },
  });

  async function onSubmit(data: LoginFormValues) {
    loginMutation.mutate(data);
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
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input
                    {...field}
                    placeholder="name@example.com"
                    className="pl-10"
                    type="email"
                    autoComplete="email"
                    autoFocus
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your password"
                    className="pl-10"
                    type="password"
                    autoComplete="current-password"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading || form.formState.isSubmitting}>
          {isLoading || form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </Form>
  );
});