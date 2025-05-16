// Environment Variables
export const ENV = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

// Validate environment variables
export function validateEnv() {
  const missingVars = [];

  if (!ENV.SUPABASE_URL) {
    missingVars.push('NEXT_PUBLIC_SUPABASE_URL');
  }
  if (!ENV.SUPABASE_ANON_KEY) {
    missingVars.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}. ` +
      'Please check your .env.local file.'
    );
  }
}
