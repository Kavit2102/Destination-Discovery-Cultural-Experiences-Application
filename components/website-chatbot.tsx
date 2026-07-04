'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChatMessage } from '@/lib/ai-config'
import { MessageCircle, X, Send, Loader2, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content:
    "Hey! I'm roamly's site helper 👋 Ask me anything about how this website works — features, pages, or where to find stuff. For actual trip ideas, hit up the AI advisor on the Discover page!",
}

export function WebsiteChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const messagesRef = useRef(messages)

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const handleSendMessage = async () => {
    const userMessage = input.trim()
    if (!userMessage || isLoading) return

    const newMessages: ChatMessage[] = [
      ...messagesRef.current,
      { role: 'user', content: userMessage },
    ]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/website-chat', {
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

          assistantMessage += decoder.decode(value)

          setMessages((prev) => {
            const updated = [...prev]
            const lastMsg = updated[updated.length - 1]
            if (lastMsg?.role === 'assistant' && updated.length > newMessages.length) {
              lastMsg.content = assistantMessage
            } else {
              updated.push({ role: 'assistant', content: assistantMessage })
            }
            return updated
          })
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Oops, something went wrong on my end. Try again in a sec!",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div
        className={cn(
          'w-[min(100vw-3rem,380px)] origin-bottom-right transition-all duration-300 ease-out',
          isOpen
            ? 'scale-100 opacity-100 pointer-events-auto'
            : 'scale-95 opacity-0 pointer-events-none h-0 overflow-hidden'
        )}
      >
        <div className="flex flex-col h-[min(70vh,520px)] rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-blue-900/10 overflow-hidden">
          <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <HelpCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">Site Helper</p>
                <p className="text-xs text-blue-100">Ask about roamly</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-slate-50 to-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'rounded-br-md bg-blue-600 text-white'
                      : 'rounded-bl-md bg-white text-gray-800 border border-gray-100 shadow-sm'
                  )}
                >
                  <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-gray-100 bg-white px-3.5 py-2.5 text-sm text-gray-600 shadow-sm">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Typing...</span>
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>

          <div className="border-t border-gray-100 bg-white p-3">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="How does this site work?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1 text-slate-900 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="shrink-0 bg-blue-600 hover:bg-blue-700"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-gray-400">
              Website help only — not travel advice
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        size="lg"
        className={cn(
          'h-14 w-14 rounded-full shadow-lg shadow-blue-600/30 transition-transform hover:scale-105',
          isOpen ? 'bg-gray-800 hover:bg-gray-900' : 'bg-blue-600 hover:bg-blue-700'
        )}
        aria-label={isOpen ? 'Close site helper' : 'Open site helper'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  )
}
