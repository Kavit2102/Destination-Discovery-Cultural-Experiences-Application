'use client'

import { Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleStartDiscovery = () => {
    router.push('/discover')
  }

  return (
    <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity group">
          <Compass className="w-6 h-6 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xl font-semibold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">roam</span>
            <span className="text-gray-800">ly</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {pathname !== '/discover' && (
            <Button onClick={handleStartDiscovery} variant="default">
              Start Discovering
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
