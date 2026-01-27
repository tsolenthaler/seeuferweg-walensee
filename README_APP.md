# seeuferweg-walensee

## Overview

A modern web application for exploring places of interest (POIs), hiking routes, events, and offers around Lake Walen (Walensee) in Switzerland. The app provides an interactive map view, list view, and grid/tile view with comprehensive filtering, sorting, and favorite management features.

## Features

✨ **Multi-View Options**
- 🗺️ Interactive map with markers
- 🔲 Grid/tile view with images
- 📋 List view with detailed information

🔍 **Smart Filtering**
- Search by name or description
- Filter by type and category
- Price range filter
- Real-time filtering with visual feedback

📊 **Sorting Options**
- Sort by name
- Sort by location
- Sort by date
- Sort by price

❤️ **Favorites Management**
- Save items as favorites
- View only favorite items
- Share favorites via URL

🌐 **Multilingual Support**
- German (Deutsch)
- English

🗺️ **Interactive Map**
- Leaflet.js powered map
- Click on markers for details
- Responsive map sizing

## Project Structure

```
seeuferweg-walensee/
├── index.html          # Main HTML file
├── app.js              # Application logic
├── styles.css          # Styling
├── ostschweiz.json     # Data for Eastern Switzerland
├── glarnerland.json    # Data for Glarnerland
├── package.json        # Project metadata
├── README.md           # This file
└── .github/
    └── workflows/      # GitHub Actions (optional)
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript (Vanilla)**: No framework dependencies
- **Leaflet.js**: Interactive mapping library
- **LocalStorage API**: Client-side data persistence

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server-side dependencies required

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/tsolenthaler/seeuferweg-walensee.git
cd seeuferweg-walensee
```

2. Start a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js http-server
npx http-server
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

## Usage

### Exploring Items

1. **Map View**: Click on any marker to see item details
2. **Tile View**: Click "View Details" button on any tile
3. **List View**: Click on the item name or "View Details" button

### Filtering

1. Use the **Search** box to find items by name or description
2. Select a **Type** from the dropdown
3. Choose a **Category** 
4. Adjust the **Price Range** slider
5. Click **Reset Filters** to clear all filters

### Sorting

Use the **Sort By** dropdown to organize items:
- Name (alphabetical)
- Location (alphabetical)
- Date (newest first)
- Price (lowest to highest)

### Managing Favorites

1. Click the ❤️ heart icon to add/remove items from favorites
2. Click **View Favorites** to see only favorite items
3. Click **Share** to get a shareable link with your favorites
4. Share the link with others to show them your favorite places

### Changing Language

Click the **English/Deutsch** button in the top-right corner to switch languages.

### Toggling Views

Click the view toggle button (🗺️/🔲/📋) to switch between Map, Tile, and List views.

## Data Format

The JSON files (ostschweiz.json and glarnerland.json) use the schema.org format:

```json
{
  "@context": "http://schema.org/",
  "@type": "Place",
  "identifier": "unique-id",
  "name": {
    "de": "German Name",
    "en": "English Name"
  },
  "description": {
    "de": "German description",
    "en": "English description"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "47.123",
    "longitude": "9.456"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "City",
    "postalCode": "8000",
    "telephone": "+41 12 345 67 89"
  },
  "image": [
    {
      "@type": "ImageObject",
      "contentUrl": "https://example.com/image.jpg"
    }
  ]
}
```

## Deployment

### GitHub Pages

1. Ensure your repository is on GitHub
2. Go to **Settings** → **Pages**
3. Select **Source**: `main` branch, `/ (root)` folder
4. Click **Save**
5. Your app will be available at: `https://username.github.io/seeuferweg-walensee`

The app is a single-page application with no build step required. Simply push your changes to GitHub, and they'll be automatically deployed.

### Custom Domain

If you have a custom domain:
1. Add a `CNAME` file with your domain
2. Configure DNS settings pointing to GitHub Pages
3. Update the domain in repository settings

## Browser Support

- Chrome/Edge: Latest versions
- Firefox: Latest versions
- Safari: Latest versions (iOS 12+)
- Mobile browsers: Full responsive support

## Performance

- **No external dependencies** (except Leaflet.js)
- **Client-side processing** (no server required)
- **Local storage** for favorites (no cloud sync)
- **Responsive design** for all screen sizes

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast color scheme
- Mobile-friendly touch targets

## Future Enhancements

- [ ] Backend API integration for real-time data
- [ ] User authentication and cloud sync
- [ ] Advanced search (full-text search)
- [ ] Photo gallery for items
- [ ] User reviews and ratings
- [ ] Event calendar
- [ ] Offline mode (PWA)
- [ ] Multiple languages
- [ ] Dark mode theme

## License

MIT License - feel free to use this project for any purpose.

## Support

For issues and feature requests, please visit:
https://github.com/tsolenthaler/seeuferweg-walensee/issues

## Credits

- Map tiles: OpenStreetMap contributors
- Mapping library: Leaflet.js
- Data source: OST and Glarnerland tourism data

---

**Last Updated**: January 2026
