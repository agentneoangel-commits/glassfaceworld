# Deploy to GitHub Pages - Quick Start

## Step 1: Create GitHub Repository

Go to https://github.com/new and create a repository named `glassfaceworld`

## Step 2: Push Code

Run these commands in your terminal:

```bash
cd /Users/Trinity/.openclaw/workspace/glassfaceworld-remake
git remote add origin https://github.com/YOUR_USERNAME/glassfaceworld.git
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to https://github.com/YOUR_USERNAME/glassfaceworld/settings/pages
2. Under "Build and deployment", select **Source: GitHub Actions**
3. The site will auto-deploy!

## Step 4: View Your Site

After deployment (2-3 minutes), your site will be at:
**https://YOUR_USERNAME.github.io/glassfaceworld/**

## Step 5: Custom Domain (Optional)

To use glassfaceworld.com:

1. Create file `CNAME` in this folder with content:
   ```
   glassfaceworld.com
   ```

2. Update DNS settings at your domain registrar:
   ```
   A records pointing to:
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

3. Commit and push:
   ```bash
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

## Features Already Built

✅ Animated page loader  
✅ Hero text animations (staggered reveal)  
✅ Scroll-triggered reveals  
✅ Project card hover effects  
✅ Modal for project details  
✅ Responsive navigation  
✅ 50+ projects loaded  
✅ Mobile responsive  
✅ Auto-deployment via GitHub Actions  

## Next Steps

1. **Replace placeholder images** - Update `js/projects.js` with real project thumbnails
2. **Add project links** - Link to Vimeo/YouTube videos
3. **Customize colors** - Edit CSS variables in `css/style.css`
4. **Add more projects** - Simply add entries to `js/projects.js`

## Savings

**Before:** $9/month Cargo Collective = $108/year  
**After:** $0 GitHub Pages = **$108/year saved**
