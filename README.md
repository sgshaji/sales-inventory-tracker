
# Sales Inventory Tracker

A Next.js application for tracking sales and inventory with AI-powered insights.

## Features

- **Authentication**
  - Email/Password login with validation
  - Google OAuth integration
  - Password reset functionality
  - Magic link authentication
  - Sign up with email verification

- **UI Components**
  - Shadcn/ui components
  - Custom chart components
  - Responsive navigation
  - Toast notifications
  - Form validation with Zod

- **Tech Stack**
  - Next.js 15 with App Router
  - TypeScript
  - Tailwind CSS
  - Supabase Auth & Database
  - React Hook Form
  - Zod Validation
  - Zustand State Management

## Getting Started

1. Clone and install dependencies:
```bash
npm install
```

2. Set up environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_AUTH_REDIRECT_URL=your_auth_redirect_url
```

3. Start development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests
- `npm run type-check` - Check TypeScript types
- `npm run storybook` - Start Storybook dev server

## Project Structure

```
src/
├── app/          # Next.js app router pages
├── components/   # Shared UI components
├── features/     # Feature modules (auth, sales, etc)
├── lib/          # Utilities and shared logic
├── styles/       # Global styles
└── db/          # Database configuration
```

## Testing

- Unit tests with Jest and React Testing Library
- E2E tests with Playwright
- Component stories with Storybook

## Contributing

1. Create a feature branch
2. Make changes and test
3. Run `npm run ci` to verify all checks pass
4. Submit a pull request

## License

MIT
