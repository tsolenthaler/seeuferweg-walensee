// ============================================
// Language Translations
// ============================================
const translations = {
    de: {
        filters: 'Filter',
        search: 'Suche',
        type: 'Typ',
        category: 'Kategorie',
        price: 'Preis',
        reset: 'Filter zurücksetzen',
        sort: 'Sortieren nach',
        name: 'Name',
        location: 'Ort',
        date: 'Datum',
        favorites: 'Favoriten',
        viewFavorites: 'Favoriten anzeigen',
        shareFavorites: 'Favoriten teilen',
        places: 'Orte & Angebote',
        actions: 'Aktionen',
        copy: 'Kopieren',
        viewDetails: 'Details anzeigen',
        addFavorite: 'Zu Favoriten hinzufügen',
        removeFavorite: 'Aus Favoriten entfernen',
    },
    en: {
        filters: 'Filters',
        search: 'Search',
        type: 'Type',
        category: 'Category',
        price: 'Price',
        reset: 'Reset Filters',
        sort: 'Sort By',
        name: 'Name',
        location: 'Location',
        date: 'Date',
        favorites: 'Favorites',
        viewFavorites: 'View Favorites',
        shareFavorites: 'Share Favorites',
        places: 'Places & Offers',
        actions: 'Actions',
        copy: 'Copy',
        viewDetails: 'View Details',
        addFavorite: 'Add to Favorites',
        removeFavorite: 'Remove from Favorites',
    }
};

// ============================================
// App State
// ============================================
let appState = {
    currentLanguage: 'de',
    currentView: 'map', // 'map', 'tiles', 'list'
    allItems: [],
    filteredItems: [],
    favorites: [],
    filters: {
        search: '',
        type: '',
        category: '',
        price: 500
    },
    sortBy: 'name'
};

let map = null;
let markers = {};

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
    initializeApp();
});

async function initializeApp() {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') || 'de';
    appState.currentLanguage = savedLanguage;
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
        appState.favorites = JSON.parse(savedFavorites);
    }

    // Try to load and display logo
    const logoImg = document.getElementById('headerLogo');
    if (logoImg) {
        logoImg.addEventListener('load', function() {
            this.style.display = 'block';
        });
        logoImg.addEventListener('error', function() {
            this.style.display = 'none';
        });
    }

    // Load data from JSON files
    await loadData();

    // Initialize UI
    initializeMap();
    setupEventListeners();
    updateLanguage();
    applyFiltersAndSort();
    renderItems();
}

async function loadData() {
    try {
        const [ostschweiz, glarnerland] = await Promise.all([
            fetch('ostschweiz.json').then(r => r.json()).catch(() => []),
            fetch('glarnerland.json').then(r => r.json()).catch(() => [])
        ]);

        // Combine and normalize data
        const combinedData = [
            ...Array.isArray(ostschweiz) ? ostschweiz : [],
            ...Array.isArray(glarnerland) ? glarnerland : []
        ];

        appState.allItems = combinedData.map(item => normalizeItem(item));
        console.log('Loaded items:', appState.allItems.length);
    } catch (error) {
        console.error('Error loading data:', error);
        appState.allItems = [];
    }
}

function normalizeItem(item) {
    const name = typeof item.name === 'object' ? (item.name.de || item.name.en || '') : (item.name || '');
    const description = typeof item.description === 'object' 
        ? (item.description.de || item.description.en || '') 
        : (item.description || '');
    const disambiguatingDescription = typeof item.disambiguatingDescription === 'object'
        ? (item.disambiguatingDescription.de || item.disambiguatingDescription.en || '')
        : (item.disambiguatingDescription || '');

    const address = item.address || {};
    const location = address.addressLocality || '';
    const postalCode = address.postalCode || '';

    return {
        id: item.identifier || Math.random().toString(36).substr(2, 9),
        name: name,
        type: item['@type'] || 'Place',
        category: item.additionalType || 'Uncategorized',
        description: description || disambiguatingDescription,
        location: location,
        postalCode: postalCode,
        address: item.address,
        latitude: item.geo?.latitude || 0,
        longitude: item.geo?.longitude || 0,
        image: item.image?.[0]?.contentUrl || '',
        openingHours: item.openingHours,
        price: item.priceRange || 0,
        url: item.address?.url || '',
        telephone: item.address?.telephone || '',
        dateModified: item.dateModified || ''
    };
}

