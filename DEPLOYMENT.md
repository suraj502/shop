# 🚀 Vercel Deployment Guide

This guide explains how to deploy your MERN e-commerce store to Vercel.

## ✅ Prerequisites

1. **GitHub Repository** - Your code is already pushed to: https://github.com/suraj502/shop
2. **Vercel Account** - Create one at https://vercel.com (free with GitHub)
3. **vercel.json** - Already created in the root directory

## 📋 Deployment Steps

### Step 1: Connect to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" → Select "Continue with GitHub"
3. Authorize Vercel to access your GitHub repositories
4. Click "Import Project"
5. Select your repository: `suraj502/shop`

### Step 2: Configure Project Settings

1. **Framework Preset**: Select "Next.js" (or "Other")
2. **Root Directory**: Leave as `./` (default)
3. **Build Command**: Keep auto-detected or use: `cd frontend && npm run build`
4. **Install Command**: `npm install --prefix backend && npm install --prefix frontend`

### Step 3: Set Environment Variables

In Vercel Dashboard, go to **Settings → Environment Variables** and add:

```
REACT_APP_API_URL = /_/backend
NODE_ENV = production
```

### Step 4: Deploy

1. Click **Deploy** button
2. Wait for build to complete (~5-10 minutes)
3. Your app will be live at a URL like: `https://shop-xxxxx.vercel.app`

## 📂 Project Structure for Vercel

```
Root (/)
├── vercel.json          ← Deployment config
├── backend/             ← Node.js API
│   ├── server.js
│   └── package.json
├── frontend/            ← React App
│   ├── src/
│   └── package.json
└── README.md
```

## 🔧 API Configuration

### Local Development
- Frontend: `http://localhost:3001`
- Backend: `http://localhost:5000`
- API Base: `http://localhost:5000/api`

### Production (Vercel)
- Frontend: `https://shop-xxxxx.vercel.app`
- Backend: `https://shop-xxxxx.vercel.app/_/backend`
- API Base: `https://shop-xxxxx.vercel.app/_/backend/api`

The frontend automatically detects:
- `REACT_APP_API_URL` env variable in production
- Defaults to local URL in development

## 🧪 Testing After Deployment

1. Visit your Vercel URL
2. Click "Products" to test API call
3. Open browser DevTools (F12) → Console
4. You should see API logs with response data

## 🔗 API Endpoints on Vercel

All endpoints prefixed with `/_/backend`:

- `GET /_/backend/api/products` - All products
- `GET /_/backend/api/products/:id` - Single product
- `GET /_/backend/api/products/category/:category` - By category
- `GET /_/backend/api/health` - Health check

## ❌ Common Issues

### Frontend can't reach backend
- Check `REACT_APP_API_URL` environment variable
- Verify the rewrite rules in `vercel.json`

### Build fails
- Check Node version compatibility
- Ensure all dependencies are in `package.json`
- Run locally first: `npm install` in both folders

### Images not showing
- Backend must serve static files
- `public/images/` folder must be included
- Check build logs for static file errors

## 📝 Useful Vercel Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from command line
vercel

# Check deployment logs
vercel logs
```

## ✨ Next Steps

After deployment:
1. Add more products to backend
2. Connect to MongoDB for persistent data
3. Add user authentication
4. Implement payment processing
5. Add admin dashboard

## 🆘 Need Help?

- Vercel Docs: https://vercel.com/docs
- GitHub Issues: https://github.com/suraj502/shop/issues
- Stack Overflow: Tag with `vercel` and `mern`

---

**Your app is ready to deploy! 🎉**
