import { generateText } from 'ai'
import { AI_MODEL } from './ai-config'
import { Destination } from './destination-data'

const DESTINATION_GENERATION_PROMPT = `You are an expert travel guide AI. Generate unique and interesting cultural destination data.

For each destination, provide information in this exact JSON format:
{
  "name": "destination name",
  "country": "country name",
  "description": "2-3 sentence engaging description highlighting cultural experiences",
  "climate": "climate type (e.g., Tropical, Mediterranean, Temperate, Desert, Subarctic)",
  "currency": "currency code",
  "language": "primary language(s)",
  "bestTime": "best time to visit with months",
  "costLevel": "budget, mid, or luxury",
  "vibe": "2-3 words describing the atmosphere",
  "attractions": ["attraction1", "attraction2", "attraction3", "attraction4"],
  "topActivities": ["activity1", "activity2", "activity3", "activity4", "activity5"],
  "avgCost": daily average cost in USD,
  "population": approximate city/area population,
  "rating": rating between 4.0 and 5.0,
  "imagePrompt": "detailed visual description for image generation (landscape, architecture, people, culture, mood)"
}

Generate ONLY valid JSON, no other text.`

export async function generateDestinationData(count: number = 5): Promise<Destination[]> {
  try {
    const text = await generateText({
      model: AI_MODEL,
      system: DESTINATION_GENERATION_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Generate ${count} unique and culturally diverse destinations that offer authentic cultural experiences. Include mix of well-known and lesser-known destinations. Return as valid JSON array.`,
        },
      ],
      temperature: 0.8,
    })

    // Parse the JSON response
    const jsonMatch = text.text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      console.error('[v0] Failed to extract JSON from response:', text.text)
      return []
    }

    const destinationsData = JSON.parse(jsonMatch[0])
    if (!Array.isArray(destinationsData)) {
      console.error('[v0] Response is not an array')
      return []
    }

    // Transform to Destination objects with AI-generated images
    const destinations: Destination[] = await Promise.all(
      destinationsData.slice(0, count).map(async (data: any, index: number) => {
        const imageUrl = await generateDestinationImage(data.imagePrompt || data.name, index)

        return {
          id: `ai-${Date.now()}-${index}`,
          name: data.name,
          country: data.country,
          description: data.description,
          imageUrl: imageUrl,
          climate: data.climate,
          currency: data.currency,
          language: data.language,
          bestTime: data.bestTime,
          costLevel: (data.costLevel || 'mid') as 'budget' | 'mid' | 'luxury',
          vibe: data.vibe,
          attractions: Array.isArray(data.attractions) ? data.attractions : [],
          topActivities: Array.isArray(data.topActivities) ? data.topActivities : [],
          avgCost: data.avgCost || 50,
          population: data.population || 0,
          rating: data.rating || 4.5,
          isAiGenerated: true,
        }
      })
    )

    return destinations
  } catch (error) {
    console.error('[v0] Error generating destination data:', error)
    return []
  }
}

export async function generateDestinationImage(
  prompt: string,
  seed: number = 0
): Promise<string> {
  try {
    // Use Unsplash as a placeholder image service based on the destination
    // In production, you could use Fal.ai or another image generation service
    const searchQuery = extractSearchTerms(prompt)

    // Return Unsplash API URL for the destination
    return `https://source.unsplash.com/800x600/?${searchQuery}&random=${seed}`
  } catch (error) {
    console.error('[v0] Error generating destination image:', error)
    // Fallback image
    return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop'
  }
}

function extractSearchTerms(prompt: string): string {
  // Extract key terms from the image prompt for Unsplash search
  const terms = prompt
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 3 && !['the', 'and', 'with', 'for', 'from'].includes(word))
    .slice(0, 3)
    .join(',')

  return terms || 'travel,destination,culture'
}

// Alternative function for high-quality image generation using Fal.ai
export async function generateDestinationImageFal(
  prompt: string,
  destinationName: string
): Promise<string> {
  try {
    // This would use Fal.ai for actual image generation
    // Requires FAL_KEY environment variable
    const response = await fetch('https://api.fal.ai/queue/submit/fast-flux-dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Key ${process.env.FAL_KEY}`,
      },
      body: JSON.stringify({
        prompt: `A stunning photograph of ${prompt}. Professional travel photography, vibrant colors, cultural elements, authentic atmosphere.`,
        num_images: 1,
        image_size: 'landscape_16_9',
      }),
    })

    if (!response.ok) {
      throw new Error(`Fal.ai API error: ${response.statusText}`)
    }

    const result = await response.json()
    if (result.images && result.images.length > 0) {
      return result.images[0].url
    }

    // Fallback to Unsplash if Fal.ai fails
    return generateDestinationImage(prompt)
  } catch (error) {
    console.error('[v0] Error with Fal.ai image generation:', error)
    return generateDestinationImage(prompt)
  }
}
