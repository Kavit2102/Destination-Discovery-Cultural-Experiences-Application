'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChatInterface } from '@/components/chat-interface'
import { DestinationGrid } from '@/components/destination-grid'
import { Button } from '@/components/ui/button'
import { ChatMessage } from '@/lib/ai-config'
import { Destination } from '@/lib/destination-data'
import { ArrowLeft, Loader2 } from 'lucide-react'

export default function DiscoverPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const messagesRef = useRef(messages)
  const initialLoadRef = useRef(false)

  // Keep track of messages ref for API calls
  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  // Load initial recommendations on mount
  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true
      loadInitialRecommendations()
    }
  }, [])

  const loadInitialRecommendations = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: 'Show me some popular and diverse destinations to explore.',
            },
          ],
          count: 6,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setDestinations(data.destinations)
      }
    } catch (error) {
      console.error('[v0] Failed to load initial recommendations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async () => {
    const userMessage = input.trim()
    if (!userMessage) return

    // Add user message to chat
    const newMessages: ChatMessage[] = [...messagesRef.current, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      // Call chat API for streaming response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!response.ok) throw new Error('Chat request failed')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          assistantMessage += chunk

          // Update messages with streaming response
          setMessages((prev) => {
            const updated = [...prev]
            const lastMsg = updated[updated.length - 1]
            if (lastMsg && lastMsg.role === 'assistant') {
              lastMsg.content = assistantMessage
            } else {
              updated.push({ role: 'assistant', content: assistantMessage })
            }
            return updated
          })
        }
      }

      // After chat response, fetch relevant destinations
      const recommendationsResponse = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...newMessages, { role: 'assistant', content: assistantMessage }],
          count: 6,
        }),
      })

      if (recommendationsResponse.ok) {
        const data = await recommendationsResponse.json()
        setDestinations(data.destinations)
      }
    } catch (error) {
      console.error('[v0] Error:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Sorry, I encountered an error processing your request. Please try again or check if you've configured your API key.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/')}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Discover Your Destination</h1>
              <p className="text-sm text-gray-600">Chat with our AI advisor to find the perfect place</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[calc(100vh-200px)]">
          {/* Chat Panel */}
          <div className="lg:col-span-1 h-[500px] lg:h-full">
            <ChatInterface
              messages={messages}
              input={input}
              onInputChange={setInput}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>

          {/* Destinations Panel */}
          <div className="lg:col-span-2 min-h-96 lg:min-h-full overflow-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Suggested Destinations</h2>
                <p className="text-sm text-gray-600">
                  {destinations.length > 0
                    ? 'Click on any destination to learn more'
                    : 'Start chatting to get personalized recommendations'}
                </p>
              </div>

              {isLoading && destinations.length === 0 ? (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading amazing destinations...</p>
                  </div>
                </div>
              ) : (
                <DestinationGrid destinations={destinations} onSelectDestination={setSelectedDestination} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
