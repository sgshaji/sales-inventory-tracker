import { LoginFormValues, SignupFormValues } from '@/lib/validations/auth';
import { supabase } from '@/db/clients/supabase';

export const login = async ({ email, password }: LoginFormValues) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) throw error;
    if (!data.user?.email) throw new Error('User email is missing');
    
    return { user: { id: data.user.id, email: data.user.email } };
  } catch (error) {
    throw error instanceof Error ? error : new Error('Login failed');
  }
};

export const signup = async ({ email, password, name }: SignupFormValues) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          name: name.trim()
        }
      }
    });

    if (error) throw error;
    return { user: data.user, error: null };
  } catch (error) {
    return { user: null, error: error instanceof Error ? error.message : 'Signup failed' };
  }
};
