Build a premium, production-grade, futuristic agri-fintech web platform called “CropCred” with a clean, elegant, high-trust UI and a fully role-based authentication system.

IMPORTANT:
This website should NOT feel like a student prototype.
It should feel like a startup-level, investor-ready, hackathon-winning SaaS platform.

====================================================
PROJECT OVERVIEW
====================================================

CropCred is an AI-powered agricultural credit scoring platform that helps smallholder farmers get fair and faster access to loans using satellite imagery, crop health analysis, repayment history, farm data, and risk intelligence.

The platform serves 3 user roles:
1. Farmer
2. Banker / Financial Institution
3. Admin

The entire application must be built as a modern, scalable, premium full-stack web app.

====================================================
SUPABASE PROJECT CONFIGURATION (IMPORTANT)
====================================================

Use this exact Supabase project URL:
https://zwakbazcinxvnsoagqys.supabase.co

IMPORTANT SECURITY RULES:
- DO NOT hardcode any API keys directly into components or source files.
- DO NOT expose secrets in plain code.
- Use environment variables only.
- Create a `.env.example` file and use these variables:

VITE_SUPABASE_URL=https://zwakbazcinxvnsoagqys.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY

- Use these env variables inside the frontend Supabase client setup.
- Generate a proper `src/lib/supabase.ts` file.
- Make the app fully Supabase integration-ready.

====================================================
MAIN GOAL
====================================================

Redesign the current website into a professional SaaS-style product with:

- A polished premium landing page
- A role-based login system
- Demo credentials login
- Clean route protection
- Separate dashboards for Farmer, Banker, and Admin
- Futuristic but practical UI
- Strong trust-building fintech + agri visual identity

====================================================
TECH STACK (USE HIGH-TECH STACK)
====================================================

Use a modern and powerful stack:

FRONTEND:
- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Lucide React icons
- Recharts (for analytics)
- ShadCN UI components
- React Hook Form
- Zod validation
- Zustand for state management
- Axios
- TanStack Query
- Sonner
- date-fns
- clsx
- tailwind-merge
- class-variance-authority

BACKEND / DATABASE / AUTH:
- Supabase
- Supabase Auth
- Supabase PostgreSQL
- Supabase Row Level Security (RLS)
- Supabase Storage (if needed)

PROJECT STRUCTURE:
Generate a proper production-ready folder structure with:
- src/
- components/
- pages/
- layouts/
- routes/
- hooks/
- store/
- utils/
- lib/
- services/
- constants/
- assets/
- types/
- data/
- supabase/
- middleware-like route protection logic
- .env support
- package.json
- tsconfig.json
- vite.config.ts

====================================================
IMPORTANT LANDING PAGE CHANGE
====================================================

REMOVE these top navbar options from the landing page:
- Farmer Hub
- Satellite View
- Banker Panel

These should NOT appear in the public landing page navbar because they make the website feel like an unfinished dashboard UI.

Instead, create a clean premium landing page navbar with these items:
- Home
- How It Works
- Features
- For Institutions
- Contact

On the right side:
- Login button
- Get Started button

Navbar should be:
- sticky
- glassmorphism / soft blur
- elegant white / off-white / premium green palette
- rounded modern buttons
- subtle shadow
- premium typography

====================================================
LANDING PAGE DESIGN REQUIREMENTS
====================================================

Create a visually strong, premium hero section with:

Headline:
“Smarter Credit for Every Farmer.”

Subheadline:
“AI-powered, satellite data-driven credit scoring that connects smallholder farmers with financial institutions securely and at scale.”

CTA Buttons:
- Get Started
- Watch Demo

Hero visual ideas:
- satellite scan card
- credit score analytics panel
- farmer verification card
- bank approval card
- crop health graph
- floating fintech-agri UI cards

Landing page sections should include:

1. HERO SECTION
- premium typography
- animated floating cards
- soft green + cream + gold accent palette
- subtle motion effects

2. TRUST / PROOF BAR
Examples:
- “Built for Agri Lending”
- “Satellite Verified”
- “AI Risk Scored”
- “Farmer First”

3. HOW IT WORKS SECTION
Show 4-step workflow:
- Farmer registers farm profile
- Satellite and crop data are analyzed
- AI generates credit score
- Banker reviews and approves loan

