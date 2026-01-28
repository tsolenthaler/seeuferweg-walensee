/**
 * Standorte Page Script
 * Handles locations page with grid, list, and map views
 */

let dataProcessor;
let favoritesManager;
let map;
let markers = [];
let currentView = 'grid';
let filteredPOIs = [];

document.addEventListener('DOMContentLoaded', async function() {
    dataProcessor = new DataProcessor();
    favoritesManager = new FavoritesManager();
    
    favoritesManager.importFromURL();
    favoritesManager.updateBadge();
    
    await loadData();
    setupEventListeners();
});

async function loadData() {
    try {
        await dataProcessor.loadAllData();
        filteredPOIs = dataProcessor.getAllPOIs();
        
        setupFilters();
        displayResults();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function setupFilters() {
    const types = dataProcessor.getTypes();
    const typeFiltersContainer = document.getElementById('typeFilters');
    
    typeFiltersContainer.innerHTML = types.map(type => `
        <div class="form-check">
            <input class="form-check-input type-filter" type="checkbox" value="${type}" id="type-${type}" checked>
            <label class="form-check-label" for="type-${type}">
                ${window.appUtils.getTypeLabel(type)}
            </label>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Search
    document.getElementById('searchInput').addEventListener('input', applyFilters);
    
    // Type filters
    document.querySelectorAll('.type-filter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Reset filters
    document.getElementById('resetFilters').addEventListener('click', resetFilters);
    
    // View mode switcher
    document.querySelectorAll('[data-view]').forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            switchView(view);
        });
    });
    
    // Listen for favorites changes
    window.addEventListener('favoritesChanged', displayResults);
}

function applyFilters() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const selectedTypes = Array.from(document.querySelectorAll('.type-filter:checked'))
        .map(cb => cb.value);
    
    filteredPOIs = dataProcessor.getAllPOIs().filter(poi => {
        // Type filter
        if (!selectedTypes.includes(poi.type)) return false;
        
        // Search filter
        if (searchQuery && !poi.name.toLowerCase().includes(searchQuery) &&
            !poi.description.toLowerCase().includes(searchQuery) &&
            !poi.location.address.toLowerCase().includes(searchQuery)) {
            return false;
        }
        
        return true;
    });
    
    displayResults();
}

function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.querySelectorAll('.type-filter').forEach(cb => cb.checked = true);
    applyFilters();
}

function displayResults() {
    document.getElementById('resultCount').textContent = filteredPOIs.length;
    
    switch(currentView) {
        case 'grid':
            displayGridView();
            break;
        case 'list':
            displayListView();
            break;
        case 'map':
            displayMapView();
            break;
    }
}

function displayGridView() {
    const container = document.getElementById('gridView');
    
    if (filteredPOIs.length === 0) {
        container.innerHTML = '<div class="col-12"><div class="empty-state"><h3>Keine Ergebnisse</h3><p>Versuchen Sie, die Filter anzupassen</p></div></div>';
        return;
    }
    
    container.innerHTML = filteredPOIs.map(poi => {
        const card = window.appUtils.createPOICard(poi);
        return card.replace('<div class="col-md-4">', '<div class="col-md-4 col-sm-6">');
    }).join('');
    
    window.appUtils.attachFavoriteListeners();
}

function displayListView() {
    const container = document.getElementById('listView');
    
    if (filteredPOIs.length === 0) {
        container.innerHTML = '<div class="empty-state"><h3>Keine Ergebnisse</h3><p>Versuchen Sie, die Filter anzupassen</p></div>';
        return;
    }
    
    container.innerHTML = filteredPOIs.map(poi => createListItem(poi)).join('');
    window.appUtils.attachFavoriteListeners();
}

function createListItem(poi) {
    const image = poi.images[0] || 'https://via.placeholder.com/200x150/ff9c21/ffffff?text=Kein+Bild';
    const isFavorite = favoritesManager.isFavorite(poi.id);
    
    return `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-3 position-relative">
                    <img src="${image}" class="img-fluid poi-card-image" alt="${poi.name}">
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                            data-poi-id="${poi.id}">
                        <svg width="20" height="20" fill="${isFavorite ? '#ff9c21' : 'none'}" 
                             stroke="${isFavorite ? '#ff9c21' : 'currentColor'}" 
                             stroke-width="2" viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <h5 class="card-title">${poi.name}</h5>
                        <p class="card-text">${window.appUtils.truncateText(poi.description, 200)}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="category-badge">${window.appUtils.getTypeLabel(poi.type)}</span>
                            <small class="text-muted">
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                </svg>
                                ${poi.location.address}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function displayMapView() {
    if (!map) {
        map = L.map('mapView').setView([47.05, 9.1], 11);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    }
    
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Add new markers
    filteredPOIs.forEach(poi => {
        if (poi.location.lat && poi.location.lon) {
            const marker = L.marker([poi.location.lat, poi.location.lon])
                .bindPopup(createPopupContent(poi))
                .addTo(map);
            markers.push(marker);
        }
    });
    
    // Fit bounds to markers
    if (markers.length > 0) {
        const group = L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
    
    // Force map to redraw
    setTimeout(() => map.invalidateSize(), 100);
}

function createPopupContent(poi) {
    const image = poi.images[0] || '';
    const isFavorite = favoritesManager.isFavorite(poi.id);
    
    return `
        <div style="min-width: 200px;">
            ${image ? `<img src="${image}" style="width: 100%; height: 120px; object-fit: cover; margin-bottom: 10px;">` : ''}
            <h6>${poi.name}</h6>
            <p style="font-size: 12px; margin-bottom: 8px;">${window.appUtils.truncateText(poi.description, 80)}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="background: #e9ecef; padding: 2px 8px; border-radius: 10px; font-size: 11px;">
                    ${window.appUtils.getTypeLabel(poi.type)}
                </span>
                <button onclick="toggleFavoriteFromMap('${poi.id}')" 
                        style="background: none; border: none; cursor: pointer; font-size: 20px;">
                    ${isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
        </div>
    `;
}

function toggleFavoriteFromMap(poiId) {
    favoritesManager.toggle(poiId);
    displayMapView(); // Refresh map to update popup
}

function switchView(view) {
    currentView = view;
    
    // Update button states
    document.querySelectorAll('[data-view]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    // Show/hide views
    document.getElementById('gridView').classList.toggle('d-none', view !== 'grid');
    document.getElementById('listView').classList.toggle('d-none', view !== 'list');
    document.getElementById('mapView').classList.toggle('d-none', view !== 'map');
    
    displayResults();
}

// Make function available globally for map popups
window.toggleFavoriteFromMap = toggleFavoriteFromMap;
