-- Supabase Migration: Initial Setup
-- Run this in the Supabase SQL Editor to generate the necessary tables

-- 1. Create the webinar_registrations table for Lead Capture
CREATE TABLE IF NOT EXISTS public.webinar_registrations (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name text NOT NULL,
    email text NOT NULL UNIQUE,
    phone text,
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
-- 'status' is the single source of truth: LOCKED | ACTIVE | COMPLETED
CREATE TABLE IF NOT EXISTS public.course_progress (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    module_id text NOT NULL,
    status text NOT NULL DEFAULT 'LOCKED',
    completed boolean GENERATED ALWAYS AS (status = 'COMPLETED') STORED,
    unlocked boolean GENERATED ALWAYS AS (status != 'LOCKED') STORED,
    last_accessed timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, module_id),
    CONSTRAINT status_check CHECK (status IN ('LOCKED', 'ACTIVE', 'COMPLETED'))
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

-- 3. Optimization Pass (Data Architect)
-- Explicit Indexes for Foreign Keys and High-Traffic Lookups
CREATE INDEX IF NOT EXISTS idx_course_progress_user_id ON public.course_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_webinar_registrations_email ON public.webinar_registrations(email);

-- Note from Data Architect: The missing SELECT policy on webinar_registrations
-- is an intentional security design choice, preventing unauthenticated iteration
-- over captured leads. Only the service_role key can read this data.

-- =============================================================================
-- MIGRATION SCRIPT — Run this if the table already exists in your Supabase DB
-- =============================================================================

-- Add 'status' column to course_progress if it doesn't already exist
ALTER TABLE public.course_progress
    ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'LOCKED';

-- Add constraint to enforce valid status values (safe to run even if it exists)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'status_check'
        AND conrelid = 'public.course_progress'::regclass
    ) THEN
        ALTER TABLE public.course_progress
            ADD CONSTRAINT status_check CHECK (status IN ('LOCKED', 'ACTIVE', 'COMPLETED'));
    END IF;
END $$;

-- Add 'phone' column to webinar_registrations if it doesn't already exist
ALTER TABLE public.webinar_registrations
    ADD COLUMN IF NOT EXISTS phone text;

-- Backfill: set status based on existing boolean columns for any existing rows
UPDATE public.course_progress
SET status = CASE
    WHEN completed = true THEN 'COMPLETED'
    WHEN unlocked = true THEN 'ACTIVE'
    ELSE 'LOCKED'
END
WHERE status = 'LOCKED';
