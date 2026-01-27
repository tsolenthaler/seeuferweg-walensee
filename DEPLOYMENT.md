# GitHub Pages Deployment Guide

## Quick Start

This web app is ready to deploy on GitHub Pages with zero configuration!

### Step 1: Ensure You Have a GitHub Repository

If you haven't already:
```bash
git init
git add .
git commit -m "Initial commit: seeuferweg-walensee web app"
git remote add origin https://github.com/YOUR_USERNAME/seeuferweg-walensee.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Scroll to **Pages** section (left sidebar)
4. Under "Source", select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **Save**

GitHub will show you the URL: `https://YOUR_USERNAME.github.io/seeuferweg-walensee/`

### Step 3: Visit Your Live Website

Wait a few seconds, then visit the URL shown in the Pages settings. Your app is now live!

## How It Works

- **No build process needed** - the app is already built
- **All static files** - just HTML, CSS, and JavaScript
- **Data files included** - ostschweiz.json and glarnerland.json are served as static assets
- **Client-side only** - no server-side code required

## File Structure for GitHub Pages

```
seeuferweg-walensee/
├── index.html              ← Main page (GitHub Pages serves this)
├── app.js                  ← Application logic
├── styles.css              ← Styling
├── ostschweiz.json         ← Data
├── glarnerland.json        ← Data
├── package.json            ← Project metadata
└── README.md               ← Documentation
```

## Updating Your Site

Every time you push changes to the `main` branch, GitHub automatically rebuilds and redeploys your site:

```bash
# Make changes
git add .
git commit -m "Update message"
git push origin main
```

Changes appear on the live site within seconds.

## Custom Domain (Optional)

If you own a domain:

1. Add a `CNAME` file to your repository with your domain:
   ```
   seeuferweg-walensee.example.com
   ```

2. Configure your domain's DNS records:
   - Add an `A` record pointing to GitHub's IP
   - Or add a `CNAME` record pointing to `your-username.github.io`

3. Go to Settings → Pages → Custom domain and enter your domain

## Troubleshooting

### App not loading?
- Check that `index.html` is in the root of your repository
- Ensure all file paths in the HTML are relative (not absolute)
- Check browser console for errors (F12 → Console tab)

### Data not loading?
- Verify `ostschweiz.json` and `glarnerland.json` are in the root directory
- Check that file names match exactly (case-sensitive)
- Check browser console for CORS errors

### Map not showing?
- Leaflet.js is loaded from CDN - check your internet connection
- Verify the script tags in `index.html` are correct

## Performance Tips

1. **Images**: Consider hosting images externally or compressing them
2. **Caching**: GitHub Pages automatically caches static assets
3. **Size**: Keep JSON data files under 10MB for best performance

## Security Notes

- The app runs entirely in the browser (no server)
- No data is sent to external servers (except map tiles)
- Favorites are stored locally in browser localStorage
- Shared favorite links are safe - they just encode item IDs in the URL

## Need Help?

- GitHub Pages Documentation: https://pages.github.com/
- Leaflet.js Documentation: https://leafletjs.com/
- Check the main README.md for app usage documentation

---

Your web app is now ready to share with the world! 🚀
