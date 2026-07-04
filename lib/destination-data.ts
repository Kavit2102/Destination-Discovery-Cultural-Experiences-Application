export interface Destination {
  id: string
  name: string
  country: string
  description: string
  imageUrl: string
  climate: string
  currency: string
  language: string
  bestTime: string
  costLevel: 'budget' | 'mid' | 'luxury'
  vibe: string
  attractions: string[]
  topActivities: string[]
  avgCost: number
  population: number
  rating?: number
  isAiGenerated?: boolean
}

// Real destinations with curated information
export const REAL_DESTINATIONS: Destination[] = [
  {
    id: 'tokyo-jp',
    name: 'Tokyo',
    country: 'Japan',
    description: 'A vibrant metropolis blending ancient tradition with cutting-edge technology. Experience serene temples, bustling markets, and world-class cuisine.',
    imageUrl: 'https://unsplash.com/photos/pagoda-surrounded-by-trees-E_eWwM29wfU',
    climate: 'Temperate',
    currency: 'JPY',
    language: 'Japanese',
    bestTime: 'Spring (Mar-May), Fall (Sep-Nov)',
    costLevel: 'mid',
    vibe: 'Urban, cultural, tech-forward',
    attractions: ['Senso-ji Temple', 'Tokyo Tower', 'Shibuya Crossing', 'Meiji Shrine'],
    topActivities: ['Temple hopping', 'Street food tasting', 'Shopping', 'Karaoke'],
    avgCost: 80,
    population: 37400000,
    rating: 4.7,
  },
  {
    id: 'bali-id',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with stunning beaches, lush rice terraces, and spiritual culture. Perfect for relaxation, adventure, and cultural immersion.',
    imageUrl: 'https://images.unsplash.com/photo-1552733673-bada08b0e905?w=800&h=600&fit=crop',
    climate: 'Tropical',
    currency: 'IDR',
    language: 'Indonesian',
    bestTime: 'April-October',
    costLevel: 'budget',
    vibe: 'Beach, spiritual, adventure',
    attractions: ['Ubud Rice Terraces', 'Tanah Lot Temple', 'Mount Batur', 'Seminyak Beach'],
    topActivities: ['Surfing', 'Yoga', 'Hiking', 'Temple visits', 'Spa'],
    avgCost: 40,
    population: 4200000,
    rating: 4.6,
  },
  {
    id: 'cairo-eg',
    name: 'Cairo',
    country: 'Egypt',
    description: 'Ancient history comes alive in Egypt\'s capital. Explore the Great Pyramids, the Egyptian Museum, and vibrant local bazaars.',
    imageUrl: 'https://images.unsplash.com/photo-1504279087293-37898f1205fb?w=800&h=600&fit=crop',
    climate: 'Desert',
    currency: 'EGP',
    language: 'Arabic',
    bestTime: 'October-April',
    costLevel: 'budget',
    vibe: 'Historical, cultural, bustling',
    attractions: ['Great Pyramids of Giza', 'Egyptian Museum', 'Khan El-Khalili Bazaar', 'Citadel of Saladin'],
    topActivities: ['History tours', 'Museum visits', 'Nile cruises', 'Bazaar shopping'],
    avgCost: 35,
    population: 21750000,
    rating: 4.4,
  },
  {
    id: 'barcelona-es',
    name: 'Barcelona',
    country: 'Spain',
    description: 'Mediterranean charm meets modern art and architecture. Enjoy beautiful beaches, Gaudí\'s masterpieces, and vibrant nightlife.',
    imageUrl: 'https://images.unsplash.com/photo-1583433971848-f173ec11b338?w=800&h=600&fit=crop',
    climate: 'Mediterranean',
    currency: 'EUR',
    language: 'Spanish, Catalan',
    bestTime: 'April-May, September-October',
    costLevel: 'mid',
    vibe: 'Artistic, coastal, vibrant',
    attractions: ['Sagrada Familia', 'Park Güell', 'Gothic Quarter', 'Las Ramblas'],
    topActivities: ['Beach days', 'Architecture tours', 'Tapas hopping', 'Flamenco shows'],
    avgCost: 70,
    population: 5585000,
    rating: 4.5,
  },
  {
    id: 'iceland-is',
    name: 'Iceland',
    country: 'Iceland',
    description: 'Land of fire and ice. Experience dramatic waterfalls, glaciers, hot springs, and the magical Northern Lights.',
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop',
    climate: 'Subarctic',
    currency: 'ISK',
    language: 'Icelandic',
    bestTime: 'June-August (summer), September-March (Northern Lights)',
    costLevel: 'luxury',
    vibe: 'Adventure, natural wonders, peaceful',
    attractions: ['Golden Circle', 'Blue Lagoon', 'Jökulsárlón Glacier Lagoon', 'Skógafoss Waterfall'],
    topActivities: ['Hiking', 'Glacial tours', 'Spa visits', 'Northern Lights hunting'],
    avgCost: 150,
    population: 376000,
    rating: 4.8,
  },
  {
    id: 'marrakech-ma',
    name: 'Marrakech',
    country: 'Morocco',
    description: 'Ancient medinas, stunning palaces, and Sahara desert adventures. A sensory journey through North African culture.',
    imageUrl: 'https://images.unsplash.com/photo-1578194494903-fbf9e1e0fb96?w=800&h=600&fit=crop',
    climate: 'Desert',
    currency: 'MAD',
    language: 'Arabic, French',
    bestTime: 'October-April',
    costLevel: 'budget',
    vibe: 'Cultural, exotic, spiritual',
    attractions: ['Jemaa el-Fnaa', 'Koutoubia Mosque', 'Majorelle Garden', 'Bahia Palace'],
    topActivities: ['Desert safaris', 'Hammam visits', 'Medina exploration', 'Atlas Mountains trekking'],
    avgCost: 45,
    population: 928850,
    rating: 4.5,
  },
  {
    id: 'dubai-ae',
    name: 'Dubai',
    country: 'United Arab Emirates',
    description: 'Ultra-modern desert city with luxury shopping, iconic skyscrapers, and Middle Eastern culture. A blend of old and new.',
    imageUrl: 'https://images.unsplash.com/photo-1512453475245-a11a4ad748b5?w=800&h=600&fit=crop',
    climate: 'Desert',
    currency: 'AED',
    language: 'Arabic, English',
    bestTime: 'November-March',
    costLevel: 'luxury',
    vibe: 'Modern, luxurious, cosmopolitan',
    attractions: ['Burj Khalifa', 'Dubai Mall', 'Palm Jumeirah', 'Gold Souk'],
    topActivities: ['Shopping', 'Desert safaris', 'Skyscraper viewing', 'Luxury dining'],
    avgCost: 120,
    population: 3600000,
    rating: 4.3,
  },
  {
    id: 'bangkok-th',
    name: 'Bangkok',
    country: 'Thailand',
    description: 'Bustling capital with ornate temples, vibrant night markets, and delicious street food. A gateway to Southeast Asian adventure.',
    imageUrl: 'https://images.unsplash.com/photo-1508701115892-10de95ef96f3?w=800&h=600&fit=crop',
    climate: 'Tropical',
    currency: 'THB',
    language: 'Thai',
    bestTime: 'November-February',
    costLevel: 'budget',
    vibe: 'Energetic, spiritual, culinary',
    attractions: ['Grand Palace', 'Wat Arun', 'Chatuchak Market', 'Floating Markets'],
    topActivities: ['Temple tours', 'Street food tasting', 'Market hopping', 'Muay Thai'],
    avgCost: 35,
    population: 10556000,
    rating: 4.5,
  },
  {
    id: 'paris-fr',
    name: 'Paris',
    country: 'France',
    description: 'The City of Light. Romance, art, world-class museums, charming cafés, and iconic landmarks define this timeless destination.',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
    climate: 'Temperate',
    currency: 'EUR',
    language: 'French',
    bestTime: 'April-May, September-October',
    costLevel: 'mid',
    vibe: 'Romantic, artistic, elegant',
    attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Arc de Triomphe'],
    topActivities: ['Museum visits', 'River cruises', 'Café hopping', 'Monument touring'],
    avgCost: 85,
    population: 2165000,
    rating: 4.6,
  },
  {
    id: 'reykjavik-is',
    name: 'Reykjavik',
    country: 'Iceland',
    description: 'Colorful capital with cozy cafés, vibrant nightlife, and easy access to Iceland\'s natural wonders. Compact and walkable.',
    imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
    climate: 'Subarctic',
    currency: 'ISK',
    language: 'Icelandic',
    bestTime: 'June-August',
    costLevel: 'luxury',
    vibe: 'Cozy, vibrant, gateway',
    attractions: ['Hallgrímskirkja Church', 'Old Harbor', 'Hot springs nearby', 'Local museums'],
    topActivities: ['Café hopping', 'Bar hopping', 'Golden Circle tours', 'Geothermal bathing'],
    avgCost: 130,
    population: 131000,
    rating: 4.4,
  },
  {
    id: 'chiang-mai-th',
    name: 'Chiang Mai',
    country: 'Thailand',
    description: 'Northern Thailand\'s cultural heart. Ancient temples, night bazaars, and a more relaxed pace await in this enchanting city.',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    climate: 'Tropical',
    currency: 'THB',
    language: 'Thai',
    bestTime: 'November-February',
    costLevel: 'budget',
    vibe: 'Spiritual, cultural, relaxed',
    attractions: ['Wat Phra Singh', 'Sunday Night Market', 'Elephant sanctuaries', 'Old City'],
    topActivities: ['Temple tours', 'Cooking classes', 'Elephant interactions', 'Night bazaar shopping'],
    avgCost: 25,
    population: 1009000,
    rating: 4.6,
  },
  {
    id: 'buenos-aires-ar',
    name: 'Buenos Aires',
    country: 'Argentina',
    description: 'The "Paris of South America" offers tango, steaks, wine, and European-style architecture. Sophisticated and passionate.',
    imageUrl: 'https://images.unsplash.com/photo-1604680620869-0453ab5f2c54?w=800&h=600&fit=crop',
    climate: 'Temperate',
    currency: 'ARS',
    language: 'Spanish',
    bestTime: 'September-November, March-May',
    costLevel: 'mid',
    vibe: 'Romantic, artistic, sophisticated',
    attractions: ['Tango shows', 'La Boca neighborhood', 'Teatro Colón', 'San Telmo Market'],
    topActivities: ['Tango dancing', 'Wine tasting', 'Steak dining', 'Neighborhood exploration'],
    avgCost: 50,
    population: 14700000,
    rating: 4.5,
  },
  {
    id: 'lisbon-pt',
    name: 'Lisbon',
    country: 'Portugal',
    description: 'Hillside capital with colorful tiles, historic trams, fresh seafood, and golden light. Charming, affordable, and welcoming.',
    imageUrl: 'https://images.unsplash.com/photo-1518603500266-34fad982fa71?w=800&h=600&fit=crop',
    climate: 'Mediterranean',
    currency: 'EUR',
    language: 'Portuguese',
    bestTime: 'April-May, September-October',
    costLevel: 'budget',
    vibe: 'Charming, artistic, vibrant',
    attractions: ['Belém Tower', 'Jerónimos Monastery', 'Castelo de São Jorge', 'Tram 28'],
    topActivities: ['Tram rides', 'Pastry tasting', 'Neighborhood hopping', 'Museum visits'],
    avgCost: 55,
    population: 505000,
    rating: 4.6,
  },
]