// ============================================
// Map Initialization
// ============================================
function initializeMap() {
    // Default to Walensee area
    const defaultLat = 47.12;
    const defaultLng = 9.08;

    map = L.map('map').setView([defaultLat, defaultLng], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // Add markers for all items
    appState.allItems.forEach(item => {
        if (item.latitude && item.longitude) {
            addMarker(item);
        }
    });
}

function addMarker(item) {
    if (!map || !item.latitude || !item.longitude) return;

    const marker = L.marker([item.latitude, item.longitude], {
        title: item.name
    })
    .addTo(map)
    .on('click', () => showDetails(item));

    const isFavorited = appState.favorites.some(fav => fav.id === item.id);
    const markerColor = isFavorited ? '#ff6b6b' : '#0066cc';
    
    const markerIcon = L.icon({
        iconUrl: getMarkerIcon(markerColor),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    });

    marker.setIcon(markerIcon);
    markers[item.id] = marker;
}

function getMarkerIcon(color) {
    // SVG-based marker icon
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 7 10 13 10 13s10-6 10-13c0-5.52-4.48-10-10-10zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
        </svg>
    `;
    return 'data:image/svg+xml;base64,' + btoa(svg);
}

// ============================================
// Event Listeners
// ============================================
function setupEventListeners() {
    // Language toggle
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);

    // View toggle
    document.getElementById('viewToggle').addEventListener('click', toggleView);

    // Filter and sort
    document.getElementById('searchInput').addEventListener('input', (e) => {
        appState.filters.search = e.target.value;
        applyFiltersAndSort();
        renderItems();
    });

    document.getElementById('typeFilter').addEventListener('change', (e) => {
        appState.filters.type = e.target.value;
        applyFiltersAndSort();
        renderItems();
    });

    document.getElementById('categoryFilter').addEventListener('change', (e) => {
        appState.filters.category = e.target.value;
        applyFiltersAndSort();
        renderItems();
    });

    document.getElementById('priceFilter').addEventListener('input', (e) => {
        appState.filters.price = parseInt(e.target.value);
        document.getElementById('priceValue').textContent = 
            `CHF 0 - ${appState.filters.price}`;
        applyFiltersAndSort();
        renderItems();
    });

    document.getElementById('sortBy').addEventListener('change', (e) => {
        appState.sortBy = e.target.value;
        applyFiltersAndSort();
        renderItems();
    });

    document.getElementById('resetFilters').addEventListener('click', () => {
        appState.filters = { search: '', type: '', category: '', price: 500 };
        document.getElementById('searchInput').value = '';
        document.getElementById('typeFilter').value = '';
        document.getElementById('categoryFilter').value = '';
        document.getElementById('priceFilter').value = 500;
        document.getElementById('priceValue').textContent = 'CHF 0 - 500';
        applyFiltersAndSort();
        renderItems();
    });

    // Favorites
    document.getElementById('viewFavorites').addEventListener('click', viewFavoritesOnly);
    document.getElementById('shareFavorites').addEventListener('click', showShareModal);

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.add('hidden');
        });
    });

    // Copy share URL
    document.getElementById('copyShareUrl')?.addEventListener('click', copyShareUrl);

    // Close modal on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });

    // Select all checkbox
    document.getElementById('selectAll')?.addEventListener('change', (e) => {
        document.querySelectorAll('#listBody input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = e.target.checked;
        });
    });

    // Populate filter dropdowns
    populateFilterDropdowns();
}

function populateFilterDropdowns() {
    const types = new Set(appState.allItems.map(item => item.type));
    const categories = new Set(appState.allItems.map(item => item.category));

    const typeSelect = document.getElementById('typeFilter');
    const categorySelect = document.getElementById('categoryFilter');

    Array.from(types).forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeSelect.appendChild(option);
    });

    Array.from(categories).forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// ============================================
// Filtering and Sorting
// ============================================
function applyFiltersAndSort() {
    let filtered = appState.allItems.filter(item => {
        // Search filter
        const searchMatch = item.name.toLowerCase().includes(appState.filters.search.toLowerCase()) ||
                          item.description.toLowerCase().includes(appState.filters.search.toLowerCase());

        // Type filter
        const typeMatch = !appState.filters.type || item.type === appState.filters.type;

        // Category filter
        const categoryMatch = !appState.filters.category || item.category === appState.filters.category;

        // Price filter
        const priceMatch = !item.price || item.price <= appState.filters.price;

        return searchMatch && typeMatch && categoryMatch && priceMatch;
    });

    // Sorting
    filtered.sort((a, b) => {
        switch (appState.sortBy) {
            case 'name':
                return a.name.localeCompare(b.name, appState.currentLanguage);
            case 'location':
                return a.location.localeCompare(b.location, appState.currentLanguage);
            case 'price':
                return (a.price || 0) - (b.price || 0);
            case 'date':
                return new Date(b.dateModified) - new Date(a.dateModified);
            default:
                return 0;
        }
    });

    appState.filteredItems = filtered;
}

// ============================================
// Rendering
// ============================================
function renderItems() {
    renderItemsList();
    renderTiles();
    renderListTable();
    updateMapMarkers();
}

function renderItemsList() {
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = '';

    appState.filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';

        const isFavorited = appState.favorites.some(fav => fav.id === item.id);

        card.innerHTML = `
            <div class="item-card-content" onclick="app.showDetails('${item.id}')">
                <h4>${escapeHtml(item.name)}</h4>
                <p>${item.type}</p>
                <p>${escapeHtml(item.location)}</p>
            </div>
            <button class="item-favorite-btn ${isFavorited ? 'favorited' : ''}" 
                    onclick="event.stopPropagation(); app.toggleFavorite('${item.id}')">
                ${isFavorited ? '❤️' : '🤍'}
            </button>
        `;

        card.addEventListener('click', () => showDetails(item));
        itemsList.appendChild(card);
    });
}

function renderTiles() {
    const tilesList = document.getElementById('tilesList');
    tilesList.innerHTML = '';

    appState.filteredItems.forEach(item => {
        const tile = document.createElement('div');
        tile.className = 'tile';

        const isFavorited = appState.favorites.some(fav => fav.id === item.id);

        tile.innerHTML = `
            <div class="tile-image">
                ${item.image ? `<img src="${item.image}" alt="${escapeHtml(item.name)}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 150%22%3E%3Crect fill=%22%23ddd%22 width=%22200%22 height=%22150%22/%3E%3C/svg%3E'">` : '<div style="background: #ddd; width: 100%; height: 100%;"></div>'}
            </div>
            <div class="tile-content">
                <h3 class="tile-title">${escapeHtml(item.name)}</h3>
                <span class="tile-type">${item.type}</span>
                <p class="tile-info"><strong>${t('location')}:</strong> ${escapeHtml(item.location)}</p>
                ${item.price ? `<p class="tile-info"><strong>${t('price')}:</strong> CHF ${item.price}</p>` : ''}
                <div class="tile-actions">
                    <button class="btn btn-primary" onclick="app.showDetails('${item.id}')">${t('viewDetails')}</button>
                    <button class="btn-favorite ${isFavorited ? 'favorited' : ''}" onclick="app.toggleFavorite('${item.id}')">
                        ${isFavorited ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        `;

        tilesList.appendChild(tile);
    });
}

function renderListTable() {
    const listBody = document.getElementById('listBody');
    listBody.innerHTML = '';

    appState.filteredItems.forEach(item => {
        const isFavorited = appState.favorites.some(fav => fav.id === item.id);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td onclick="app.showDetails('${item.id}')" style="cursor: pointer; color: #0066cc;">
                ${escapeHtml(item.name)}
            </td>
            <td>${item.type}</td>
            <td>${escapeHtml(item.location)}</td>
            <td>${item.price ? 'CHF ' + item.price : '-'}</td>
            <td>
                <div class="list-actions">
                    <button class="btn-secondary" onclick="app.showDetails('${item.id}')">${t('viewDetails')}</button>
                    <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" 
                            onclick="app.toggleFavorite('${item.id}')">
                        ${isFavorited ? '❤️' : '🤍'}
                    </button>
                </div>
            </td>
        `;
        listBody.appendChild(row);
    });
}

