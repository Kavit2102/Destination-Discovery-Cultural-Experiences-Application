'use client'

import { Destination } from '@/lib/destination-data'
import { DestinationCard } from './destination-card'

interface DestinationGridProps {
  destinations: Destination[]
  onSelectDestination?: (destination: Destination) => void
}

export function DestinationGrid({ destinations, onSelectDestination }: DestinationGridProps) {
  if (destinations.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-gray-600 text-lg">No destinations found. Try a different search!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          onSelect={onSelectDestination}
        />
      ))}
    </div>
  )
}
