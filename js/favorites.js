/**
 * Favorites Manager for Seeuferweg Walensee
 * Handles favorites storage and export functionality
 */

class FavoritesManager {
    constructor() {
        this.storageKey = 'seeuferweg_favorites';
        this.favorites = this.loadFromStorage();
    }

    /**
     * Load favorites from localStorage
     */
    loadFromStorage() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading favorites:', error);
            return [];
        }
    }

    /**
     * Save favorites to localStorage
     */
    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
            this.updateBadge();
            this.dispatchEvent();
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }

    /**
     * Add POI to favorites
     */
    add(poiId) {
        if (!this.isFavorite(poiId)) {
            this.favorites.push(poiId);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    /**
     * Remove POI from favorites
     */
    remove(poiId) {
        const index = this.favorites.indexOf(poiId);
        if (index > -1) {
            this.favorites.splice(index, 1);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    /**
     * Toggle favorite status
     */
    toggle(poiId) {
        if (this.isFavorite(poiId)) {
            this.remove(poiId);
            return false;
        } else {
            this.add(poiId);
            return true;
        }
    }

    /**
     * Check if POI is in favorites
     */
    isFavorite(poiId) {
        return this.favorites.includes(poiId);
    }

    /**
     * Get all favorites
     */
    getAll() {
        return this.favorites;
    }

    /**
     * Get count of favorites
     */
    count() {
        return this.favorites.length;
    }

    /**
     * Clear all favorites
     */
    clear() {
        this.favorites = [];
        this.saveToStorage();
    }

    /**
     * Update favorites badge in navigation
     */
    updateBadge() {
        const badge = document.getElementById('favCount');
        if (badge) {
            badge.textContent = this.count();
        }
    }

    /**
     * Dispatch custom event when favorites change
     */
    dispatchEvent() {
        window.dispatchEvent(new CustomEvent('favoritesChanged', {
            detail: { count: this.count(), favorites: this.favorites }
        }));
    }

    /**
     * Export favorites as JSON
     */
    exportJSON() {
        const dataStr = JSON.stringify(this.favorites, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `seeuferweg-favoriten-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    /**
     * Export favorites as shareable URL
     */
    exportURL() {
        const baseUrl = window.location.origin + window.location.pathname;
        const favoritesParam = this.favorites.join(',');
        const shareUrl = `${baseUrl}?favorites=${encodeURIComponent(favoritesParam)}`;
        
        // Copy to clipboard
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Link wurde in die Zwischenablage kopiert!\n\n' + shareUrl);
        }).catch(err => {
            console.error('Could not copy to clipboard:', err);
            prompt('Kopieren Sie diesen Link:', shareUrl);
        });
    }

    /**
     * Import favorites from URL parameter
     */
    importFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const favoritesParam = urlParams.get('favorites');
        
        if (favoritesParam) {
            const importedFavorites = favoritesParam.split(',').filter(id => id.trim());
            
            if (importedFavorites.length > 0) {
                // Ask user if they want to replace or merge
                const replace = confirm(
                    `${importedFavorites.length} Favoriten gefunden.\n\n` +
                    'OK = Aktuelle Favoriten ersetzen\n' +
                    'Abbrechen = Zu bestehenden Favoriten hinzufügen'
                );
                
                if (replace) {
                    this.favorites = importedFavorites;
                } else {
                    importedFavorites.forEach(id => {
                        if (!this.isFavorite(id)) {
                            this.favorites.push(id);
                        }
                    });
                }
                
                this.saveToStorage();
                
                // Remove favorites parameter from URL
                urlParams.delete('favorites');
                const newUrl = window.location.pathname + 
                    (urlParams.toString() ? '?' + urlParams.toString() : '');
                window.history.replaceState({}, '', newUrl);
            }
        }
    }

    /**
     * Import favorites from JSON file
     */
    importJSON(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (Array.isArray(imported)) {
                    const replace = confirm(
                        `${imported.length} Favoriten gefunden.\n\n` +
                        'OK = Aktuelle Favoriten ersetzen\n' +
                        'Abbrechen = Zu bestehenden Favoriten hinzufügen'
                    );
                    
                    if (replace) {
                        this.favorites = imported;
                    } else {
                        imported.forEach(id => {
                            if (!this.isFavorite(id)) {
                                this.favorites.push(id);
                            }
                        });
                    }
                    
                    this.saveToStorage();
                    alert('Favoriten erfolgreich importiert!');
                }
            } catch (error) {
                alert('Fehler beim Importieren der Favoriten: ' + error.message);
            }
        };
        reader.readAsText(file);
    }
}

// Export for use in other scripts
window.FavoritesManager = FavoritesManager;
