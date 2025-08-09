# How to Add Admin Users

This guide explains how to add new admin users to the AlegrIA Hackathon admin dashboard.

## Quick Steps

### 1. Add New Admin User

Create a new script or modify existing ones to add admin users:

```bash
# Create a script file (or use existing scripts/add-new-admin.ts)
npx tsx scripts/add-new-admin.ts
```

### 2. Access the Admin Dashboard

Once added, the new admin can access the dashboard at:
- **Local Development**: `http://localhost:3001/admin/login` (or port 3000)
- **Production**: `https://your-domain.com/admin/login`

## Detailed Process

### Method 1: Using the Add Admin Script

1. **Create/Edit the Add Admin Script**:
   ```typescript
   // scripts/add-new-admin.ts
   import { createSpecificAdminUser } from "../lib/create-admin"
   import { prisma } from "../lib/prisma"

   async function main() {
     try {
       console.log("Adding new admin user...")
       await createSpecificAdminUser("email@example.com", "password123", "Admin Name")
       console.log("✅ New admin user added successfully!")
     } catch (error) {
       console.error("❌ Failed to add admin user:", error)
     } finally {
       await prisma.$disconnect()
     }
   }

   main()
   ```

2. **Run the Script**:
   ```bash
   cd /path/to/project
   npx tsx scripts/add-new-admin.ts
   ```

### Method 2: Using the API Endpoint (for existing system)

If the database is already set up and you want to add additional admins:

1. **Call the setup endpoint** (this won't duplicate existing users):
   ```bash
   curl -X POST http://localhost:3001/api/setup-admin
   ```

2. **Or modify the createAdminUser function** in `lib/create-admin.ts` to create multiple users

### Method 3: Direct Database Access

For advanced users with database access:

1. **Hash the password**:
   ```javascript
   const bcrypt = require('bcryptjs');
   const hashedPassword = await bcrypt.hash('your-password', 12);
   ```

2. **Insert directly into the database**:
   ```sql
   INSERT INTO users (id, email, name, passwordHash, role, createdAt, updatedAt)
   VALUES ('new-unique-id', 'email@example.com', 'Admin Name', 'hashed-password', 'ADMINISTRATOR', datetime('now'), datetime('now'));
   ```

## Database Configuration Notes

### For Local Development
The system uses SQLite by default for local development:
- Database file: `prisma/dev.db`
- Connection: `DATABASE_URL="file:./prisma/dev.db"`

### For Production
The system uses PostgreSQL for production deployment:
- Connection: `DATABASE_URL="postgresql://user:password@host:port/database"`

## Current Admin Users

As of the last update, these admin users exist:

1. **Original Admin**:
   - Email: `davidcardecodri@gmail.com`
   - Password: `KodaCodriansky123!`

2. **New Admin** (added via this process):
   - Email: `Ugodimartino.27@gmail.com`
   - Password: `Ugodi01*`

## Admin Dashboard Features

Once logged in, admins can:
- View all hackathon applications
- Accept/reject applications
- Send automated email responses
- Star applications for priority review
- Export application data to CSV
- Manage application status and reviews

## Security Best Practices

1. **Use strong passwords** for admin accounts
2. **Change default passwords** in production
3. **Limit admin access** to trusted individuals only
4. **Regular password updates** for security
5. **Monitor admin activity** through the system logs

## Troubleshooting

### Database Connection Issues
If you get database connection errors:
1. Check your `DATABASE_URL` in `.env`
2. For local: Ensure the path is correct (`file:./prisma/dev.db`)
3. For production: Verify your PostgreSQL connection string

### Schema Issues
If you get schema-related errors:
```bash
# Reset and push schema
npx prisma db push --force-reset
npx prisma generate
```

### Permission Issues
If login fails:
1. Verify the user was created successfully
2. Check that the role is set to `ADMINISTRATOR`
3. Ensure password hashing is working correctly

## Files to Know

- `lib/create-admin.ts` - Core admin creation functions
- `scripts/init-admin.ts` - Initial setup script
- `scripts/add-new-admin.ts` - Add additional admin users
- `app/api/setup-admin/route.ts` - API endpoint for setup
- `app/admin/login/page.tsx` - Login interface
- `prisma/schema.prisma` - Database schema
- `.env` - Environment configuration

## Next Steps After Adding an Admin

1. Test the login with the new credentials
2. Verify admin dashboard access
3. Test key admin functions (view applications, etc.)
4. Update documentation with the new admin details (if needed)
5. Secure the credentials appropriately

---

**Note**: Keep this documentation updated when making changes to the admin system.