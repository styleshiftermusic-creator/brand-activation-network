-- Supabase Migration: Initial Setup
-- Run this in the Supabase SQL Editor to generate the necessary tables

-- 1. Create the webinar_registrations table for Lead Capture
CREATE TABLE IF NOT EXISTS public.webinar_registrations (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name text NOT NULL,
    email text NOT NULL UNIQUE,
    event_name text DEFAULT 'AI Workshop Engine Challenge',
    attended boolean DEFAULT false,
    registered_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Protect the table using RLS (Row Level Security)
-- Allow public insertions into this table via the Anon key (for lead capture forms)
ALTER TABLE public.webinar_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts for webinar_registrations"
ON public.webinar_registrations
FOR INSERT TO public
WITH CHECK (true);

-- 2. Create the course_progress table for the Dashboard Tracker
CREATE TABLE IF NOT EXISTS public.course_progress (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    module_id text NOT NULL,
    completed boolean DEFAULT false,
    unlocked boolean DEFAULT false,
    last_accessed timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, module_id)
);

ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own course progress"
ON public.course_progress
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own course progress"
ON public.course_progress
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own course progress"
ON public.course_progress
FOR UPDATE TO authenticated
USING (auth.uid() = user_id);