function updateMapMarkers() {
    // Hide markers not in filtered list
    const filteredIds = new Set(appState.filteredItems.map(item => item.id));

    Object.keys(markers).forEach(id => {
        if (filteredIds.has(id)) {
            map.addLayer(markers[id]);
        } else {
            map.removeLayer(markers[id]);
        }
    });
}

// ============================================
// Details Modal
// ============================================
function showDetails(item) {
    if (typeof item === 'string') {
        item = appState.allItems.find(i => i.id === item);
    }

    if (!item) return;

    const modal = document.getElementById('detailsModal');
    const modalBody = document.getElementById('modalBody');

    const isFavorited = appState.favorites.some(fav => fav.id === item.id);

    let html = `
        <div>
            ${item.image ? `<img src="${item.image}" alt="${escapeHtml(item.name)}" style="max-width: 100%; border-radius: 8px; margin-bottom: 1rem;">` : ''}
            
            <h2>${escapeHtml(item.name)}</h2>
            
            <div class="detail-section">
                <h3>${t('type')}</h3>
                <p>${item.type}</p>
            </div>

            <div class="detail-section">
                <h3>${t('location')}</h3>
                <p>${escapeHtml(item.location)} ${item.postalCode ? item.postalCode : ''}</p>
            </div>

            ${item.description ? `
            <div class="detail-section">
                <h3>Description</h3>
                <p>${item.description}</p>
            </div>
            ` : ''}

            ${item.telephone ? `
            <div class="detail-section">
                <h3>Telephone</h3>
                <p><a href="tel:${item.telephone}">${item.telephone}</a></p>
            </div>
            ` : ''}

            ${item.url ? `
            <div class="detail-section">
                <h3>Website</h3>
                <p><a href="${item.url}" target="_blank">${item.url}</a></p>
            </div>
            ` : ''}

            ${item.openingHours ? `
            <div class="detail-section">
                <h3>Opening Hours</h3>
                <p>${typeof item.openingHours === 'object' ? (item.openingHours.de || item.openingHours.en || '') : item.openingHours}</p>
            </div>
            ` : ''}

            <button class="btn btn-primary" onclick="app.toggleFavorite('${item.id}'); updateDetailsButton('${item.id}')">
                ${isFavorited ? t('removeFavorite') : t('addFavorite')}
            </button>
        </div>
    `;

    modalBody.innerHTML = html;
    modal.classList.remove('hidden');
}

