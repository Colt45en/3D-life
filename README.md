# 3D Life - Production Next.js Stack

A production-ready Next.js 15 application with modern tech stack including React 19, TypeScript, and comprehensive tooling.

## 🚀 Tech Stack

### Core Framework
- **Next.js 15** - App Router with React Server Components
- **React 19** - Latest React with improved performance
- **TypeScript** - Strict mode enabled for type safety

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible UI components
- **Framer Motion** - Production-ready animations

### State Management
- **TanStack Query v5** - Server state management with caching
- **Zustand** - Lightweight client state management

### Database & ORM
- **Drizzle ORM** - Type-safe SQL ORM
- **PostgreSQL** - Production database

### Authentication
- **NextAuth/Auth.js v5** - Complete authentication solution

### Code Quality
- **ESLint** - Code linting with Next.js config
- **Prettier** - Code formatting with Tailwind plugin
- **Husky** - Git hooks for pre-commit checks
- **lint-staged** - Run linters on staged files

### Testing
- **Vitest** - Fast unit testing framework
- **Testing Library** - React component testing

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Colt45en/3D-life.git
cd 3D-life
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
- `DATABASE_URL` - PostgreSQL connection string
- `AUTH_SECRET` - Generate with `openssl rand -base64 32`
- `AUTH_GITHUB_ID` - GitHub OAuth App ID
- `AUTH_GITHUB_SECRET` - GitHub OAuth App Secret

4. Set up the database:
```bash
npm run db:push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🛠️ Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run tests with Vitest
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate test coverage
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── actions.ts         # Server Actions
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # Client providers
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── animated-hero.tsx # Example Framer Motion component
├── db/                    # Database
│   ├── index.ts          # Database client
│   └── schema.ts         # Drizzle schema
├── lib/                   # Utilities
│   ├── auth.ts           # NextAuth configuration
│   ├── store.ts          # Zustand store
│   └── utils.ts          # Helper functions
├── __tests__/            # Test files
└── config files          # Configuration files
```

## 🎯 Key Features

### Server Actions
Use Server Actions for mutations with automatic revalidation:
```typescript
"use server"
export async function createPost(formData: FormData) {
  // Server-side validation and database operations
}
```

### Server Components
Server Components for data fetching with direct database access:
```typescript
export default async function Page() {
  const data = await db.query.posts.findMany();
  return <div>{/* render data */}</div>
}
```

### TanStack Query
Client-side data fetching with caching:
```typescript
const { data, isLoading } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
});
```

### Zustand State Management
Simple client state management:
```typescript
const count = useAppStore((state) => state.count);
const increment = useAppStore((state) => state.increment);
```

## 🔐 Authentication

NextAuth is configured with GitHub provider. To add more providers:

1. Install the provider package
2. Add provider credentials to `.env`
3. Update `lib/auth.ts` configuration

## 🗄️ Database

The project uses Drizzle ORM with PostgreSQL:

1. Define schema in `db/schema.ts`
2. Generate migrations: `npm run db:generate`
3. Apply migrations: `npm run db:migrate`
4. Or push directly: `npm run db:push`

## 🧪 Testing

Tests are written using Vitest and Testing Library:

```bash
npm run test        # Run tests
npm run test:ui     # Run tests with UI
npm run test:coverage # Generate coverage report
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

The project is optimized for Vercel deployment with automatic configuration.

### Environment Variables

Ensure all required environment variables are set in your deployment platform:
- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_GITHUB_ID`
- `AUTH_GITHUB_SECRET`
- `NEXT_PUBLIC_APP_URL`

## 📝 Code Quality

Pre-commit hooks are configured with Husky to:
- Run ESLint on staged files
- Format code with Prettier
- Ensure code quality before commits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the terms specified in the LICENSE file.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [NextAuth.js](https://authjs.dev)
- [TanStack Query](https://tanstack.com/query)
- [Zustand](https://github.com/pmndrs/zustand)
