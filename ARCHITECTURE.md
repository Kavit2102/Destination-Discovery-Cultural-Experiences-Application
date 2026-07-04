# AI Destination Generator - Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         ROAMLY APP                              │
│                                                                  │
│  ┌──────────────────┐         ┌────────────────────┐           │
│  │  Discover Page   │────────▶│  Chat Interface    │           │
│  │  (/discover)     │         │  (User Input)      │           │
│  └──────────────────┘         └────────────────────┘           │
│           │                                                      │
│           │ "Show me beach destinations"                        │
│           ▼                                                      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │            API Recommendations Route                     │   │
│  │         (/api/recommendations)                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│           │                                                      │
│           ├─▶ Parse user preferences                           │
│           │                                                      │
│           ├─▶ Search REAL_DESTINATIONS (13 hardcoded)          │
│           │   └─ Match against user's preferences              │
│           │                                                      │
│           └─▶ If more needed: getAiGeneratedDestinations()    │
│               │                                                  │
│               ├─ Check 30-min cache                            │
│               │                                                  │
│               └─ If cache miss:                                │
│                  │                                              │
│                  ▼                                              │
│           ┌─────────────────────────────┐                      │
│           │ generateDestinationData()   │                      │
│           │ (AI_DESTINATION_GENERATOR)  │                      │
│           └─────────────────────────────┘                      │
│                  │                                              │
│                  ▼                                              │
│         ┌───────────────────────┐                              │
│         │  OpenAI API Call      │                              │
│         │  gpt-4-turbo          │                              │
│         │  (Generate JSON)      │                              │
│         └───────────────────────┘                              │
│                  │                                              │
│                  ├─ Name, Country                              │
│                  ├─ Description (2-3 sentences)               │
│                  ├─ Climate, Currency, Language              │
│                  ├─ Best Time, Cost Level                    │
│                  ├─ Vibe, Attractions, Activities            │
│                  ├─ Avg Cost, Population, Rating             │
│                  └─ Image Prompt                             │
│                  │                                              │
│                  ▼                                              │
│         ┌──────────────────────────────────┐                  │
│         │  generateDestinationImage()      │                  │
│         │  (Image Generation Strategy)     │                  │
│         └──────────────────────────────────┘                  │
│           │                    │                               │
│           ├─▶ Default: Unsplash│                              │
│           │   (No API key)     │                              │
│           │   ▼                │                              │
│           │   https://source   │                              │
│           │   .unsplash.com/   │                              │
│           │   ?search_terms    │                              │
│           │                    │                              │
│           └─▶ Optional: Fal.ai │                              │
│               (AI images)      │                              │
│               (requires FAL_KEY)                              │
│                                │                               │
│                                ▼                              │
│                         Image URL                            │
│                                │                              │
│  ┌────────────────────────────┼──────────────────────────┐   │
│  │ Destination Object (Complete) with Image             │   │
│  │  {                                                    │   │
│  │    id, name, country, description,                 │   │
│  │    imageUrl, climate, currency, language,          │   │
│  │    bestTime, costLevel, vibe,                      │   │
│  │    attractions[], topActivities[],                 │   │
│  │    avgCost, population, rating,                    │   │
│  │    isAiGenerated: true                            │   │
│  │  }                                                    │   │
│  └────────────────────────────┬──────────────────────────┘   │
│                               │                               │
│                               ▼                              │
│                    ┌──────────────────┐                      │
│                    │ Cache Storage    │                      │
│                    │ (30 min TTL)     │                      │
│                    └──────────────────┘                      │
│                               │                               │
│                               ▼                              │
│                    Return to Frontend                        │
│                    (3-6 destinations)                        │
│                               │                              │
│  ┌────────────────────────────┴───────────────────────────┐  │
│  │       Destination Grid Component                      │  │
│  │  Shows cards with images, details, ratings           │  │
│  │  Click "Learn More" for full details                 │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

### Successful Path (Happy Path)

```
User Input
   │
   ▼
Parse Preferences
   │
   ├─ "Show me beach destinations for $50/day"
   │
   ▼
Search REAL_DESTINATIONS
   │
   ├─ Found: "Bali" (Indonesia) ✓
   ├─ Found: "Bangkok" (Thailand) ✓
   │
   ▼
Need More? (count=4, found=2)
   │
   ├─ Yes, need 2 more
   │
   ▼
getAiGeneratedDestinations(2)
   │
   ├─ Check cache
   │ └─ Miss! (first request or expired)
   │
   ▼
generateDestinationData(2)
   │
   ▼
OpenAI generates:
   │
   ├─ "Koh Samui, Thailand"
   │  └─ Budget beach paradise, great for budget travelers
   │
   ├─ "Palawan, Philippines"
   │  └─ Island hopping paradise, limestone cliffs, excellent value
   │
   ▼
generateDestinationImage() for each
   │
   ├─ "Koh Samui" → Unsplash search → beautiful beach image
   ├─ "Palawan"   → Unsplash search → limestone cliffs image
   │
   ▼
Return 4 complete destinations
   │
   ├─ 2 Real (Bali, Bangkok)
   ├─ 2 AI Generated (Koh Samui, Palawan)
   │
   ▼
Cache results (30 min)
   │
   ▼
Frontend displays destinations
```

