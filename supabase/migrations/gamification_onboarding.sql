-- Migration: Gamification & Onboarding

-- 1. Create the user profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    revenue_bracket text,
    primary_offer text,
    biggest_bottleneck text,
    onboarding_completed boolean DEFAULT false NOT NULL,
    credits integer DEFAULT 0 NOT NULL,
    badges text[] DEFAULT '{}'::text[] NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Protect the table using RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT TO authenticated
USING (auth.uid() = id);

-- Allow users to update their own profile (e.g. during onboarding)
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE TO authenticated
USING (auth.uid() = id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = id);

-- 2. Create function to automatically create a profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Optional: Backfill profiles for existing users
INSERT INTO public.profiles (id)
SELECT id FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);
