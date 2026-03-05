import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gydlbsfamzqitvonrexn.supabase.co"
const supabaseAnonKey = "sb_publishable_93_N-JFJGYQpjCUHy9yYnw_qfYz7Hlf"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)