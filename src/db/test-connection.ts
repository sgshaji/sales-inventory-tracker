import { supabase } from './clients/supabase';

export async function testSupabaseConnection() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Supabase connection error:', error.message);
    return false;
  }
  console.log('Supabase connection successful! Sample data:', data);
  return true;
}

// ESM-compatible entrypoint detection
if (import.meta.url === `file://${process.argv[1]}`) {
  testSupabaseConnection();
} 