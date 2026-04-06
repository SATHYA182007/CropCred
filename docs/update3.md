Build a premium, modern, high-end, professional full-stack agriculture web platform called **CropCred AI**.

## CORE PROJECT IDENTITY
CropCred AI is **NOT a crop marketplace** or merchant-first agriculture website.
It must be designed as an **AI-Powered Smart Agriculture Administration Platform** that digitizes and automates agricultural office operations and farmer services.

The platform should solve administrative problems in agriculture such as:
- manual farmer record handling
- slow scheme application processing
- document verification delays
- poor grievance handling
- lack of transparency in approvals
- inefficient agricultural office workflows
- lack of analytics for agricultural administrators

The platform must feel like a real **GovTech / AgriTech administrative SaaS system**, built for:
- Farmers
- Agriculture Officers / Staff
- Admin / Department Heads

The design should look:
- premium
- futuristic
- clean
- dashboard-driven
- enterprise-grade
- modern government-tech inspired
- trustworthy
- high-tech but easy to use

Use a **deep modern AgriTech theme**:
- dark premium dashboard UI
- glassmorphism + soft shadows
- smooth transitions
- modern typography
- high-end card design
- structured admin layout 
- elegant data tables
- intelligent analytics panels
- responsive mobile + desktop design

Do NOT make it look like:
- e-commerce website
- crop selling marketplace
- shopping app
- generic farmer app

This is an **administration and workflow platform**, not a marketplace.

---

# REQUIRED TECH STACK

Use a strong, scalable, production-ready modern stack.

## Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide Icons
- shadcn/ui or equivalent modern UI architecture
- React Router
- React Hook Form
- Zod validation

## Backend / Database / Auth
- **Supabase (MANDATORY and preferred)**
- Supabase Auth
- Supabase Database (PostgreSQL)
- Supabase Storage
- Supabase Row Level Security (RLS)

## Additional
- Modular folder structure
- Reusable components
- Protected role-based routes
- API-ready architecture
- Clean service layer
- JSON config support
- Dashboard-based architecture

---

# IMPORTANT SUPABASE REQUIREMENTS

The project must be built with **Supabase as the main backend system**.

Use Supabase for:
- authentication
- role-based login
- database tables
- row-level access control
- file/document uploads
- farmer profile storage
- application records
- grievance records
- scheme records
- notifications
- dashboard analytics

### Must include:
- Supabase client setup
- Auth session handling
- Role-based protected routing
- Database service functions
- Clean schema-ready data handling
- File upload integration using Supabase Storage

---

# PRIMARY USER ROLES

The platform must have **role-based login and access control** for 3 major roles:

## 1. Farmer
Farmers should have access only to their own records, applications, grievances, notifications and profile.

## 2. Agriculture Officer / Staff
Officers should be able to review, verify, process and manage farmer submissions and complaints.

## 3. Admin / Department Head
Admins should have full control over users, applications, schemes, analytics, workflows and reports.

IMPORTANT:
Do NOT use merchant as a primary role anymore.
CropCred must now be centered around administration and farmer service workflows.

---

# CORE PLATFORM MODULES

Build the website around the following core modules:

---

## 1. LANDING PAGE / HOMEPAGE

Create a powerful, premium homepage for CropCred AI.

### Hero Section
Headline:
**CropCred AI**
Subheadline:
**AI-Powered Smart Agriculture Administration Platform for Faster Farmer Services, Intelligent Verification and Transparent Governance**

CTA Buttons:
- Get Started
- Login
- Explore Platform

Hero visuals should reflect:
- AI
- governance
- digital agriculture
- smart administration
- data dashboards
- farmer service modernization

### Homepage Sections
Include sections such as:
- Why CropCred AI
- Platform Features
- Farmer Services
- AI Verification Engine
- Smart Grievance Handling
- Workflow Automation
- Analytics & Reporting
- Role-Based Access
- How It Works
- Future of Digital Agriculture Governance

Include premium animations and scroll effects.

---

## 2. AUTHENTICATION SYSTEM

Build a clean, secure authentication system using **Supabase Auth** with:
- Sign Up
- Login
- Forgot Password
- Role Selection
- Session persistence
- Protected routes

