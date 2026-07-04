import { generateText } from 'ai'
import { AI_MODEL, parseDestinationSuggestions, ChatMessage } from '@/lib/ai-config'
import { REAL_DESTINATIONS, Destination, getAiGeneratedDestinations } from '@/lib/destination-data'

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
          content: `Based on our conversation, please suggest ${Math.min(count, 5)} destinations that would be perfect for me. Include both well-known and hidden gem destinations.`,
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
      }
    }

    // If we need more destinations, generate AI destinations with full details and images
    if (recommendations.length < count) {
      const needed = count - recommendations.length
      try {
        const aiDestinations = await getAiGeneratedDestinations(needed, true)
        recommendations.push(...aiDestinations)
      } catch (error) {
        console.error('[v0] Error getting AI destinations:', error)
        // Fallback to random real destinations
        const remaining = REAL_DESTINATIONS.filter(
          (d) => !recommendations.find((r) => r.id === d.id)
        )
        recommendations.push(
          ...remaining
            .sort(() => Math.random() - 0.5)
            .slice(0, needed)
        )
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
