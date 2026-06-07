---
description: Deploy BeaconOfTech to Cloudflare Pages
---

# Cloudflare Pages Deployment Workflow

## Overview
Deploy BeaconOfTech static site to Cloudflare Pages for better performance, free SSL, and global CDN.

## Prerequisites
- Cloudflare account (free tier)
- GitHub repository access
- Domain name (optional - can use Cloudflare's .pages.dev subdomain)

## Step-by-Step Deployment

### 1. Create Cloudflare Pages Project
1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** section
3. Click **"Create a project"**
4. Connect your GitHub account
5. Select the `7h-beaconoftech` repository

### 2. Configure Build Settings
- **Framework preset**: None
- **Build command**: Leave empty (static site)
- **Build output directory**: `/`
- **Root directory**: `/`
- **Environment variables**: None needed

### 3. Deploy First Version
1. Click **"Save and Deploy"**
2. Wait for build to complete
3. Your site will be available at `https://7h-beaconoftech.pages.dev`

### 4. Custom Domain (Optional)
1. In Cloudflare Pages project, go to **Custom domains**
2. Add your domain (e.g., `beaconoftech.com`)
3. Update DNS records at your domain registrar
4. Wait for SSL certificate provisioning

### 5. Automatic Deployments
Cloudflare Pages automatically deploys when you:
- Push to `main` branch
- Create pull requests (preview deployments)

## Migration from GitHub Pages

### Update DNS Records
If using custom domain:
1. Go to your domain registrar
2. Update DNS to point to Cloudflare:
   ```
   A: 192.0.2.1
   A: 192.0.2.2
   A: 192.0.2.3
   AAAA: 100::
   AAAA: 100::1
   ```

### Update Repository Settings
1. In GitHub repo, go to Settings → Pages
2. Disable GitHub Pages (optional)
3. Update any hardcoded URLs in code

## Benefits Achieved
- ✅ **Free SSL certificate**
- ✅ **Global CDN** (faster loading worldwide)
- ✅ **Zero maintenance**
- ✅ **Automatic deployments**
- ✅ **Preview deployments** for pull requests
- ✅ **Analytics** included

## Post-Deployment Checklist
- [ ] Verify site loads correctly at new URL
- [ ] Test all navigation links
- [ ] Check mobile responsiveness
- [ ] Verify Google Analytics tracking
- [ ] Test contact forms (if any)
- [ ] Update any hardcoded GitHub Pages URLs

## Troubleshooting

### Common Issues
- **404 errors**: Check build output directory setting
- **CSS not loading**: Verify asset paths are relative
- **Analytics not working**: Check GA tracking ID

### Performance Optimization
- Enable **Auto Minify** for HTML/CSS/JS
- Enable **Brotli** compression
- Configure **Cache Rules** for static assets

## Cost
- **Free tier**: Unlimited bandwidth, 500 builds/month
- **Pro tier** ($20/month): Additional builds, analytics, security features

## Maintenance
- No server maintenance required
- Automatic security updates
- Continuous deployment from GitHub
- Monitor usage in Cloudflare dashboard
