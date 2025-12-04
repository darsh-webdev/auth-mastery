# 🔐 Auth Mastery

A modern, full-featured authentication and user management system built with Next.js, featuring passwordless authentication, 2FA, organization management, and more.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-FFE873?style=for-the-badge&logo=postgresql&logoColor=black)](https://orm.drizzle.team/)

## ✨ Features

- **Multiple Authentication Methods**

  - Email/Password
  - Passwordless (Magic Links)
  - Passkey (WebAuthn)
  - 2FA with TOTP (Time-based One-Time Password)

- **User Management**

  - Email verification
  - Password reset flow
  - Profile management
  - Session management

- **Organization Support**

  - Create and manage organizations
  - Role-based access control
  - Invite system with email notifications
  - Team management

- **Security**
  - Rate limiting
  - CSRF protection
  - Secure password hashing
  - Session management
  - Audit logging

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Environment variables (copy `env.example` to `.env` and fill in your values)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/darsh-webdev/auth-mastery.git
   cd auth-mastery
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. Run database migrations:

   ```bash
   npm run db:generate
   npm run db:push
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Authentication**: Better Auth
- **Form Handling**: React Hook Form
- **State Management**: React Context
- **Icons**: Lucide Icons
- **Email**: Postmark
- **Payments**: Stripe (for subscription features)

## 📂 Project Structure

```
src/
├── app/                    # App router pages
│   ├── auth/               # Authentication pages
│   ├── admin/              # Admin dashboard
│   ├── organizations/      # Organization management
│   └── profile/            # User profile
├── components/             # Reusable components
├── lib/                    # Utility functions
│   └── auth/               # Authentication logic
├── drizzle/                # Database schemas and migrations
└── types/                  # TypeScript type definitions
```

## 🔧 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Database
DATABASE_URL="postgres://user:password@localhost:5432/auth_mastery"

# NextAuth
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Email (Postmark)
POSTMARK_API_KEY="your-postmark-api-key"
EMAIL_FROM="noreply@yourdomain.com"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Stripe (for subscriptions)
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Drizzle ORM](https://orm.drizzle.team/) for type-safe database interactions
- [Better Auth](https://github.com/better-auth/better-auth) for authentication primitives
- All the amazing open-source libraries used in this project

# or

pnpm dev

# or

bun dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
