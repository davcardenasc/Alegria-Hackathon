# 🚀 Production Deployment Setup

## Database Configuration for Vercel

Since SQLite doesn't work well on Vercel's serverless environment, you need to set up a PostgreSQL database for production.

### Option 1: Vercel Postgres (Recommended)

1. Go to your Vercel dashboard
2. Select your project
3. Go to the "Storage" tab
4. Click "Create Database" → "Postgres"
5. Follow the setup wizard
6. Vercel will automatically add the `DATABASE_URL` environment variable

### Option 2: External PostgreSQL (Neon, Supabase, etc.)

1. Create a PostgreSQL database on your preferred provider:
   - **Neon** (free tier): https://neon.tech/
   - **Supabase** (free tier): https://supabase.com/
   - **PlanetScale** (MySQL alternative)

2. Get your connection string (format: `postgresql://user:password@host:port/database`)

3. Add it to Vercel environment variables:
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add: `DATABASE_URL` = your connection string

### Required Environment Variables in Vercel

Set these in your Vercel project settings:

```
DATABASE_URL=postgresql://your-connection-string
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=a-very-secure-random-string-for-production
```

## Post-Deployment Setup

After your first successful deployment:

1. **Initialize Database Schema**:
   - Your database will be empty initially
   - The schema will be automatically applied on first API call
   - Or run: `npx prisma db push` if you have access to the production environment

2. **Create Admin User**:
   - Visit: `https://your-domain.com/api/setup-admin` (if we create this endpoint)
   - Or manually insert admin user in database
   - Or run the init script with production database connection

## Quick Fix for Current Deployment

If you want to deploy immediately with minimal changes:

1. **Switch to PostgreSQL temporarily**:
   ```
   # Update prisma/schema.prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. **Set up a quick PostgreSQL database**:
   - Create a free Neon database
   - Copy the connection string
   - Add to Vercel environment variables

3. **Rebuild and deploy**

## Alternative: Disable Admin Routes for Now

If you want to deploy the main site first and add admin later:

1. Comment out or remove admin routes temporarily
2. Deploy the main landing page
3. Add admin functionality later

Let me know which approach you'd prefer and I'll help you implement it!