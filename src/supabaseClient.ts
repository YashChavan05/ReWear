import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://faettuuyiyebjzxvhirv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZXR0dXV5aXllYmp6eHZoaXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMTY1NjgsImV4cCI6MjA2Nzg5MjU2OH0.39ClAgJGLQM72WVoEoPZzTZk1wcTdkUr8UQ1QaUsX4k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test function to verify Supabase connection
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    console.log('Supabase connection test:', { data, error });
    return { success: !error, error };
  } catch (err) {
    console.error('Supabase connection test failed:', err);
    return { success: false, error: err };
  }
}; 