4. KEY FEATURES SECTION
Cards for:
- AI Credit Scoring
- NDVI Satellite Crop Analysis
- Climate Risk Insights
- Loan Eligibility Engine
- Repayment Tracking
- Voice Assistant Support
- Financial Inclusion Analytics

5. FOR BANKS / INSTITUTIONS SECTION
Explain why financial institutions should use CropCred:
- lower default risk
- faster loan decisioning
- verified farm data
- scalable farmer onboarding

6. TESTIMONIAL / IMPACT SECTION
Use demo testimonials and impact stats

7. FINAL CTA SECTION
Strong call-to-action to sign in or try demo access

8. FOOTER
Professional SaaS footer with:
- product links
- support links
- contact
- social icons

====================================================
AUTHENTICATION SYSTEM (VERY IMPORTANT)
====================================================

DO NOT directly enter the farmer dashboard when clicking Login.

Instead implement this proper flow:

LANDING PAGE
→ Login / Get Started
→ Role Selection Page
→ Role-based Login Page
→ Role-based Dashboard

====================================================
ROLE SELECTION PAGE
====================================================

Create a beautiful role selection page with 3 premium cards:

1. Farmer
2. Banker
3. Admin

Each card should include:
- icon
- title
- short description
- CTA button

Descriptions:
Farmer:
“Access your farm credit profile, loan eligibility, crop insights, and repayment history.”

Banker:
“Review verified farmer applications, assess risk, and approve smarter loans.”

Admin:
“Manage users, monitor system activity, and oversee platform operations.”

This page should feel modern and powerful with hover animations and clean card design.

====================================================
ROLE-BASED LOGIN SYSTEM
====================================================

After selecting a role, user should go to a dedicated login page.

Create:
- /auth/role-select
- /auth/login/farmer
- /auth/login/banker
- /auth/login/admin

Each login page should have:
- role-specific branding
- premium login card
- email field
- password field
- show/hide password
- remember me
- forgot password UI
- login button
- demo credentials helper box
- validation using React Hook Form + Zod
- loading state
- success/error toasts

====================================================
DEMO LOGIN FEATURE (MUST HAVE)
====================================================

Implement demo credential login system for easy testing and presentation.

Use these demo credentials:

FARMER DEMO:
Email: farmer@cropcred.ai
Password: Farmer@123

BANKER DEMO:
Email: banker@cropcred.ai
Password: Banker@123

ADMIN DEMO:
Email: admin@cropcred.ai
Password: Admin@123

Provide:
- “Use Demo Login” autofill button
- one-click credential autofill
- role-specific demo hint box

On successful login:
- Farmer → /dashboard/farmer
- Banker → /dashboard/banker
- Admin → /dashboard/admin

====================================================
ROLE-BASED ACCESS CONTROL
====================================================

Implement route protection and role-based authorization.

Rules:
- Farmer cannot access Banker/Admin routes
- Banker cannot access Farmer/Admin routes
- Admin can access admin-only areas
- Unauthorized users should be redirected cleanly
- Add protected route wrapper
- Store session and role properly

Use:
- Supabase Auth
- profiles table role field
- Zustand or Context for auth state

====================================================
SUPABASE DATABASE + SQL MIGRATIONS (VERY IMPORTANT)
====================================================

Generate a `supabase/` folder with SQL migration files and seed data.

I want FULL SQL scripts for:
- tables
- foreign keys
- indexes
- enums
- triggers
- RLS policies
- seed/demo data

Generate these files:
- supabase/migrations/001_init_schema.sql
- supabase/migrations/002_rls_policies.sql
- supabase/migrations/003_seed_demo_data.sql

Also generate:
- a README section explaining exactly how to run these SQL files in Supabase SQL Editor
- optional Supabase CLI instructions

====================================================
DATABASE TABLES TO CREATE
====================================================

Create the following tables properly with UUID primary keys, timestamps, constraints, and relationships.

1) profiles
Purpose: shared user profile table linked to auth.users

Columns:
- id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
- full_name TEXT NOT NULL
- email TEXT UNIQUE NOT NULL
- role TEXT NOT NULL CHECK (role IN ('farmer', 'banker', 'admin'))
- phone TEXT
- avatar_url TEXT
- created_at TIMESTAMPTZ DEFAULT now()
- updated_at TIMESTAMPTZ DEFAULT now()

