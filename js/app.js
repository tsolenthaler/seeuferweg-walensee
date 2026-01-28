/**
 * Main App Script for Seeuferweg Walensee
 * Handles homepage functionality
 */

// Initialize global instances
let dataProcessor;
let favoritesManager;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize managers
    dataProcessor = new DataProcessor();
    favoritesManager = new FavoritesManager();
    
    // Import favorites from URL if present
    favoritesManager.importFromURL();
    
    // Update favorites badge
    favoritesManager.updateBadge();
    
    // Load data
    await loadData();
});

/**
 * Load and display data
 */
async function loadData() {
    try {
        // Load all data
        await dataProcessor.loadAllData();
        
        // Update statistics
        updateStats();
        
        // Display featured highlights
        displayFeaturedHighlights();
        
    } catch (error) {
        console.error('Error loading data:', error);
        showError('Fehler beim Laden der Daten. Bitte versuchen Sie es später erneut.');
    }
}

/**
 * Update statistics on homepage
 */
function updateStats() {
    const stats = dataProcessor.getStats();
    
    document.getElementById('totalPOIs').textContent = stats.totalPOIs;
    document.getElementById('totalActivities').textContent = stats.totalActivities;
    document.getElementById('totalHighlights').textContent = stats.totalHighlights;
    document.getElementById('totalFotopoints').textContent = stats.totalFotopoints;
}

/**
 * Display featured highlights
 */
function displayFeaturedHighlights() {
    const container = document.getElementById('featuredHighlights');
    const highlights = dataProcessor.getHighlights(6);
    
    if (highlights.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="empty-state">
                    <h3>Keine Highlights verfügbar</h3>
                    <p>Derzeit sind keine Highlights verfügbar.</p>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = highlights.map(poi => createPOICard(poi)).join('');
    
    // Add event listeners for favorite buttons
    attachFavoriteListeners();
}

/**
 * Create POI card HTML
 */
function createPOICard(poi) {
    const image = poi.images[0] || 'https://via.placeholder.com/400x300/ff9c21/ffffff?text=Kein+Bild';
    const isFavorite = favoritesManager.isFavorite(poi.id);
    
    return `
        <div class="col-md-4">
            <div class="card poi-card">
                <div class="position-relative">
                    <img src="${image}" class="card-img-top poi-card-image" alt="${poi.name}">
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                            data-poi-id="${poi.id}" 
                            title="${isFavorite ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'}">
                        <svg width="20" height="20" fill="${isFavorite ? '#ff9c21' : 'none'}" 
                             stroke="${isFavorite ? '#ff9c21' : 'currentColor'}" 
                             stroke-width="2" viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${poi.name}</h5>
                    <p class="card-text">${truncateText(poi.description, 100)}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="category-badge">${getTypeLabel(poi.type)}</span>
                        <small class="text-muted">${poi.location.address}</small>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Attach event listeners to favorite buttons
 */
function attachFavoriteListeners() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const poiId = this.dataset.poiId;
            const isNowFavorite = favoritesManager.toggle(poiId);
            
            // Update button appearance
            this.classList.toggle('active', isNowFavorite);
            this.title = isNowFavorite ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen';
            
            // Update icon
            const svg = this.querySelector('svg');
            svg.setAttribute('fill', isNowFavorite ? '#ff9c21' : 'none');
            svg.setAttribute('stroke', isNowFavorite ? '#ff9c21' : 'currentColor');
            
            // Add pulse animation
            this.classList.add('pulse-animation');
            setTimeout(() => this.classList.remove('pulse-animation'), 300);
        });
    });
}

/**
 * Truncate text to specified length
 */
function truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}

/**
 * Get type label in German
 */
function getTypeLabel(type) {
    const labels = {
        'accommodation': 'Unterkunft',
        'restaurant': 'Restaurant',
        'attraction': 'Attraktion',
        'place': 'Ort',
        'webcam': 'Webcam',
        'infrastructure': 'Infrastruktur',
        'camping': 'Camping',
        'other': 'Sonstiges'
    };
    return labels[type] || type;
}

/**
 * Show error message
 */
function showError(message) {
    const container = document.getElementById('featuredHighlights');
    if (container) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger" role="alert">
                    ${message}
                </div>
            </div>
        `;
    }
}

// Export functions for use in other pages
window.appUtils = {
    createPOICard,
    attachFavoriteListeners,
    truncateText,
    getTypeLabel,
    showError
};
