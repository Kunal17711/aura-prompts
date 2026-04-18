# AURA Project Development Guide

AURA is a full-stack Next.js 14 AI Prompt Gallery web application with Supabase backend and Razorpay payments.

## Project Configuration

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with @tailwindcss/postcss
- **UI**: shadcn/ui (to be added)
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth + Google OAuth
- **Payments**: Razorpay
- **Email**: Resend
- **Storage**: Supabase Storage

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Tailwind + Inter font
│   ├── page.tsx            # Home page
│   ├── gallery/            # Gallery routes
│   ├── p/                  # Individual prompt pages
│   ├── pricing/            # Pricing page
│   ├── auth/               # Login/signup routes
│   ├── dashboard/          # User dashboard (protected)
│   ├── saved/              # Saved prompts (protected)
│   ├── account/            # Account settings (protected)
│   ├── billing/            # Billing info (protected)
│   ├── admin/              # Admin panel (protected)
│   └── api/                # API routes
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── common/             # Shared components
│   └── ...
├── lib/
│   ├── supabase.ts         # Supabase client & service role
│   ├── auth.ts             # Auth utilities
│   ├── api.ts              # API client helpers
│   └── ...
├── styles/
│   └── globals.css         # Global styles with Tailwind directives
└── types/
    └── index.ts            # TypeScript interfaces
```

## Environment Variables

All required variables are configured in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` ✓ Configured
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✓ Configured
- `SUPABASE_SERVICE_ROLE_KEY` ✓ Configured
- `RESEND_API_KEY` ✓ Configured
- `RAZORPAY_KEY_ID` (to be added when live)
- `RAZORPAY_KEY_SECRET` (to be added when live)
- `RAZORPAY_WEBHOOK_SECRET` (to be added when live)
- `NEXT_PUBLIC_APP_URL` ✓ localhost:3000
- `ADMIN_USER_IDS` (to be configured)

## Design System

**Colors**:
- White: `#FFFFFF`
- Black: `#1d1d1f`
- Gray: `#6e6e73`
- Light Gray: `#f5f5f7`

**Typography**:
- Font: Inter (system fallback)
- Large, confident headlines
- Consistent spacing and hierarchy

**Components**:
- Buttons: rounded-pill, black primary, gray secondary
- Cards: 80% image, minimal text below
- Navigation: frosted glass blur backdrop
- Animations: Framer Motion subtle reveals, no flashy effects

**Responsive Breakpoints**:
- Mobile: 375px (iPhone)
- Tablet: 768px (iPad)
- Desktop: 1280px+ (MacBook/Desktop)

## Development Workflow

### Start Development Server
```bash
npm run dev
```
Open http://localhost:3000

### Build for Production
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## Database Schema

Supabase tables (already created):
- **prompts**: id, name, slug, category, description, example_image_url, prompt_text, tags, is_free, is_active, sort_order, created_at
- **profiles**: id (FK), name, plan, subscription_end, created_at
- **subscriptions**: id, user_id, status, gateway_subscription_id, current_period_end, created_at
- **saved_prompts**: id, user_id, prompt_id, created_at

Storage Bucket: `prompt-examples`

## Build Steps Completed

✓ Step 1: Project Setup
  - Next.js 14 with TypeScript
  - Tailwind CSS 4 with @tailwindcss/postcss
  - ESLint configured
  - Supabase client configured
  - Environment variables set
  - Global styles with Tailwind
  - Root layout with Inter font
  - Basic home page
  - Project builds successfully

## Next Steps

2. Authentication (login/signup pages, Supabase Auth)
3. Gallery pages (search, filters, real data)
4. Copy prompt API with auth checks
5. Razorpay subscription flow
6. User dashboard and settings
7. Admin panel for prompt management
8. Landing page with full sections
9. Animations and polish
10. Vercel deployment

## Build Verification

Project builds successfully with:
- ✓ TypeScript compilation
- ✓ Tailwind CSS processing
- ✓ No errors or warnings
- ✓ Static pages prerendered