2) farmer_profiles
Columns:
- id UUID PRIMARY KEY DEFAULT gen_random_uuid()
- user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE
- farmer_id TEXT UNIQUE NOT NULL
- location TEXT
- state TEXT
- farm_size NUMERIC
- crop_type TEXT
- soil_health INTEGER CHECK (soil_health BETWEEN 0 AND 100)
- climate_resilience INTEGER CHECK (climate_resilience BETWEEN 0 AND 100)
- cropcred_score INTEGER CHECK (cropcred_score BETWEEN 0 AND 1000)
- loan_eligibility NUMERIC
- crop_health_index INTEGER CHECK (crop_health_index BETWEEN 0 AND 100)
- ndvi_status TEXT
- created_at TIMESTAMPTZ DEFAULT now()
- updated_at TIMESTAMPTZ DEFAULT now()

3) banker_profiles
Columns:
- id UUID PRIMARY KEY DEFAULT gen_random_uuid()
- user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE
- institution_name TEXT NOT NULL
- branch TEXT
- designation TEXT
- created_at TIMESTAMPTZ DEFAULT now()
- updated_at TIMESTAMPTZ DEFAULT now()

4) admin_profiles
Columns:
- id UUID PRIMARY KEY DEFAULT gen_random_uuid()
- user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE
- admin_level TEXT DEFAULT 'standard'
- created_at TIMESTAMPTZ DEFAULT now()
- updated_at TIMESTAMPTZ DEFAULT now()

5) repayments
Columns:
- id UUID PRIMARY KEY DEFAULT gen_random_uuid()
- farmer_id UUID NOT NULL REFERENCES farmer_profiles(id) ON DELETE CASCADE
- amount NUMERIC NOT NULL
- due_date DATE NOT NULL
- status TEXT NOT NULL CHECK (status IN ('paid', 'pending', 'overdue'))
- paid_on DATE
- created_at TIMESTAMPTZ DEFAULT now()

6) loan_applications
Columns:
- id UUID PRIMARY KEY DEFAULT gen_random_uuid()
- farmer_id UUID NOT NULL REFERENCES farmer_profiles(id) ON DELETE CASCADE
- banker_id UUID REFERENCES banker_profiles(id) ON DELETE SET NULL
- amount_requested NUMERIC NOT NULL
- eligibility_score INTEGER CHECK (eligibility_score BETWEEN 0 AND 1000)
- status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'under_review'))
- submitted_at TIMESTAMPTZ DEFAULT now()

7) satellite_scans
Columns:
- id UUID PRIMARY KEY DEFAULT gen_random_uuid()
- farmer_id UUID NOT NULL REFERENCES farmer_profiles(id) ON DELETE CASCADE
- ndvi_score NUMERIC
- crop_health INTEGER CHECK (crop_health BETWEEN 0 AND 100)
- scan_date DATE NOT NULL
- verification_status TEXT NOT NULL CHECK (verification_status IN ('verified', 'pending', 'flagged'))
- created_at TIMESTAMPTZ DEFAULT now()

8) notifications
Columns:
- id UUID PRIMARY KEY DEFAULT gen_random_uuid()
- user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE
- title TEXT NOT NULL
- message TEXT NOT NULL
- type TEXT NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error'))
- is_read BOOLEAN DEFAULT false
- created_at TIMESTAMPTZ DEFAULT now()

====================================================
TRIGGERS / FUNCTIONS
====================================================

Generate SQL for:
- automatic updated_at timestamp trigger
- profile auto-creation trigger after auth signup
- optional role validation helper function

====================================================
RLS POLICIES (VERY IMPORTANT)
====================================================

Enable RLS on all app tables.

Create practical policies such that:

PROFILES:
- users can read/update only their own profile
- admins can read all profiles

FARMER_PROFILES:
- farmer can read/update only their own farmer profile
- banker can read farmer profiles
- admin can read all

BANKER_PROFILES:
- banker can read/update only their own banker profile
- admin can read all

ADMIN_PROFILES:
- only admin can read/update admin profile

REPAYMENTS:
- farmer sees only their own repayments
- banker can read repayments
- admin full access

