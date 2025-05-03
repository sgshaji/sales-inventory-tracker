import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Loader2 } from 'lucide-react';
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
import { SocialButton } from '@/components/auth/social-button';
import { AuthDivider } from '@/components/auth/auth-divider';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isMagicLinkLoading, setIsMagicLinkLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
  });

  function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      console.log(data);
      setIsLoading(false);
      toast({
        title: 'Success',
        description: 'You have successfully signed in!',
      });
    }, 2000);
  }

  function handleGoogleSignIn() {
    setIsGoogleLoading(true);
    // Simulate API request
    setTimeout(() => {
      setIsGoogleLoading(false);
      toast({
        title: 'Success',
        description: 'You have successfully signed in with Google!',
      });
    }, 2000);
  }

  function handleMagicLink() {
    setIsMagicLinkLoading(true);
    // Simulate API request
    setTimeout(() => {
      setIsMagicLinkLoading(false);
      toast({
        title: 'Magic Link Sent',
        description: 'Please check your email for the magic link.',
      });
    }, 2000);
  }

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

        <div className="space-y-4">
          <SocialButton
            icon={<Mail className="h-4 w-4" />}
            text="Continue with Google"
            onClick={handleGoogleSignIn}
            isLoading={isGoogleLoading}
          />
          
          <SocialButton
            icon={<Mail className="h-4 w-4" />}
            text="Continue with Magic Link"
            onClick={handleMagicLink}
            isLoading={isMagicLinkLoading}
          />
        </div>

        <AuthDivider />

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
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
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

        <div className="text-center text-sm">
          <Link
            to="/forgot-password"
            className="text-sm text-[#3E6AE1] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">New here? </span>
          <Link
            to="/signup"
            className="text-sm text-[#3E6AE1] hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}