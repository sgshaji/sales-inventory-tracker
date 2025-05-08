'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2, CreditCard, User, KeyRound, LayoutDashboard, Mail } from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

// Step 1: Shop Info schema
const shopInfoSchema = z.object({
  shopName: z.string().min(3, { message: 'Shop name must be at least 3 characters' }),
  currency: z.string().min(1, { message: 'Please select a currency' }),
});

// Step 2: Admin User schema
const adminUserSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});

// Combined schema for all steps
const signupSchema = z.object({
  ...shopInfoSchema.shape,
  ...adminUserSchema.shape,
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      shopName: '',
      currency: '',
      name: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const currentSchema = step === 1 ? shopInfoSchema : adminUserSchema;
  const currentFields = Object.keys(currentSchema.shape);
  
  const isCurrentStepValid = currentFields.every(
    (field) => !form.formState.errors[field as keyof SignupFormValues]
  );

  function getPasswordStrength(password: string): number {
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    
    return strength;
  }

  const passwordStrength = getPasswordStrength(form.watch('password'));

  function getPasswordStrengthColor(strength: number): string {
    if (strength <= 25) return 'bg-red-500';
    if (strength <= 50) return 'bg-orange-500';
    if (strength <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  }

  function nextStep() {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  }

  function prevStep() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  function onSubmit(data: SignupFormValues) {
    if (step < totalSteps) {
      nextStep();
      return;
    }
    
    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      console.log(data);
      setIsLoading(false);
      setIsComplete(true);
      toast({
        title: 'Account created',
        description: 'Your account has been successfully created!',
      });
    }, 2000);
  }

  if (isComplete) {
    return (
      <AuthCard>
        <div className="space-y-6">
          <AuthLogo />
          
          <div className="flex flex-col items-center justify-center space-y-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Setup complete!</h1>
            <p className="text-sm text-muted-foreground">
              Your account has been created successfully.
            </p>
          </div>

          <Button className="w-full" onClick={() => router.push('/dashboard')}>
            Enter your dashboard
          </Button>

          <div className="text-center text-sm">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:underline"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard className="max-w-md">
      <div className="space-y-6">
        <AuthLogo />
        
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {step === 1 ? 'Shop Information' : step === 2 ? 'Admin User' : 'Almost done'}
            </h1>
            <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
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
                          <Input
                            {...field}
                            placeholder="Your Shop Name"
                            className="pl-10"
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
                          <Input
                            {...field}
                            placeholder="Your Full Name"
                            className="pl-10"
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
                    <FormItem className="space-y-2">
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Create a password"
                            className="pl-10"
                            type="password"
                          />
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
                    <p className="text-sm text-muted-foreground">All set up and ready for you to explore</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">You're about to create:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Shop: <span className="font-medium">{form.getValues('shopName')}</span></span>
                    </li>
                    <li className="flex items-start space-x-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Admin account: <span className="font-medium">{form.getValues('email')}</span></span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <div className="flex justify-between space-x-4 pt-4">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
              ) : (
                <div />
              )}
              
              <Button 
                type={step === totalSteps ? 'submit' : 'button'} 
                className="flex-1"
                onClick={step < totalSteps ? () => form.trigger(currentFields as any).then(valid => {
                  if (valid) nextStep();
                }) : undefined}
                disabled={step < totalSteps ? !isCurrentStepValid : isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
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
            <Link
              href="/login"
              className="text-sm text-[#3E6AE1] hover:underline"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </AuthCard>
  );
}