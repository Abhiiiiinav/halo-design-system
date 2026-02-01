
import { createClient, SupabaseClient } from '@supabase/supabase-js'

export type Database = {
  public: {
    Tables: {
      subscribers: {
        Row: { id: number; email: string; created_at: string }
        Insert: { email: string }
        Update: { email?: string }
      }
    }
  }
}

let supabaseInstance: SupabaseClient<Database> | null = null

export const getSupabase = () => {
    if (supabaseInstance) {
        return supabaseInstance
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Missing Supabase environment variables!')
        throw new Error('Supabase credentials not configured')
    }

    supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey)
    return supabaseInstance
}

