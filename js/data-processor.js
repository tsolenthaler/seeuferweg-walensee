/**
 * Data Processor for Seeuferweg Walensee
 * Handles loading, filtering, and normalizing data from multiple sources
 */

class DataProcessor {
    constructor() {
        this.data = {
            heidiland: [],
            glarnerland: [],
            rapperswil: []
        };
        this.normalizedData = [];
        this.walenseeRegion = {
            // Approximate bounding box for Walensee region
            minLat: 46.9,
            maxLat: 47.2,
            minLon: 8.95,
            maxLon: 9.25
        };
    }

    /**
     * Load all data sources
     */
    async loadAllData() {
        try {
            const [heidiland, glarnerland, rapperswil] = await Promise.all([
                fetch('heidiland.json').then(r => r.json()),
                fetch('glarnerland.json').then(r => r.json()),
                fetch('rapperswil.json').then(r => r.json())
            ]);

            this.data.heidiland = heidiland;
            this.data.glarnerland = glarnerland;
            this.data.rapperswil = rapperswil;

            this.normalizeData();
            return this.normalizedData;
        } catch (error) {
            console.error('Error loading data:', error);
            return [];
        }
    }

    /**
     * Check if coordinates are in Walensee region
     */
    isInWalenseeRegion(lat, lon) {
        return lat >= this.walenseeRegion.minLat && 
               lat <= this.walenseeRegion.maxLat && 
               lon >= this.walenseeRegion.minLon && 
               lon <= this.walenseeRegion.maxLon;
    }

    /**
     * Normalize Glarnerland data
     */
    normalizeGlarnerland(items) {
        return items
            .filter(item => {
                const lat = parseFloat(item.geo?.latitude);
                const lon = parseFloat(item.geo?.longitude);
                return lat && lon && this.isInWalenseeRegion(lat, lon);
            })
            .map(item => ({
                id: item.identifier,
                source: 'glarnerland',
                name: item.name?.de || 'Unbekannt',
                description: item.description?.de || item.disambiguatingDescription?.de || '',
                type: this.categorizeType(item['@type'], item.additionalType),
                category: this.extractCategory(item),
                location: {
                    lat: parseFloat(item.geo.latitude),
                    lon: parseFloat(item.geo.longitude),
                    address: item.address?.addressLocality || '',
                    postalCode: item.address?.postalCode || ''
                },
                images: item.image?.map(img => img.contentUrl) || [],
                contact: {
                    phone: item.address?.telephone || '',
                    email: item.address?.email || '',
                    website: item.address?.url || ''
                },
                openingHours: item.openingHours?.de || '',
                dateModified: item.dateModified
            }));
    }

    /**
     * Normalize Rapperswil data structure
     */
    normalizeRapperswil(items) {
        // Rapperswil data is a category tree, we need to extract actual POIs
        // For now, return empty array - needs actual POI data endpoint
        return [];
    }

    /**
     * Normalize Heidiland data (currently empty JSON)
     */
    normalizeHeidiland(items) {
        if (!items || items.length === 0) return [];
        
        return items
            .filter(item => {
                const lat = parseFloat(item.geo?.latitude);
                const lon = parseFloat(item.geo?.longitude);
                return lat && lon && this.isInWalenseeRegion(lat, lon);
            })
            .map(item => ({
                id: item.identifier || item.id,
                source: 'heidiland',
                name: item.name?.de || item.name || 'Unbekannt',
                description: item.description?.de || item.description || '',
                type: this.categorizeType(item['@type'] || item.type, item.additionalType),
                category: this.extractCategory(item),
                location: {
                    lat: parseFloat(item.geo.latitude),
                    lon: parseFloat(item.geo.longitude),
                    address: item.address?.addressLocality || '',
                    postalCode: item.address?.postalCode || ''
                },
                images: item.image?.map(img => img.contentUrl || img) || [],
                contact: {
                    phone: item.address?.telephone || '',
                    email: item.address?.email || '',
                    website: item.address?.url || ''
                },
                openingHours: item.openingHours?.de || '',
                dateModified: item.dateModified
            }));
    }

