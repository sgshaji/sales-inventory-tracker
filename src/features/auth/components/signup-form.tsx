// File: src/features/auth/components/signup-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import {
  CheckCircle2,
  CreditCard,
  KeyRound,
  LayoutDashboard,
  Loader2,
  Mail,
  User,
} from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { signUpSchema } from '@/lib/validations/auth';
import type { SignupFormValues } from '@/lib/validations/auth';
import { supabase } from '@/lib/supabaseClient';

export function SignUpForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      shopName: '',
      currency: '',
      name: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const getPasswordStrength = (password: string): number => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthColor = (strength: number): string => {
    if (strength <= 25) return 'bg-red-500';
    if (strength <= 50) return 'bg-orange-500';
    if (strength <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const currentSchema =
    step === 1
      ? signUpSchema.pick({ shopName: true, currency: true })
      : signUpSchema.pick({ name: true, email: true, password: true });
  const currentFields = Object.keys(currentSchema.shape) as Array<
    keyof SignupFormValues
  >;
  const isCurrentStepValid = currentFields.every(
    (field) => !form.formState.errors[field]
  );
  const passwordStrength = getPasswordStrength(form.watch('password'));

  const handleNextStep = () => {
    if (step < totalSteps) setStep((s) => s + 1);
  };
  const handlePrevStep = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const onSubmit = async () => {
    if (step < totalSteps) {
      handleNextStep();
      return;
    }

    setIsLoading(true);
    try {
      const values = form.getValues();

      // 1) Create Auth user
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: { emailRedirectTo: `${window.location.origin}/login` },
        });
      console.log('🧪 Supabase.signUp →', { signUpData, signUpError });

      if (signUpError || !signUpData?.user) {
        toast({
          title: 'Signup failed',
          description: signUpError?.message || 'No user returned.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      // 2) Insert shop record
      const userId = signUpData.user.id;
      const { error: shopError } = await supabase
        .from('shops')
        .insert([
          { owner_id: userId, name: values.shopName, currency: values.currency },
        ]);
      console.log('🧪 Supabase.insert(shops) →', { shopError });

      if (shopError) {
        toast({
          title: 'Setup incomplete',
          description: 'Shop record creation failed.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      // 3) Success state
      setIsComplete(true);
      toast({
        title: 'Account & shop created',
        description: 'Please check your email to confirm.',
      });
    } catch (err: any) {
      toast({
        title: 'Unexpected error',
        description: err.message || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isComplete) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Setup complete!</h1>
          <p className="text-sm text-muted-foreground">
            Your account and shop have been created.
          </p>
        </div>
        <Button className="w-full" onClick={() => router.push('/dashboard')}>
          Enter your dashboard
        </Button>
        <div className="text-center text-sm">
          <Link href="/login" className="text-sm text-muted-foreground hover:underline">
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {step === 1
              ? 'Shop Information'
              : step === 2
              ? 'Admin User'
              : 'Almost done'}
          </h1>
          <span className="text-sm text-muted-foreground">
            Step {step} of {totalSteps}
          </span>
        </div>
        <Progress value={(step / totalSteps) * 100} className="h-1" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="shopName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shop Name</FormLabel>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input {...field} placeholder="Your Shop Name" className="pl-10" autoFocus />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="jpy">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input {...field} placeholder="Your Full Name" className="pl-10" autoFocus />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input {...field} placeholder="name@example.com" className="pl-10" type="email" />
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
                  <FormItem className="space-y-2">
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input {...field} placeholder="Create a password" className="pl-10" type="password" />
                      </FormControl>
                    </div>
                    {field.value && (
                      <div className="space-y-1">
                        <Progress
                          value={passwordStrength}
                          className={`h-1 ${getPasswordStrengthColor(passwordStrength)}`}
                        />
                        <p className="text-xs text-muted-foreground">
                          {passwordStrength <= 25
                            ? 'Weak password'
                            : passwordStrength <= 50
                            ? 'Fair password'
                            : passwordStrength <= 75
                            ? 'Good password'
                            : 'Strong password'}
                        </p>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4 flex items-center space-x-4">
                <div className="bg-muted p-2 rounded-md">
                  <LayoutDashboard className="h-6 w-6 text-[#3E6AE1]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Your Dashboard Awaits</h3>
                  <p className="text-sm text-muted-foreground">
                    All set up and ready for you to explore
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">You&apos;re about to create:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>
                      Shop: <span className="font-medium">{form.getValues('shopName')}</span>
                    </span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>
                      Admin account: <span className="font-medium">{form.getValues('email')}</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <div className="flex justify-between space-x-4 pt-4">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
            ) : (
              <div />
            )}
            <Button
              type={step === totalSteps ? 'submit' : 'button'}
              className="flex-1"
              onClick={
                step < totalSteps
                  ? () =>
                      form.trigger(currentFields).then((valid) => {
                        if (valid) handleNextStep();
                      })
                  : undefined
              }
              disabled={step < totalSteps ? !isCurrentStepValid : isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {step < totalSteps ? 'Continue...' : 'Creating...'}
                </>
              ) : step < totalSteps ? (
                'Continue'
              ) : (
                'Create Account'
              )}
            </Button>
          </div>
        </form>
      </Form>
      {step === 1 && (
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link href="/login" className="text-sm text-[#3E6AE1] hover:underline">
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
}
