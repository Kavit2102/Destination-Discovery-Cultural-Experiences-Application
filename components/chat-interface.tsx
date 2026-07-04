'use client'

import { ChatMessage } from '@/lib/ai-config'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Loader2 } from 'lucide-react'
import { useRef, useEffect } from 'react'
import Markdown from 'react-markdown'

interface ChatInterfaceProps {
  messages: ChatMessage[]
  input: string
  onInputChange: (value: string) => void
  onSendMessage: () => void
  isLoading: boolean
}

export function ChatInterface({ messages, input, onInputChange, onSendMessage, isLoading }: ChatInterfaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (input.trim()) {
      onSendMessage()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Don't submit if composing (for CJK IME support)
    if (e.nativeEvent.isComposing) return

    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full max-h-[570px] bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {messages?.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <div className="text-4xl mb-3">✈️</div>
              <p className="font-semibold text-gray-800">Start Your Journey</p>
              <p className="text-sm text-gray-600 mt-2">Tell me about your ideal destination and I&apos;ll help you find it!</p>
            </div>
          )}

          {messages?.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg?.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">{msg?.content}</p>
              </div>
            </div>
          ))}

          {isLoading && messages?.length !== 0 && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg rounded-bl-none">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-lg">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Ask me about destinations, budget, climate..."
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 text-slate-900"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Press Enter to send your message</p>
      </div>
    </div>
  )
}
