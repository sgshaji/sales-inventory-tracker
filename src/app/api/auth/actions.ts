import { LoginFormValues, SignupFormValues } from '@/lib/validations/auth';
import { login, signup } from '@/api/auth';

export async function signUp(data: SignupFormValues) {
  return signup(data);
}

export async function signIn(data: LoginFormValues) {
  return login(data);
}