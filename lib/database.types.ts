export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          phone: string | null
          user_type: 'guest' | 'host' | 'super_admin'
          username: string
          password_hash: string
          created_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          email: string
          name: string
          phone?: string | null
          user_type?: 'guest' | 'host' | 'super_admin'
          username: string
          password_hash: string
          created_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          email?: string
          name?: string
          phone?: string | null
          user_type?: 'guest' | 'host' | 'super_admin'
          username?: string
          password_hash?: string
          created_at?: string
          is_active?: boolean
        }
      }
      photos: {
        Row: {
          id: string
          user_id: string
          filename: string
          original_name: string
          file_path: string
          caption: string | null
          status: 'pending' | 'approved' | 'rejected'
          uploaded_at: string
          reviewed_at: string | null
          reviewed_by: string | null
        }
        Insert: {
          id?: string
          user_id: string
          filename: string
          original_name: string
          file_path: string
          caption?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          uploaded_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          filename?: string
          original_name?: string
          file_path?: string
          caption?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          uploaded_at?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
        }
      }
      rsvp_confirmations: {
        Row: {
          id: string
          user_id: string
          guests_count: number
          message: string | null
          confirmed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          guests_count?: number
          message?: string | null
          confirmed_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          guests_count?: number
          message?: string | null
          confirmed_at?: string
        }
      }
      user_sessions: {
        Row: {
          id: string
          user_id: string
          session_token: string
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          session_token: string
          expires_at: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          session_token?: string
          expires_at?: string
          created_at?: string
        }
      }
      access_tokens: {
        Row: {
          id: string
          user_id: string
          token: string
          token_type: 'login' | 'password_reset' | 'email_verification'
          expires_at: string
          used_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          token: string
          token_type?: 'login' | 'password_reset' | 'email_verification'
          expires_at: string
          used_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          token?: string
          token_type?: 'login' | 'password_reset' | 'email_verification'
          expires_at?: string
          used_at?: string | null
          created_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string
          action: string
          details: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          action: string
          details?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          action?: string
          details?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      system_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: string
          description: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          setting_key: string
          setting_value: string
          description?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: string
          setting_key?: string
          setting_value?: string
          description?: string | null
          updated_at?: string
          updated_by?: string | null
        }
      }
    }
    Functions: {
      verify_password: {
        Args: {
          input_username: string
          input_password: string
        }
        Returns: boolean
      }
      update_user_password: {
        Args: {
          user_id: string
          new_password: string
        }
        Returns: void
      }
    }
  }
}