    /**
     * Categorize POI type
     */
    categorizeType(type, additionalType) {
        const typeMap = {
            'LodgingBusiness': 'accommodation',
            'Hotel': 'accommodation',
            'HolidayApartment': 'accommodation',
            'Restaurant': 'restaurant',
            'FoodEstablishment': 'restaurant',
            'TouristAttraction': 'attraction',
            'Place': 'place',
            'Webcam': 'webcam',
            'CivicStructure': 'infrastructure',
            'RVPark': 'camping'
        };

        return typeMap[type] || typeMap[additionalType] || 'other';
    }

    /**
     * Extract category from item
     */
    extractCategory(item) {
        const categories = [];
        
        if (item['@type']) categories.push(item['@type']);
        if (item.additionalType) categories.push(item.additionalType);
        
        return categories;
    }

    /**
     * Normalize all data
     */
    normalizeData() {
        const normalized = [
            ...this.normalizeGlarnerland(this.data.glarnerland),
            ...this.normalizeHeidiland(this.data.heidiland),
            ...this.normalizeRapperswil(this.data.rapperswil)
        ];

        this.normalizedData = normalized;
        return normalized;
    }

    /**
     * Get all POIs
     */
    getAllPOIs() {
        return this.normalizedData;
    }

    /**
     * Filter POIs by type
     */
    filterByType(type) {
        return this.normalizedData.filter(poi => poi.type === type);
    }

    /**
     * Filter POIs by category
     */
    filterByCategory(categories) {
        if (!categories || categories.length === 0) return this.normalizedData;
        
        return this.normalizedData.filter(poi => 
            poi.category.some(cat => categories.includes(cat))
        );
    }

    /**
     * Search POIs
     */
    search(query) {
        const lowerQuery = query.toLowerCase();
        return this.normalizedData.filter(poi => 
            poi.name.toLowerCase().includes(lowerQuery) ||
            poi.description.toLowerCase().includes(lowerQuery) ||
            poi.location.address.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * Get POI by ID
     */
    getPOIById(id) {
        return this.normalizedData.find(poi => poi.id === id);
    }

    /**
     * Get unique types
     */
    getTypes() {
        const types = new Set();
        this.normalizedData.forEach(poi => types.add(poi.type));
        return Array.from(types);
    }

    /**
     * Get unique categories
     */
    getCategories() {
        const categories = new Set();
        this.normalizedData.forEach(poi => 
            poi.category.forEach(cat => categories.add(cat))
        );
        return Array.from(categories);
    }

    /**
     * Get highlights (featured items)
     */
    getHighlights(limit = 6) {
        // Filter for attractive POIs with images
        return this.normalizedData
            .filter(poi => 
                poi.images.length > 0 && 
                (poi.type === 'attraction' || poi.type === 'place')
            )
            .slice(0, limit);
    }

    /**
     * Get activities
     */
    getActivities() {
        return this.normalizedData.filter(poi => 
            poi.type === 'attraction' || 
            poi.description.toLowerCase().includes('aktivität') ||
            poi.description.toLowerCase().includes('wandern') ||
            poi.description.toLowerCase().includes('sport')
        );
    }

    /**
     * Get photo points (items with good images)
     */
    getFotopoints() {
        return this.normalizedData
            .filter(poi => 
                poi.images.length > 0 && 
                (poi.type === 'webcam' || poi.type === 'place' || poi.type === 'attraction')
            );
    }

    /**
     * Get statistics
     */
    getStats() {
        return {
            totalPOIs: this.normalizedData.length,
            totalHighlights: this.getHighlights(999).length,
            totalActivities: this.getActivities().length,
            totalFotopoints: this.getFotopoints().length,
            byType: this.getTypes().reduce((acc, type) => {
                acc[type] = this.filterByType(type).length;
                return acc;
            }, {})
        };
    }
}

// Export for use in other scripts
window.DataProcessor = DataProcessor;
