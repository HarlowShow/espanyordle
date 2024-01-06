import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServerKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseServerKey);

// Export for usage by the rest of the app
export { supabase }