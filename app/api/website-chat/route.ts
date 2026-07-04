import { streamText, createTextStreamResponse } from 'ai'
import { AI_MODEL, WEBSITE_SYSTEM_PROMPT, ChatMessage } from '@/lib/ai-config'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const { messages } = await req.json() as { messages: ChatMessage[] }

  if (!messages || !Array.isArray(messages)) {
    return new Response('Invalid messages', { status: 400 })
  }

  try {
    const result = await streamText({
      model: AI_MODEL,
      system: WEBSITE_SYSTEM_PROMPT,
      messages,
      temperature: 0.3,
    })

    return createTextStreamResponse({
      stream: result.textStream,
    })
  } catch (error) {
    console.error('[roamly] Website chat API error:', error)
    return new Response('Failed to process chat', { status: 500 })
  }
}
