import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
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
import { AuthCard } from '@/components/auth/auth-card';
import { AuthLogo } from '@/components/auth/auth-logo';
import { useToast } from '@/hooks/use-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      console.log(data);
      setIsLoading(false);
      setIsSuccess(true);
      toast({
        title: 'Reset link sent',
        description: 'Please check your email for the password reset link.',
      });
    }, 2000);
  }

  if (isSuccess) {
    return (
      <AuthCard>
        <div className="space-y-6">
          <AuthLogo />
          
          <div className="flex flex-col items-center justify-center space-y-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Check your inbox</h1>
            <p className="text-sm text-muted-foreground">
              We've sent a password reset link to your email address.
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsSuccess(false)}
          >
            Back to reset password
          </Button>

          <div className="text-center text-sm">
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-[#3E6AE1] hover:underline"
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to sign in
            </Link>
          </div>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <div className="space-y-6">
        <AuthLogo />
        
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Reset your password</h1>
          <p className="text-sm text-muted-foreground">
            Enter the email linked to your account and we'll send a reset link.
          </p>
        </div>

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
                        aria-label="Email address"
                        autoFocus
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending reset link...
                </>
              ) : (
                'Send reset link'
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-muted-foreground hover:underline"
          >
            <ArrowLeft className="mr-1 h-3 w-3" />
            Back to sign in
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}