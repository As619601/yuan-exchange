import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// สร้างตัวเชื่อมต่อที่เป็นมิตรต่อการเรียกใช้งาน
export const supabase = createClient(supabaseUrl, supabaseAnonKey);