function updateDetailsButton(itemId) {
    const item = appState.allItems.find(i => i.id === itemId);
    const isFavorited = appState.favorites.some(fav => fav.id === itemId);
    const btn = document.querySelector('#detailsModal .btn-primary');
    if (btn) {
        btn.textContent = isFavorited ? t('removeFavorite') : t('addFavorite');
    }
}

// ============================================
// Favorites Management
// ============================================
function toggleFavorite(itemId) {
    const item = appState.allItems.find(i => i.id === itemId);
    if (!item) return;

    const index = appState.favorites.findIndex(fav => fav.id === itemId);
    
    if (index > -1) {
        appState.favorites.splice(index, 1);
    } else {
        appState.favorites.push(item);
    }

    localStorage.setItem('favorites', JSON.stringify(appState.favorites));
    renderItems();
}

function viewFavoritesOnly() {
    appState.filteredItems = appState.favorites;
    renderItems();
}

function showShareModal() {
    const modal = document.getElementById('shareModal');
    const shareUrl = document.getElementById('shareUrl');

    const favoriteIds = appState.favorites.map(fav => fav.id).join(',');
    const fullUrl = `${window.location.origin}${window.location.pathname}?favorites=${encodeURIComponent(favoriteIds)}`;

    shareUrl.value = fullUrl;
    modal.classList.remove('hidden');
}

function copyShareUrl() {
    const shareUrl = document.getElementById('shareUrl');
    shareUrl.select();
    document.execCommand('copy');
    alert(t('copy') + '!');
}

// ============================================
// Language Management
// ============================================
function toggleLanguage() {
    appState.currentLanguage = appState.currentLanguage === 'de' ? 'en' : 'de';
    localStorage.setItem('language', appState.currentLanguage);
    updateLanguage();
}

function updateLanguage() {
    document.documentElement.lang = appState.currentLanguage;
    document.getElementById('langToggle').textContent = appState.currentLanguage === 'de' ? 'English' : 'Deutsch';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
}

function t(key) {
    return translations[appState.currentLanguage][key] || key;
}

// ============================================
// View Toggle
// ============================================
function toggleView() {
    const views = ['map', 'tiles', 'list'];
    const currentIndex = views.indexOf(appState.currentView);
    appState.currentView = views[(currentIndex + 1) % views.length];

    document.getElementById('mapContainer').classList.toggle('hidden', appState.currentView !== 'map');
    document.getElementById('tilesContainer').classList.toggle('hidden', appState.currentView !== 'tiles');
    document.getElementById('listContainer').classList.toggle('hidden', appState.currentView !== 'list');

    const icons = { 'map': '🗺️', 'tiles': '🔲', 'list': '📋' };
    document.getElementById('viewIcon').textContent = icons[appState.currentView];

    if (appState.currentView === 'map' && map) {
        setTimeout(() => map.invalidateSize(), 0);
    }
}

// ============================================
// Utility Functions
// ============================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions accessible from HTML
window.app = {
    showDetails,
    toggleFavorite
};

// Handle URL query parameters for shared favorites
function handleSharedFavorites() {
    const params = new URLSearchParams(window.location.search);
    const favoriteIds = params.get('favorites');

    if (favoriteIds) {
        const ids = favoriteIds.split(',');
        appState.favorites = appState.allItems.filter(item => ids.includes(item.id));
        localStorage.setItem('favorites', JSON.stringify(appState.favorites));
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

// Call after loading data
setTimeout(handleSharedFavorites, 1000);
