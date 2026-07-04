'use client'

import { useEffect, useState } from 'react'
import type { Destination } from '@/lib/destination-data'
import { DestinationCard } from '@/components/destination-card'
import { DestinationsGridSkeleton } from '@/components/destination-skeleton'

interface HomeContentProps {
  initialDestinations: Destination[]
}

export function HomeContent({ initialDestinations }: HomeContentProps) {
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations)
  const [isLoading, setIsLoading] = useState(false)

  const refreshDestinations = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/destinations?count=6')
      const data = await response.json()
      setDestinations(data.destinations || initialDestinations)
    } catch (error) {
      console.error('[v0] Failed to refresh destinations:', error)
      setDestinations(initialDestinations)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Auto-refresh destinations when component mounts
    const timer = setTimeout(() => {
      refreshDestinations()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-8">
      {/* Featured Destinations Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Featured Destinations</h2>
          <button
            onClick={refreshDestinations}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
        
        {isLoading ? (
          <DestinationsGridSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}
      </div>

      {/* Destinations Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">About These Destinations</h3>
        <p className="text-blue-800">
          These destinations are dynamically generated using AI on every visit, providing you with fresh and diverse travel recommendations. Click the "Refresh" button to discover new places, or visit the Discover page to find destinations matching your travel preferences.
        </p>
      </div>
    </div>
  )
}
