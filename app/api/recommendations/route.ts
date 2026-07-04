import { generateText } from 'ai'
import { AI_MODEL, parseDestinationSuggestions, ChatMessage } from '@/lib/ai-config'
import { REAL_DESTINATIONS, Destination } from '@/lib/destination-data'

export const runtime = 'nodejs'

const RECOMMENDATIONS_SYSTEM_PROMPT = `You are an expert travel advisor. Based on the user's preferences from the conversation, suggest 3-5 destinations that would be perfect for them.

When suggesting destinations, format them clearly:
[DESTINATION: Name, Country | Best for: [reasons matching their preferences] | Key attractions: [attraction1, attraction2, attraction3]]

Be specific about why each destination matches their needs. Mix popular destinations with potentially lesser-known gems.`

export async function POST(req: Request) {
  const { messages, count = 4 } = await req.json() as { 
    messages: ChatMessage[]
    count?: number 
  }

  if (!messages || !Array.isArray(messages)) {
    return new Response('Invalid messages', { status: 400 })
  }

  try {
    // Generate recommendations from AI
    const text = await generateText({
      model: AI_MODEL,
      system: RECOMMENDATIONS_SYSTEM_PROMPT,
      messages: [
        ...messages,
        {
          role: 'user' as const,
          content: `Based on our conversation, please suggest ${Math.min(count, 5)} destinations that would be perfect for me. Mix real popular destinations with hidden gems.`,
        },
      ],
      temperature: 0.8,
    })

    // Parse destination suggestions from response
    const suggestions = parseDestinationSuggestions(text.text)

    // Try to match suggestions with real destinations first
    const recommendations: Destination[] = []

    for (const suggestion of suggestions) {
      // Find matching real destination
      const realMatch = REAL_DESTINATIONS.find(
        (d) => d.name.toLowerCase() === suggestion.name.toLowerCase() || 
               d.country.toLowerCase() === suggestion.country.toLowerCase()
      )

      if (realMatch) {
        recommendations.push(realMatch)
      } else {
        // Create AI-generated destination if no match
        recommendations.push({
          id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: suggestion.name,
          country: suggestion.country,
          description: suggestion.reason,
          imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
          climate: 'Varies',
          currency: 'N/A',
          language: 'N/A',
          bestTime: 'Year-round',
          costLevel: 'mid' as const,
          vibe: 'Adventure',
          attractions: suggestion.attractions || ['Local attractions', 'Cultural sites'],
          topActivities: suggestion.attractions || ['Exploring', 'Experiencing local culture'],
          avgCost: 60,
          population: 0,
          isAiGenerated: true,
        })
      }
    }

    // Get additional random real destinations to reach desired count
    while (recommendations.length < count) {
      const random = REAL_DESTINATIONS[Math.floor(Math.random() * REAL_DESTINATIONS.length)]
      if (!recommendations.find((r) => r.id === random.id)) {
        recommendations.push(random)
      }
    }

    return Response.json({
      destinations: recommendations.slice(0, count),
      aiResponse: text.text,
    })
  } catch (error) {
    console.error('[v0] Recommendations API error:', error)
    return new Response('Failed to generate recommendations', { status: 500 })
  }
}
