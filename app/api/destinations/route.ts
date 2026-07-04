import { getAiGeneratedDestinations, REAL_DESTINATIONS } from '@/lib/destination-data'

export const runtime = 'nodejs'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const count = parseInt(searchParams.get('count') || '6', 10)
    const useRealOnly = searchParams.get('useRealOnly') === 'true'

    // If requesting real destinations only, return them
    if (useRealOnly) {
      return Response.json({
        destinations: REAL_DESTINATIONS.slice(0, count),
        source: 'real',
      })
    }

    // Try to get AI-generated destinations
    try {
      const aiDestinations = await getAiGeneratedDestinations(count, true)

      if (aiDestinations && aiDestinations.length > 0) {
        return Response.json({
          destinations: aiDestinations,
          source: 'ai-generated',
        })
      }
    } catch (aiError) {
      console.error('[v0] AI generation failed, falling back to real destinations:', aiError)
    }

    // Fallback to real destinations if AI fails
    return Response.json({
      destinations: REAL_DESTINATIONS.slice(0, count),
      source: 'fallback-real',
    })
  } catch (error) {
    console.error('[v0] Destinations API error:', error)
    return new Response('Failed to fetch destinations', { status: 500 })
  }
}
