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
     * Normalize Heidiland data (Package/Product data without geo coordinates)
     */
    normalizeHeidiland(items) {
        if (!items || items.length === 0) return [];
        
        // Heidiland contains packages (e.g., ski packages) without geo coordinates
        // We'll include them but without location data for mapping
        return items
            .map(item => {
                const name = item.name?.de || item.name?.en || item.name || 'Unbekannt';
                const description = this.extractDescription(item);
                
                return {
                    id: item.identifier || item.id || Math.random().toString(36),
                    source: 'heidiland',
                    name: name,
                    description: description,
                    type: this.categorizeType(item['@type'] || item.type, item.additionalType),
                    category: this.extractCategory(item),
                    location: {
                        // Use address locality, no geo coordinates available
                        lat: null,
                        lon: null,
                        address: item.address?.addressLocality || 'Heidiland',
                        postalCode: item.address?.postalCode || ''
                    },
                    images: this.extractImages(item),
                    contact: {
                        phone: item.address?.telephone || item.telephone || '',
                        email: item.address?.email || item.email || '',
                        website: item.address?.url || item.url || item.offers?.url || ''
                    },
                    openingHours: item.openingHours?.de || item.openingHoursSpecification || '',
                    price: item.offers?.description?.de || item.offers?.description?.en || '',
                    dateModified: item.dateModified || item.modified
                };
            });
    }
    
    /**
     * Extract description from various fields
     */
    extractDescription(item) {
        // Try multiple description fields
        return item.description?.de || 
               item.description?.en || 
               item.description || 
               item.disambiguatingDescription?.de || 
               item.disambiguatingDescription?.en ||
               item.disambiguatingDescription ||
               item.abstract?.de ||
               item.abstract?.en ||
               item.abstract ||
               '';
    }
    
    /**
     * Extract images from various formats
     */
    extractImages(item) {
        const images = [];
        
        if (item.image) {
            if (Array.isArray(item.image)) {
                item.image.forEach(img => {
                    if (typeof img === 'string') {
                        images.push(img);
                    } else if (img.contentUrl) {
                        images.push(img.contentUrl);
                    } else if (img.url) {
                        images.push(img.url);
                    }
                });
            } else if (typeof item.image === 'string') {
                images.push(item.image);
            } else if (item.image.contentUrl) {
                images.push(item.image.contentUrl);
            }
        }
        
        // Check for photo field
        if (item.photo) {
            if (Array.isArray(item.photo)) {
                item.photo.forEach(photo => {
                    if (typeof photo === 'string') images.push(photo);
                    else if (photo.contentUrl) images.push(photo.contentUrl);
                });
            } else if (typeof item.photo === 'string') {
                images.push(item.photo);
            }
        }
        
        return images;
    }

    /**
     * Categorize POI type
     */
    categorizeType(type, additionalType) {
        const typeMap = {
            // Accommodation
            'LodgingBusiness': 'accommodation',
            'Hotel': 'accommodation',
            'HolidayApartment': 'accommodation',
            'BedAndBreakfast': 'accommodation',
            'FarmLodging': 'accommodation',
            'GroupAccommodation': 'accommodation',
            'Accommodation': 'accommodation',
            
            // Gastronomy
            'Restaurant': 'restaurant',
            'FoodEstablishment': 'restaurant',
            'MountainRestaurant': 'restaurant',
            'BarOrPub': 'restaurant',
            'CafeOrCoffeeShop': 'restaurant',
            'FastFoodRestaurant': 'restaurant',
            'Bistro': 'restaurant',
            'Imbiss': 'restaurant',
            
            // Attractions & Activities
            'TouristAttraction': 'attraction',
            'Experience': 'attraction',
            'Museum': 'attraction',
            'GuidedTour': 'attraction',
            'ShipTour': 'attraction',
            'NatureTrail': 'attraction',
            'ThemeTrail': 'attraction',
            'HikingTrail': 'attraction',
            'TobogganRun': 'attraction',
            'SummerTobogganTrack': 'attraction',
            'HighRopesCourse': 'attraction',
            'MinigolfCourse': 'attraction',
            'Playground': 'attraction',
            'BikePark': 'attraction',
            'Viewpoint': 'attraction',
            'Monument': 'attraction',
            'Ruin': 'attraction',
            
            // Sports & Wellness
            'GolfCourse': 'sport',
            'SkiSlope': 'sport',
            'SkiLift': 'sport',
            'CableCarStation': 'sport',
            'CableCar': 'sport',
            'ThermalSpa': 'wellness',
            'IndoorPool': 'wellness',
            'Sauna': 'wellness',
            'SportHall': 'sport',
            'TennisComplex': 'sport',
            'SkiSchool': 'sport',
            
            // Nature & Places
            'Place': 'place',
            'LakeBodyOfWater': 'nature',
            'Alp': 'nature',
            
            // Services
            'Webcam': 'webcam',
            'CivicStructure': 'infrastructure',
            'Services': 'service',
            'BikeRental': 'service',
            'BikeStore': 'service',
            'SportingGoodsStore': 'service',
            
            // Camping
            'RVPark': 'camping',
            'Campground': 'camping',
            'Pitch': 'camping',
            
            // Shopping & Food
            'Winery': 'shopping',
            'Vinotheque': 'shopping',
            'FarmShop': 'shopping',
            'ButcherShop': 'shopping',
            'Dairy': 'shopping',
            'ConvenienceStore': 'shopping',
            'ShoppingCenter': 'shopping',
            'OutletStore': 'shopping',
            'Store': 'shopping',
            'BookStore': 'shopping',
            'Farm': 'shopping',
            
            // Other
            'Package': 'package',
            'Offer': 'package',
            'Casino': 'entertainment',
            'Cinema': 'entertainment',
            'CongressCenter': 'event'
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
        // Prioritize scenic webcams and accommodations with great views
        const highlights = this.normalizedData
            .filter(poi => poi.images.length > 0)
            .map(poi => {
                // Calculate priority score
                let score = 0;
                const nameAndDesc = (poi.name + ' ' + poi.description).toLowerCase();
                
                // Webcams with scenic names get high priority
                if (poi.type === 'webcam') {
                    if (nameAndDesc.includes('walensee')) score += 100;
                    if (nameAndDesc.includes('aussicht') || nameAndDesc.includes('panorama')) score += 50;
                    score += 30; // Base score for webcams
                }
                
                // Accommodations with descriptions
                if (poi.type === 'accommodation') {
                    if (poi.description.length > 100) score += 40;
                    if (nameAndDesc.includes('aussicht')) score += 30;
                }
                
                // Camping spots with activities
                if (poi.type === 'camping') {
                    if (poi.description.length > 200) score += 45;
                }
                
                // Boost for longer descriptions (more interesting content)
                score += Math.min(poi.description.length / 50, 20);
                
                return { ...poi, _score: score };
            })
            .filter(poi => poi._score > 20)
            .sort((a, b) => b._score - a._score)
            .slice(0, limit);
        
        // Remove score property
        return highlights.map(({ _score, ...poi }) => poi);
    }

    /**
     * Get activities
     */
    getActivities() {
        const activityKeywords = [
            'wandern', 'wanderung', 'hiking', 'trail', 'pfad',
            'bike', 'velo', 'rad', 'cycling',
            'ski', 'snowboard', 'langlauf', 'winter',
            'sport', 'aktivität', 'activity',
            'bergbahn', 'seilbahn', 'sessellift', 'gondel',
            'klettern', 'climbing', 'bouldern',
            'schwimmen', 'baden', 'pool', 'wellness',
            'segeln', 'boot', 'schiff',
            'golf', 'tennis', 'minigolf',
            'erlebnis', 'experience', 'abenteuer',
            'tour', 'trekking', 'ausflug',
            'spielplatz', 'playground',
            'hochseilgarten', 'seilpark',
            'rodelbahn', 'toboggan', 'schlittel'
        ];
        
        const activityTypes = [
            'sport', 'wellness', 'attraction',
            'camping', 'nature'
        ];
        
        return this.normalizedData.filter(poi => {
            // Include specific activity types
            if (activityTypes.includes(poi.type)) return true;
            
            // Check name and description for activity keywords
            const searchText = (poi.name + ' ' + poi.description).toLowerCase();
            return activityKeywords.some(keyword => searchText.includes(keyword));
        });
    }

    /**
     * Get photo points (items with good images)
     */
    getFotopoints() {
        return this.normalizedData
            .filter(poi => poi.images.length > 0)
            .map(poi => {
                // Calculate photo quality score
                let score = 0;
                const name = poi.name.toLowerCase();
                
                // Webcams are excellent photo points
                if (poi.type === 'webcam') score += 50;
                
                // Scenic keywords
                if (name.includes('aussicht') || name.includes('panorama')) score += 30;
                if (name.includes('walensee')) score += 25;
                if (name.includes('see') || name.includes('berg')) score += 15;
                
                // Locations with good photo opportunities
                if (name.includes('alp') || name.includes('grat') || name.includes('tal')) score += 20;
                
                return { ...poi, _score: score };
            })
            .filter(poi => poi._score > 0)
            .sort((a, b) => b._score - a._score)
            .map(({ _score, ...poi }) => poi);
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
