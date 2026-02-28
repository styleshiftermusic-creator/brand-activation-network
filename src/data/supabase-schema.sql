-- ==========================================
-- BRAND ACTIVATION NETWORK - DATABASE SCHEMA
-- ==========================================

-- 1. Create Core Tables
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    name TEXT,
    clearance_level TEXT DEFAULT 'OPERATIVE',
    stripe_customer_id TEXT UNIQUE,
    subscription_status TEXT DEFAULT 'INACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.course_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    module_id TEXT NOT NULL,
    status TEXT DEFAULT 'LOCKED' CHECK (status IN ('LOCKED', 'ACTIVE', 'COMPLETED')),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, module_id)
);

CREATE TABLE public.quiz_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    module_id TEXT NOT NULL,
    score INTEGER NOT NULL,
    passed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Setup Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_scores ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
-- Profiles: Users can only read and update their own profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Course Progress: Users can only read and update their own progress
CREATE POLICY "Users can view own course progress" ON public.course_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own course progress" ON public.course_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own course progress" ON public.course_progress FOR UPDATE USING (auth.uid() = user_id);

-- Quiz Scores: Users can only read and insert their own scores
CREATE POLICY "Users can view own quiz scores" ON public.quiz_scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quiz scores" ON public.quiz_scores FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. Supabase Auth Trigger (Auto-create Profile upon Signup)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, clearance_level)
  VALUES (new.id, new.raw_user_meta_data->>'name', 'OPERATIVE');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
