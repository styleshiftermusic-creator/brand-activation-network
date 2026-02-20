# Database Architecture Plan

**Objective:** Design a scalable backend architecture for the Brand Activation Network to capture leads via webinars/challenges and deliver authenticated premium course content (The AI Workshop Engine).

## Entities & Schemas

### 1. `users` | The Core Lead & Customer Table

Stores both free leads captured via the funnel and paid users accessing the course dashboard.

* `id` (UUID, Primary Key)
* `email` (String, Unique)
* `full_name` (String)
* `phone_number` (String, Optional) - Critical for SMS marketing sequences.
* `is_premium` (Boolean) - Flags whether they have purchased the 7-Module Course.
* `created_at` (Timestamp)

### 2. `webinar_registrations` | The Funnel Captures

Tracks opt-ins for specific one-to-many sales events (e.g., Weekly Challenges).

* `id` (UUID, Primary Key)
* `user_id` (UUID, Foreign Key -> `users.id`)
* `event_name` (String) - E.g., "AI Workshop Engine Challenge"
* `attended` (Boolean, Default: false)
* `registered_at` (Timestamp)

### 3. `course_progress` | The Dashboard Tracker

Monitors student movement through the AI Workshop Engine modules to ensure they follow the blueprint "To A T".

* `id` (UUID, Primary Key)
* `user_id` (UUID, Foreign Key -> `users.id`)
* `module_number` (Integer) - E.g., Module 1 through 7
* `completed` (Boolean)
* `last_accessed` (Timestamp)

## Technology Stack Recommendation (Future MCP Hookup)

* **Database:** Supabase (PostgreSQL) – Ideal for rapid agency scaling and built-in Row-Level Security (RLS) for the course dashboard.
* **Authentication:** Supabase Auth (Magic Links or OAuth) for frictionless access to the `is_premium` content.
* **ORM:** Prisma – To ensure type-safe database queries natively within Next.js API Routes.

*Note: This architecture is currently proposed as a schema definition. Actual deployment will run via the `@backend` sub-agent once Supabase/PostgreSQL credentials are provided in the environment.*
