# 🧪 Vercel Blob File Upload Testing Checklist

## ✅ Basic Upload Test
- [ ] **Valid Image Upload** (JPG/PNG under 5MB)
- [ ] **Valid PDF Upload** (PDF under 5MB)  
- [ ] **Form Submission Success** (popup appears)
- [ ] **Admin Panel View** (document button appears)
- [ ] **File Access** (clicking button opens file)

## ✅ Error Handling Tests
- [ ] **File Too Large** (try uploading >5MB file)
- [ ] **Invalid File Type** (try uploading .txt or .doc file)
- [ ] **No File Upload** (submit without file - should work)
- [ ] **Network Error** (turn off internet briefly during upload)

## ✅ Admin Interface Tests
- [ ] **New Applications** show "🌐 Stored in Vercel Blob Storage"
- [ ] **Legacy Applications** show "📂 Legacy filename" warning
- [ ] **Document URLs** are proper Vercel Blob URLs
- [ ] **Email Notifications** contain clickable document links

## ✅ Different File Types
- [ ] **JPEG Image** (.jpg)
- [ ] **PNG Image** (.png) 
- [ ] **PDF Document** (.pdf)
- [ ] **GIF Image** (.gif)
- [ ] **WebP Image** (.webp)

## 🚨 Expected Error Messages
- **File too large**: "File too large. Maximum size is 5MB."
- **Invalid type**: "Invalid file type. Only images and PDFs are allowed."
- **Upload failed**: "Error uploading file to Vercel Blob Storage"

## 📊 Success Indicators

### ✅ File Upload Success:
```javascript
// Console should show:
"Uploading file: test-image.jpg Size: 2048576 Type: image/jpeg"
"File uploaded successfully: {url: 'https://...blob.vercel-storage.com/...'}"
```

### ✅ Admin Panel Display:
- Green "📄 View Document ↗" button
- Text shows "🌐 Stored in Vercel Blob Storage"
- Clicking opens file in new tab

### ✅ Email Notification:
- Contains "Ver Documento 📄" link
- Link goes directly to Vercel Blob Storage
- Shows "📁 El archivo fue subido a Vercel Blob Storage"

## 🔧 Troubleshooting

### ❌ "Missing BLOB_READ_WRITE_TOKEN" Error:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `BLOB_READ_WRITE_TOKEN` with your token
3. Redeploy the project

### ❌ Files Not Uploading:
1. Check browser console for error messages
2. Verify file size is under 5MB
3. Ensure file type is image or PDF
4. Check network connection

### ❌ Admin Panel Shows "Legacy filename":
- This is normal for applications submitted before Blob storage
- New applications should show proper Blob URLs

## 🎯 Quick Test Script

**Create test files:**
```bash
# Create a small test image (if you don't have one)
echo "Test file content" > test.txt  # Should fail (invalid type)
```

**Test in this order:**
1. Valid small image → Should succeed
2. Large file (>5MB) → Should fail with size error  
3. .txt file → Should fail with type error
4. No file → Should succeed (optional field)
5. Check admin panel → Should show new applications with Blob URLs