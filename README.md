# AURA - AI Prompt Gallery

A beautiful, Apple-designed full-stack web application for discovering, browsing, and copying AI-generated prompts.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (to be added)
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Email OTP + Google OAuth)
- **Payment**: Razorpay
- **Email**: Resend
- **Storage**: Supabase Storage

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/              # Utilities and configurations
├── styles/           # Global styles
├── types/            # TypeScript types
└── hooks/            # Custom React hooks
```

## Environment Variables

Create a `.env.local` file with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=
ADMIN_USER_IDS=
```

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

## Database Schema

The Supabase database includes:
- `prompts` - AI prompt listings
- `profiles` - User profiles
- `subscriptions` - Subscription data
- `saved_prompts` - User's saved prompts

## Features

- [x] Project setup
- [ ] Authentication (login/signup)
- [ ] Gallery with search and filters
- [ ] Copy prompt functionality
- [ ] Razorpay subscription
- [ ] User dashboard
- [ ] Admin panel
- [ ] Landing page
- [ ] Responsive design
- [ ] Deployment

## Development

Created with ❤️ by AURA Team
