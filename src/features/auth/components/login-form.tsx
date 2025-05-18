// File: src/features/auth/components/login-form.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, KeyRound, Loader2 } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/store/auth-store'
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabaseClient'

export function LoginForm() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const [loading, setLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginFormValues) => {
    console.log('🔍 [Login] Attempting login with:', data)
    setLoading(true)

    const { data: resData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    console.log('🔍 [Login] Response:', { resData, error })

    if (error) {
      console.error('❌ [Login] Error:', error)
      if (error.message.toLowerCase().includes('confirm')) {
        toast.error('Please confirm your email before logging in.')
      } else {
        toast.error(`Login failed: ${error.message}`)
      }
      setLoading(false)
      return
    }

    const user = resData.session?.user
    if (user) {
      console.log('✅ [Login] Success, session:', resData.session)
      setUser(user)
      router.push('/dashboard')
    } else {
      toast.error('Login failed: no session created.')
    }

    setLoading(false)
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
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
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
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    autoComplete="current-password"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading || form.formState.isSubmitting}>
          {loading ? (
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
  )
}
