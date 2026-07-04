'use client'

import dynamic from 'next/dynamic'

const WebsiteChatbot = dynamic(
  () => import('@/components/website-chatbot').then((mod) => mod.WebsiteChatbot),
  { ssr: false }
)

export function WebsiteChatbotLoader() {
  return <WebsiteChatbot />
}
