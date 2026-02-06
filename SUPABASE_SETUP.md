# Supabase Database Setup Guide

## Step 1: Create Supabase Account & Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign in"
3. Sign in with GitHub (recommended for developers)
4. Click "New Project"
5. Fill in the details:
   - **Name**: `afridrop` (or whatever you prefer)
   - **Database Password**: Generate a strong password (SAVE THIS!)
   - **Region**: Choose closest to Uganda (e.g., `eu-central-1` Frankfurt or `ap-southeast-1` Singapore)
   - **Pricing Plan**: Free (includes 500MB database, 1GB file storage, 50,000 monthly active users)

## Step 2: Get Your Database Connection String

Once your project is created:

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **Database** in the left menu
3. Scroll down to **Connection string**
4. Copy the **Connection pooling** → **Transaction Mode** connection string
   - It looks like: `postgresql://postgres.xxxxx:password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`
5. Replace `[YOUR-PASSWORD]` with your actual database password

### Important: Use Connection Pooling for Drizzle

**Use this string format:**

```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

## Step 3: Update Your .env.local File

Replace the DATABASE_URL in your `.env.local` file:

```env
DATABASE_URL="your-connection-string-here"
```

**Example:**

```env
DATABASE_URL="postgresql://postgres.abcdefghijk:MySecurePassword123@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

## Step 4: Generate Environment Secrets

Run these commands to generate secure secrets:

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate ENCRYPTION_KEY
openssl rand -base64 32
```

Add them to `.env.local`:

```env
NEXTAUTH_SECRET="generated-secret-here"
ENCRYPTION_KEY="generated-secret-here"
```

## Complete .env.local Example

```env
# Database
DATABASE_URL="postgresql://postgres.xxxxx:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret"

# Encryption
ENCRYPTION_KEY="your-generated-encryption-key"

# Redis (Upstash) - Optional for now
# UPSTASH_REDIS_URL="https://..."
# UPSTASH_REDIS_TOKEN="..."

# Payments (Flutterwave) - Optional for now
# FLUTTERWAVE_PUBLIC_KEY="FLWPUBK_TEST-..."
# FLUTTERWAVE_SECRET_KEY="FLWSECK_TEST-..."
# FLUTTERWAVE_ENCRYPTION_KEY="..."

# Email (Resend) - Optional for now
# RESEND_API_KEY="re_..."

# File Upload (Uploadthing) - Optional for now
# UPLOADTHING_SECRET="sk_live_..."
# UPLOADTHING_APP_ID="..."
```

## Step 5: Run Migrations

Once you have configured `.env.local`, run:

```bash
# Generate migration files from your schemas
pnpm db:generate

# Apply migrations to Supabase
pnpm db:migrate
```

## Step 6: Seed the Database

```bash
pnpm db:seed
```

You should see:

```
✅ Database seeded successfully!

📧 Default Admin Credentials:
   Email: admin@afridrop.com
   Password: admin123
```

## Step 7: Verify in Supabase Dashboard

1. Go back to Supabase dashboard
2. Click **Table Editor** in sidebar
3. You should see all your tables:
   - users
   - roles
   - permissions
   - blog_posts
   - products
   - orders
   - etc.

## Step 8: View with Drizzle Studio (Optional)

```bash
pnpm db:studio
```

Opens at `http://localhost:4983` - a nice GUI for viewing/editing data.

## Troubleshooting

### Error: "Connection refused"

- Check your DATABASE_URL is correct
- Ensure you're using the **connection pooling** URL, not direct connection
- Verify your password doesn't have special characters (or URL-encode them)

### Error: "SSL/TLS required"

Add `?sslmode=require` to your connection string:

```
DATABASE_URL="postgresql://...postgres?sslmode=require"
```

### Error: "Too many connections"

- You're using direct connection instead of pooling
- Switch to the pooler URL (port 6543)

### Can't see tables in Supabase

- Make sure migrations ran successfully
- Check for error messages in terminal
- Try `pnpm db:push` as an alternative to `db:migrate`

## Next Steps After Setup

1. ✅ Database connected
2. ✅ Migrations applied
3. ✅ Initial data seeded
4. 🚀 Ready to build tRPC API
5. 🚀 Ready to implement NextAuth
6. 🚀 Ready to start development

---

**Pro Tips:**

- **Backups**: Supabase automatically backs up your database
- **Logs**: View query logs in Supabase Dashboard → Logs → Database
- **Monitoring**: Check Database → Usage for performance metrics
- **API**: Supabase also provides a REST API, but we're using Drizzle ORM directly