LOAN_APPLICATIONS:
- farmer can create/read their own applications
- banker can read/update assigned applications
- admin full access

SATELLITE_SCANS:
- farmer sees own scans
- banker can read scans
- admin full access

NOTIFICATIONS:
- users can read only their own notifications
- admin can manage all

IMPORTANT:
Make the SQL realistic and valid for Supabase/Postgres.

====================================================
SEED / DEMO DATA (VERY IMPORTANT)
====================================================

Generate realistic seed data for demo/testing.

Create demo records for:
- 1 Farmer user
- 1 Banker user
- 1 Admin user

Use realistic demo names and linked data such as:
- Ramesh Kumar (Farmer)
- Anita Sharma (Banker)
- System Admin (Admin)

Create related demo data:
- farmer profile
- loan eligibility
- crop score
- repayments
- loan applications
- satellite scans
- notifications

IMPORTANT:
Use seed SQL that is easy to adapt after auth users are created.

====================================================
AUTH IMPLEMENTATION DETAILS
====================================================

Use Supabase Auth for login.

Implement:
- signInWithPassword
- signOut
- session persistence
- role fetching after login
- redirect users to the correct dashboard based on role
- route guard system
- auth loading states
- unauthorized access handling

After login:
- fetch user profile from `profiles`
- determine role
- redirect automatically

====================================================
DASHBOARDS
====================================================

Create all 3 dashboards with strong premium UI.

--------------------------
1. FARMER DASHBOARD
--------------------------
Show:
- CropCred Score
- Loan Eligibility
- Crop Health Index
- Soil Health
- Climate Resilience
- Recent Repayments
- Voice Assistant card
- Farm Overview
- Loan Status
- Notifications

Farmer dashboard should feel clean, trustworthy, optimistic, and easy to understand.

--------------------------
2. BANKER DASHBOARD
--------------------------
Show:
- total applications
- verified farmers
- risk scores
- pending approvals
- approved / rejected loans
- farmer profile cards
- application review panel
- satellite verification preview
- credit score breakdown
- charts and analytics

Banker dashboard should feel data-rich, institutional, and decision-oriented.

--------------------------
3. ADMIN DASHBOARD
--------------------------
Show:
- total users
- total farmers
- total bankers
- active applications
- repayment health
- system activity
- fraud alerts / anomalies
- user management
- analytics cards
- platform performance charts

Admin dashboard should feel like a control center.

====================================================
DESIGN SYSTEM
====================================================

Use a premium visual language:
- elegant whitespace
- rounded 2xl cards
- soft shadows
- subtle gradients
- muted cream backgrounds
- premium green as primary color
- gold accent for highlights
- dark slate typography
- smooth hover interactions
- polished motion transitions

Typography should feel:
- premium
- modern
- startup-level
- investor-ready

Use:
- large bold hero text
- readable dashboard typography
- elegant section spacing
- beautiful card hierarchy

====================================================
ANIMATIONS
====================================================

Use Framer Motion for:
- navbar reveal
- hero floating cards
- section fade-in
- dashboard card entry
- hover scale
- button interaction
- route transitions

Animations should feel smooth and premium, not flashy or childish.

====================================================
RESPONSIVENESS
====================================================

Must be fully responsive for:
- desktop
- tablet
- mobile

Ensure:
- mobile navbar menu
- responsive cards
- stacked sections
- adaptive dashboard layouts

====================================================
CODE QUALITY
====================================================

Generate clean, maintainable, scalable code.

Requirements:
- reusable components
- modular architecture
- clean file naming
- proper TypeScript typing
- no messy code
- no placeholder junk
- no broken routes
- no fake unfinished sections

====================================================
IMPORTANT FINAL REQUIREMENT
====================================================

This project should feel like:
- modern SaaS
- agri-fintech startup
- premium investor demo
- hackathon-ready deployable product

Do not make it look basic, old, or like a student mini-project.

Generate:
1. Complete project structure
2. All main pages
3. Routing
4. Role-based auth flow
5. Demo login system
6. Premium landing page redesign
7. Separate dashboards
8. Supabase integration-ready architecture
9. SQL migration files for tables + RLS + seed data
10. Clean modern UI
11. Production-style frontend code

Make the result polished, premium, realistic, and visually impressive.