import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          role: 'farmer' | 'officer' | 'admin';
          phone: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      farmer_profiles: {
        Row: {
          id: string;
          user_id: string;
          land_size: number | null;
          village: string | null;
          district: string | null;
          farming_category: string | null;
          crop_type: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      officer_profiles: {
        Row: {
          id: string;
          user_id: string;
          district: string | null;
          designation: string | null;
          department: string | null;
          employee_id: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      schemes: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          eligibility: string | null;
          benefits: string | null;
          max_amount: number | null;
          deadline: string | null;
          status: 'active' | 'inactive' | 'archived';
          category: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      applications: {
        Row: {
          id: string;
          farmer_id: string;
          scheme_id: string | null;
          status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'correction_required';
          remarks: string | null;
          ai_score: number | null;
          officer_id: string | null;
          submitted_at: string;
          updated_at: string;
        };
      };
      documents: {
        Row: {
          id: string;
          application_id: string;
          farmer_id: string | null;
          document_type: string;
          file_url: string | null;
          file_name: string | null;
          verification_status: 'pending' | 'verified' | 'rejected' | 'flagged';
          uploaded_at: string;
        };
      };
      grievances: {
        Row: {
          id: string;
          farmer_id: string;
          category: string;
          title: string;
          description: string | null;
          priority: 'low' | 'medium' | 'high' | 'critical';
          status: 'open' | 'in_progress' | 'resolved' | 'escalated' | 'closed';
          assigned_officer: string | null;
          ai_category: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      grievance_responses: {
        Row: {
          id: string;
          grievance_id: string;
          officer_id: string | null;
          response_text: string;
          created_at: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: 'info' | 'success' | 'warning' | 'error';
          is_read: boolean;
          created_at: string;
        };
      };
      ai_verification_logs: {
        Row: {
          id: string;
          application_id: string;
          completeness_score: number | null;
          confidence_score: number | null;
          flagged_issues: any;
          suggestions: any;
          created_at: string;
        };
      };
      activity_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          target_type: string | null;
          target_id: string | null;
          metadata: any;
          created_at: string;
        };
      };
    };
  };
}
