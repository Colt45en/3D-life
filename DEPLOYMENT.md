# Deployment Guide

This guide will help you deploy your Next.js 15 application to production.

## Prerequisites

Before deploying, ensure you have:

- A PostgreSQL database (we recommend [Neon](https://neon.tech) or [Supabase](https://supabase.com) for serverless PostgreSQL)
- GitHub OAuth App credentials (for authentication)
- A Vercel account (recommended for Next.js deployment)

## Environment Variables

You'll need to set the following environment variables in your deployment platform:

```bash
# Database
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# NextAuth
AUTH_SECRET="generate-with-openssl-rand-base64-32"
AUTH_GITHUB_ID="your-github-oauth-app-id"
AUTH_GITHUB_SECRET="your-github-oauth-app-secret"

# App
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

## Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Import Project to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will automatically detect Next.js settings

### 3. Configure Environment Variables

In the Vercel project settings:

1. Go to Settings → Environment Variables
2. Add all required environment variables
3. Make sure to add them for Production, Preview, and Development environments

### 4. Deploy

Click "Deploy" and Vercel will:

- Install dependencies
- Run the build command
- Deploy your application

## Database Setup

### Option 1: Neon (Recommended)

1. Create a free account at [Neon](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add it to your `DATABASE_URL` environment variable
5. Run migrations:

```bash
npm run db:push
```

### Option 2: Supabase

1. Create a free account at [Supabase](https://supabase.com)
2. Create a new project
3. Get the connection string from Project Settings → Database
4. Add it to your `DATABASE_URL` environment variable
5. Run migrations:

```bash
npm run db:push
```

## GitHub OAuth Setup

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - Application name: Your app name
   - Homepage URL: `https://your-domain.com`
   - Authorization callback URL: `https://your-domain.com/api/auth/callback/github`
4. Click "Register application"
5. Copy the Client ID and generate a Client Secret
6. Add these to your environment variables:
   - `AUTH_GITHUB_ID`: Your Client ID
   - `AUTH_GITHUB_SECRET`: Your Client Secret

## Generate AUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Add the output to your `AUTH_SECRET` environment variable.

## Post-Deployment

After deployment:

1. Visit your application URL
2. Test authentication by signing in
3. Verify all features work correctly
4. Monitor the Vercel dashboard for any errors

## CI/CD

Vercel automatically sets up CI/CD:

- Every push to `main` triggers a production deployment
- Every pull request gets a preview deployment
- Environment variables are automatically injected

## Performance Monitoring

Vercel provides built-in analytics:

1. Go to your project on Vercel
2. Click "Analytics" to see:
   - Page load times
   - Core Web Vitals
   - User traffic

## Troubleshooting

### Build Fails

- Check the build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify Node.js version matches (18+)

### Database Connection Issues

- Verify `DATABASE_URL` is correct
- Ensure database allows connections from Vercel IPs
- Check if SSL is required (add `?sslmode=require` to connection string)

### Authentication Not Working

- Verify `AUTH_SECRET` is set and is 32+ characters
- Check GitHub OAuth callback URL matches your deployment URL
- Ensure `NEXT_PUBLIC_APP_URL` is set correctly

## Custom Domain

To add a custom domain:

1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as instructed by Vercel
4. Update `NEXT_PUBLIC_APP_URL` to match your custom domain
5. Update GitHub OAuth callback URL

## Environment-Specific Configurations

You can have different configurations for each environment:

- **Production**: Main branch, production database
- **Preview**: Pull requests, preview database (optional)
- **Development**: Local, local database

Configure these in Vercel under Environment Variables, selecting the appropriate environments.