### Error Path (Fallback)

```
generateDestinationData() called
   │
   ▼
OpenAI API Error?
   │
   ├─ Key missing
   ├─ Rate limited
   ├─ Network error
   ├─ Invalid response
   │
   ▼
Return empty array []
   │
   ▼
Recommendations API catches error
   │
   ▼
Fill remaining slots with REAL_DESTINATIONS
   │
   ├─ Randomly select from 13 real destinations
   │
   ▼
Return mix of real + real destinations
   │
   ▼
Frontend displays successfully
   │
   └─ User doesn't notice the error! ✓
```

## Component Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                  Files & Dependencies                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  app/api/recommendations/route.ts                          │
│      │                                                      │
│      ├─▶ imports { getAiGeneratedDestinations }            │
│      │        from 'lib/destination-data'                  │
│      │                                                      │
│      └─▶ imports { REAL_DESTINATIONS }                     │
│             from 'lib/destination-data'                    │
│                                                              │
│  lib/destination-data.ts                                    │
│      │                                                      │
│      ├─ exports { REAL_DESTINATIONS }                      │
│      │   (13 hardcoded destinations)                       │
│      │                                                      │
│      ├─ exports { getAiGeneratedDestinations() }           │
│      │   (caching wrapper)                                 │
│      │                                                      │
│      └─▶ dynamic import of ai-destination-generator        │
│          (lazy loaded to avoid circular deps)              │
│                                                              │
│  lib/ai-destination-generator.ts                           │
│      │                                                      │
│      ├─ generateDestinationData()                          │
│      │  └─▶ generateText() from 'ai'                       │
│      │     └─▶ OpenAI API                                  │
│      │                                                      │
│      └─ generateDestinationImage()                         │
│         └─▶ fetch() to Unsplash or Fal.ai                 │
│                                                              │
│  lib/ai-config.ts                                           │
│      │                                                      │
│      └─ exports { AI_MODEL }                               │
│         └─ gpt-4-turbo                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Cache Strategy

```
Request comes in
   │
   ▼
getAiGeneratedDestinations(count=4, forceRefresh=false)
   │
   ├─ Check: Is cache valid?
   │  │
   │  ├─ Has cached data? YES
   │  ├─ Within 30 min TTL? YES
   │  ├─ forceRefresh=false? YES
   │  │
   │  ▼
   │  Return cached destinations
   │  (instant response! ⚡)
   │
   └─ Cache invalid/expired
      │
      ▼
      generateDestinationData(count)
      │
      ├─ Wait for OpenAI response (2-5s)
      │
      ▼
      Store in cache with timestamp
      │
      ▼
      Return new destinations
```

## Type Structure

```typescript
// From lib/destination-data.ts
export interface Destination {
  id: string                          // "ai-timestamp-random"
  name: string                        // "Palawan"
  country: string                     // "Philippines"
  description: string                 // 2-3 sentences
  imageUrl: string                    // URL to image
  climate: string                     // "Tropical", "Mediterranean"
  currency: string                    // "PHP"
  language: string                    // "Filipino, English"
  bestTime: string                    // "November-May"
  costLevel: 'budget'|'mid'|'luxury' // Cost category
  vibe: string                        // "Paradise, adventure, peaceful"
  attractions: string[]               // ["El Nido", "Coron", ...]
  topActivities: string[]             // ["Island hopping", ...]
  avgCost: number                     // 45 (USD/day)
  population: number                  // 610000
  rating?: number                     // 4.8
  isAiGenerated?: boolean             // true
}
```

## Performance Characteristics

```
Operation                    Time        Cost
─────────────────────────────────────────────────
Search REAL_DESTINATIONS     <1ms        Free
OpenAI generation            2-5s        ~$0.001
Image URL creation           <100ms      Free
Cache hit                    <1ms        Free
Cache miss → generation      2-6s        ~$0.001

Typical flow:
  1. Parse preferences: 10ms
  2. Search real: <1ms
  3. Generate new (if needed): 2-5s
  4. Total: 2-5s first time, <1ms cached
```

## Environment Variables

```
OPENAI_API_KEY
  ├─ Required for AI generation
  ├─ Source: https://platform.openai.com/api-keys
  └─ Format: sk-...

FAL_KEY (Optional)
  ├─ Optional for better image generation
  ├─ Source: https://fal.ai
  └─ Format: fal_...
```

## Fallback Chain

```
Request arrives
   │
   ▼
Try OpenAI generation
   │
   ├─ Success? → Return AI destinations ✓
   │
   └─ Failure:
      ├─ No API key?
      ├─ Rate limited?
      ├─ Network error?
      │
      ▼
      Use REAL_DESTINATIONS fallback
      │
      ├─ Always 13 destinations available
      │
      ▼
      Return real + real mix
      │
      └─ User experience unaffected ✓
```

---

This architecture ensures **reliability**, **performance**, and **great user experience** while keeping costs low through intelligent caching and smart fallbacks.
