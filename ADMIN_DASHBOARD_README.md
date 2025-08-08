# AlegrIA Hackathon Admin Dashboard

## Overview
A complete admin dashboard system for managing hackathon applications, built within your existing Next.js application.

## 🚀 Features Implemented

### ✅ Core Features
- **Database Storage** - All applications now stored in SQLite database
- **Admin Authentication** - Secure login system for reviewers and administrators
- **Applications Dashboard** - Complete list view with search, filters, and stats
- **Application Detail View** - Detailed view of each application with all submitted information
- **Accept/Reject System** - One-click approval/rejection with automated email responses
- **Star System** - Mark promising applications for deeper review
- **Email Templates** - Customizable templates for acceptance/rejection emails
- **Export Functionality** - CSV export of all applications with filters
- **Real-time Statistics** - Dashboard showing total, pending, accepted, rejected, and starred applications

### 🎯 User Roles
- **Reviewer** - Can view, star, accept, and reject applications
- **Administrator** - Full access including email template management

## 🔐 Access Information

### Login Credentials
- **URL**: `http://localhost:3000/admin/login`
- **Email**: `davidcardecodri@gmail.com`
- **Password**: `KodaCodriansky123!`

## 📊 How to Use

### 1. Access the Dashboard
1. Navigate to `http://localhost:3000/admin`
2. Log in with the provided credentials
3. You'll see the main dashboard with statistics and application list

### 2. Review Applications
1. **Search & Filter**: Use the search bar to find specific teams or schools
2. **Filter by Status**: View all, pending, starred, accepted, or rejected applications
3. **Star Applications**: Click the star icon to mark promising applications
4. **View Details**: Click on any application row to open the detailed view

### 3. Accept/Reject Applications
1. Open an application's detail view
2. Click "Accept Application" or "Reject Application"
3. Confirm the action in the dialog
4. The system will automatically:
   - Send an email using the appropriate template
   - Update the application status
   - Log the action with timestamp

### 4. Export Data
1. From the main dashboard, click "Export CSV"
2. This downloads a complete spreadsheet with all application data
3. Perfect for offline review or sharing with other stakeholders

## 🗄️ Database Schema

### Applications Table
- Team information (name, participants, school, contact)
- Application content (experience, motivation, ideas)
- Status tracking (pending/accepted/rejected)
- Review metadata (reviewer, timestamp)
- Star status for prioritization

### Email Templates
- Customizable acceptance and rejection email templates
- Support for placeholders like `{{teamName}}`, `{{contactEmail}}`
- HTML formatting support

### Audit Logging
- Complete email sending log
- Review history with timestamps
- User action tracking

## 🚀 Technical Implementation

### Stack
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js with credentials provider
- **Email**: Resend (existing integration)
- **UI Components**: Radix UI (your existing component library)

### File Structure
```
app/
├── admin/
│   ├── layout.tsx                 # Admin authentication wrapper
│   ├── login/page.tsx             # Login page
│   ├── page.tsx                   # Main dashboard
│   └── applications/[id]/page.tsx # Application detail view
├── api/
│   ├── auth/[...nextauth]/        # NextAuth configuration
│   ├── admin/
│   │   ├── applications/          # Application CRUD operations
│   │   └── export/                # CSV export
│   └── send-application/          # Updated to store in DB
lib/
├── prisma.ts                      # Database client
└── create-admin.ts                # Admin user creation utility
prisma/
├── schema.prisma                  # Database schema
└── dev.db                         # SQLite database file
scripts/
├── init-admin.ts                  # Setup script
└── seed-test-data.ts              # Test data creation
```

## 📧 Email Templates

### Acceptance Email
- Congratulatory message with next steps
- Workshop details and confirmation requirements
- Contact information for questions

### Rejection Email  
- Polite rejection with encouragement
- Invitation to future events
- Professional and supportive tone

### Template Customization
Templates can be modified by administrators through the database or by updating the initialization script.

## 🔧 Maintenance

### Adding New Admin Users
Run the admin creation script or add users directly through the database.

### Customizing Email Templates
Update templates in the `scripts/init-admin.ts` file and re-run the script, or modify directly in the database.

### Database Management
- View data: Use Prisma Studio (`npx prisma studio`)
- Backup: Copy the `prisma/dev.db` file
- Reset: Delete `dev.db` and run `npx prisma db push`

## 📈 Scalability Considerations

### Current Capacity
- Handles thousands of applications efficiently
- SQLite suitable for up to 100GB of data
- Real-time performance for admin operations

### Future Enhancements
- **PostgreSQL Migration**: For larger scale or multi-tenancy
- **File Upload Storage**: Currently shows filenames, could integrate with AWS S3
- **Advanced Filtering**: Date ranges, custom fields
- **Bulk Operations**: Mass accept/reject operations
- **Analytics Dashboard**: Advanced reporting and charts
- **Email Queue**: For high-volume email processing

## 🔒 Security Features

- **Authentication Required**: All admin routes protected
- **Session Management**: Secure JWT-based sessions  
- **Input Validation**: All API endpoints validated
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **Password Hashing**: bcrypt for secure password storage

## 🚀 Deployment Ready

The system is built to work within your existing Next.js application and will deploy alongside your landing page. No separate hosting required!

### Environment Variables for Production
```env
DATABASE_URL="file:./production.db"
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-very-secure-secret-key
```

## 📞 Support

The admin dashboard is fully integrated with your existing codebase and uses all your established patterns, components, and styling. It's ready for immediate use with your hackathon!

---

**Status**: ✅ Complete and Ready for Use  
**Test Data**: 5 sample applications created for testing
**Login**: davidcardecodri@gmail.com / KodaCodriansky123!