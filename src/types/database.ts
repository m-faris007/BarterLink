export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          bio: string | null
          created_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          bio?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          bio?: string | null
          created_at?: string | null
        }
      }
      offers: {
        Row: {
          id: string
          user_id: string | null
          title: string | null
          description: string | null
          category: string | null
          type: string | null
          tags: string[] | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          title?: string | null
          description?: string | null
          category?: string | null
          type?: string | null
          tags?: string[] | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          title?: string | null
          description?: string | null
          category?: string | null
          type?: string | null
          tags?: string[] | null
          created_at?: string | null
        }
      }
      exchange_requests: {
        Row: {
          id: string
          from_user_id: string | null
          to_user_id: string | null
          offer_id: string | null
          message: string | null
          status: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          from_user_id?: string | null
          to_user_id?: string | null
          offer_id?: string | null
          message?: string | null
          status?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          from_user_id?: string | null
          to_user_id?: string | null
          offer_id?: string | null
          message?: string | null
          status?: string | null
          created_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}