Roles:
- Farmer
- Officer
- Admin

Store and manage user roles properly in Supabase.

---

## 3. FARMER DASHBOARD

Create a beautiful and modern Farmer Dashboard.

### Farmer Dashboard Features
Farmers should be able to:
- View personal dashboard summary
- Manage digital profile
- See land / crop / personal details
- Browse agriculture schemes
- Apply for schemes online
- Upload required documents
- Track application status
- View approval/rejection remarks
- Submit grievances / complaints
- View grievance status
- Receive notifications and updates
- Access support/help section

### Dashboard Cards
Include cards like:
- Total Applications
- Approved Applications
- Pending Applications
- Rejected Applications
- Active Complaints
- Notifications

### Additional UI
- application timeline
- status tracker
- recent activities
- alerts and reminders

---

## 4. AGRICULTURE SCHEME MANAGEMENT SYSTEM

Build a full digital scheme application module.

### Farmer Side
Farmers can:
- browse available schemes
- view eligibility
- read scheme details
- submit online applications
- upload supporting documents
- track progress

### Officer/Admin Side
Officers and admins can:
- create schemes
- edit schemes
- archive schemes
- review submitted applications
- verify details
- approve / reject / request correction

### Suggested Demo Schemes
Include sample schemes such as:
- Seed Subsidy Support
- Drip Irrigation Assistance
- Crop Insurance Assistance
- Soil Health Support Scheme
- Farm Mechanization Support
- Sustainable Farming Incentive

Use realistic data presentation.

---

## 5. DOCUMENT UPLOAD & AI VERIFICATION MODULE

This is a major PS 9 feature and must be highlighted strongly.

Farmers must be able to upload:
- ID proof
- land ownership proof
- bank details
- crop certificates
- eligibility documents

### AI Verification Layer
Simulate or build smart AI-assisted verification features such as:
- OCR-style text extraction
- auto field detection
- missing document detection
- incomplete form warning
- mismatch detection
- verification confidence score
- application completeness score

Even if mock/demo AI is used, the UI must make it feel like a real intelligent system.

### AI UI Elements
Show:
- “AI Verification in Progress”
- “Confidence Score”
- “Missing Fields Detected”
- “Suggested Corrections”

### Storage Requirement
Use **Supabase Storage** for all uploaded documents and file references.

---

## 6. GRIEVANCE / COMPLAINT MANAGEMENT SYSTEM

Build a complete grievance handling system.

### Farmer Side
Farmers can:
- raise complaints
- choose complaint category
- upload proof if needed
- track grievance status
- view response history

### Officer/Admin Side
Officers can:
- view all complaints
- assign priority
- change status
- respond to complaints
- mark resolved / pending / escalated

### AI Smart Features
Add smart AI-like logic for:
- complaint categorization
- urgency tagging
- suggested department routing
- sentiment/priority classification

Suggested grievance categories:
- subsidy issue
- document issue
- application delay
- insurance issue
- payment issue
- technical issue

---

## 7. OFFICER DASHBOARD

Build a dedicated Agriculture Officer dashboard.

### Officer Features
Officers should be able to:
- view pending applications
- review farmer submissions
- verify documents
- update application status
- process grievances
- add remarks
- monitor workload
- view daily action queue

### Dashboard Panels
Include:
- pending review count
- high-priority grievances
- incomplete applications
- AI flagged submissions
- recent farmer requests

The UI should feel like an operational control center.

---

## 8. ADMIN DASHBOARD / CONTROL CENTER

Build a powerful, premium admin dashboard.

### Admin Features
Admins should be able to:
- manage users
- manage officers
- manage farmers
- manage schemes
- manage applications
- manage grievances
- monitor AI verification results
- view reports and analytics
- oversee overall platform performance

### Admin Dashboard Cards
Include:
- Total Farmers Registered
- Total Officers
- Total Applications
- Approved / Pending / Rejected
- Total Grievances
- Resolution Rate
- Active Schemes
- Platform Usage Stats

### Admin UI should include
- charts
- tables
- analytics
- filters
- export-ready reports
- recent activity feed

---

## 9. AI INSIGHTS & SMART ANALYTICS MODULE