// Helper functions
export function getDestinationsByBudget(budget: 'budget' | 'mid' | 'luxury'): Destination[] {
  return REAL_DESTINATIONS.filter((d) => d.costLevel === budget)
}

export function getDestinationsByClimate(climate: string): Destination[] {
  return REAL_DESTINATIONS.filter((d) => d.climate.toLowerCase().includes(climate.toLowerCase()))
}

export function getDestinationsByVibe(vibe: string): Destination[] {
  return REAL_DESTINATIONS.filter(
    (d) => d.vibe.toLowerCase().includes(vibe.toLowerCase()) || d.attractions.some((a) => a.toLowerCase().includes(vibe.toLowerCase()))
  )
}

export function getRandomDestinations(count: number = 3): Destination[] {
  const shuffled = [...REAL_DESTINATIONS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, REAL_DESTINATIONS.length))
}

// AI-generated destination functions
let aiGeneratedCache: Destination[] = []
let cacheTimestamp: number = 0
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

export async function getAiGeneratedDestinations(count: number = 3, forceRefresh: boolean = false): Promise<Destination[]> {
  const now = Date.now()
  
  // Return cached results if still valid and not force refreshing
  if (!forceRefresh && aiGeneratedCache.length > 0 && now - cacheTimestamp < CACHE_DURATION) {
    return aiGeneratedCache.slice(0, count)
  }

  try {
    const { generateDestinationData: generateData } = await import('./ai-destination-generator')
    const generated = await generateData(count)
    
    // Update cache
    aiGeneratedCache = generated
    cacheTimestamp = now

    return generated
  } catch (error) {
    console.error('[v0] Failed to generate AI destinations, returning empty:', error)
    return []
  }
}
