import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nuuyntbpxiluagkxuskg.supabase.co';
const supabaseAnonKey = 'sb_publishable_Oz_K_jasOsnEK84TTpAHTg_zaheuzRE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);