Create an “AI Insights” section for admins and officers.

### Insights to show
- most requested schemes
- most common rejection reasons
- top grievance categories
- approval rate trends
- district/region-wise application patterns
- farmer activity insights
- flagged suspicious or incomplete applications

### AI Smart Features
Include:
- AI recommendation panel
- smart summaries
- anomaly detection cards
- auto-generated decision insights
- administrative performance analytics

The system should look intelligent and data-driven.

---

## 10. FARMER DIGITAL PROFILE SYSTEM

Each farmer should have a complete digital profile page containing:
- personal details
- land details
- crop information
- district / village
- application history
- uploaded documents
- grievance history
- scheme eligibility indicators

Make this profile clean, modern and data-rich.

---

## 11. WORKFLOW AUTOMATION VISUALS

The platform should visually represent smart workflow automation.

Example workflow:
Farmer applies → AI checks documents → Officer reviews → Admin approves/rejects → Farmer gets notified

Show workflow steps in the UI using:
- progress bars
- status timelines
- approval pipelines
- stage indicators

---

## 12. NOTIFICATION SYSTEM

Build a notification center for all roles.

### Notifications may include:
- application submitted
- document missing
- grievance update
- approval/rejection
- new scheme announced
- admin remark added
- AI verification alert

Use badges, alerts and activity feed design.

---

# UI / UX REQUIREMENTS

The UI must feel:
- premium
- futuristic
- highly structured
- polished
- professional
- smooth
- responsive
- investor/demo ready

Use:
- modern dashboard layouts
- elegant cards
- high-quality icons
- meaningful charts
- smooth page transitions
- search and filter systems
- tabs and data tables
- status chips / badges
- professional typography
- subtle hover interactions

The project should look like a real startup-grade or government-tech SaaS platform.

---

# SUPABASE DATABASE REQUIREMENTS

Design a realistic and production-ready Supabase schema with proper relational structure.

Create and integrate these tables:

## 1. profiles
- id (uuid, linked to auth.users)
- full_name
- email
- role (farmer / officer / admin)
- phone
- district
- created_at

## 2. farmer_profiles
- id
- user_id
- land_size
- village
- crop_type
- farming_category
- created_at

## 3. schemes
- id
- title
- description
- eligibility
- deadline
- status
- created_at

## 4. applications
- id
- farmer_id
- scheme_id
- status
- remarks
- ai_score
- submitted_at
- updated_at

## 5. documents
- id
- application_id
- document_type
- file_url
- verification_status
- uploaded_at

## 6. grievances
- id
- farmer_id
- category
- title
- description
- priority
- status
- created_at

## 7. grievance_responses
- id
- grievance_id
- officer_id
- response_text
- created_at

## 8. notifications
- id
- user_id
- title
- message
- type
- is_read
- created_at

## 9. ai_verification_logs
- id
- application_id
- completeness_score
- confidence_score
- flagged_issues
- created_at

## 10. activity_logs
- id
- user_id
- action
- target_type
- target_id
- created_at

---

# SUPABASE SECURITY REQUIREMENTS

Implement realistic Supabase security architecture:
- Row Level Security (RLS)
- role-based data access
- farmer can only access own records
- officers can access assigned/reviewable records
- admins can access all records
- secure file access patterns
- protected insert/update/delete permissions

---

# IMPORTANT PROJECT POSITIONING

This project must always be described as:

**CropCred AI is an AI-powered smart agriculture administration platform that digitizes farmer services, scheme applications, document verification, grievance handling, workflow automation and decision-making for modern agricultural governance.**

Do NOT position the platform as:
- a crop selling app
- a marketplace
- an agri-commerce website
- a merchant platform

It must strongly align with:
**AI for Smart Agriculture Administration (Problem Statement 9)**

---

# FINAL OUTPUT EXPECTATION

Generate a complete, polished, scalable and high-end website/system with:
- beautiful UI
- full role-based dashboards
- realistic data
- admin workflows
- AI simulation features
- Supabase integration structure
- responsive layouts
- clean architecture
- future-ready production-level design

Make it look like a competition-winning, startup-grade, premium agriculture administration SaaS product.