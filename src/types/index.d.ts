export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface Conversation {
  id: number;
  messages: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  avatar: string | null;
  country: string;
  date_birth: string;
  email: string;
  email_verified_at: Date;
  major: string;
  name: string;
  phone: string;
  refferal: string | null;
  plan: {
    id: number;
    user_id: number;
    plan_name: string;
    plan_price: number;
    plan_cycle: string;
    convo_duration: number;
    daily_convo: number;
    expired_date: string;
    status: string;
    created_at: Date;
    updated_at: Date;
  } | null;
  created_at: Date;
  updated_at: Date;
}

export interface Major {
  major_grouping: string[];
  major_recommendation: string;
  user_data: {
    phone: string;
    edu_background: string;
    career_impact: string[];
    email: string;
    emerging_trends: string[];
    favorite_activities: string[];
    favorite_subject: string[];
    inspiration: string[];
    name: string;
    passionate_challenges: string[];
    specific_environment: string[];
    strongest_skills: string[];
  };
}

export interface ParsedMajor {
  greeting: string;
  introduction: string;
  majors: {
    name: string;
    description: string;
  }[];
  conclusion: string;
}

export interface Plan {
  id: number;
  name: string;
  monthly_price: number;
  yearly_price: number;
  is_popular: boolean;
  convo_duration: number;
  daily_convo: number;
  created_at: Date;
  updated_at: Date;
  header: string;
  tagline: string;
}
