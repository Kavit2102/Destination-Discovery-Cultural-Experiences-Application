'use client'

import { Destination } from '@/lib/destination-data'
import { MapPin, DollarSign, Calendar, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { DestinationDetailsModal } from './destination-details-modal'

interface DestinationCardProps {
  destination: Destination
  onSelect?: (destination: Destination) => void
}

const COST_LEVEL_COLORS: Record<string, string> = {
  budget: 'bg-green-100 text-green-800',
  mid: 'bg-blue-100 text-blue-800',
  luxury: 'bg-purple-100 text-purple-800',
}

export function DestinationCard({ destination, onSelect }: DestinationCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  const handleLearnMore = () => {
    setShowDetails(true)
    onSelect?.(destination)
  }

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white border shadow-sm shadow-slate-400">
        <div className="aspect-video overflow-hidden bg-gray-200">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold">{destination.name}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {destination.country}
              </p>
            </div>
            {destination.isAiGenerated && (
              <Badge variant="outline" className="flex items-center gap-1 whitespace-nowrap">
                <Sparkles className="w-3 h-3" />
                AI Pick
              </Badge>
            )}
          </div>

          <p className="text-sm text-gray-700 mb-3 line-clamp-2">{destination.description}</p>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-600">Cost/Day</p>
                <p className="text-sm font-semibold">${destination.avgCost}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-600">Best Time</p>
                <p className="text-xs font-semibold line-clamp-1">{destination.bestTime.split(',')[0]}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className={COST_LEVEL_COLORS[destination.costLevel]}>
              {destination.costLevel === 'budget' ? 'Budget' : destination.costLevel === 'mid' ? 'Mid-Range' : 'Luxury'}
            </Badge>
            {destination.rating && <Badge variant="secondary">{destination.rating} ★</Badge>}
          </div>

          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-1">Vibe:</p>
            <p className="text-sm font-medium">{destination.vibe}</p>
          </div>

          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-1">Top Activities:</p>
            <div className="flex flex-wrap gap-1">
              {destination.topActivities.slice(0, 3).map((activity) => (
                <Badge key={activity} variant="outline" className="text-xs">
                  {activity}
                </Badge>
              ))}
            </div>
          </div>

          <Button onClick={handleLearnMore} className="w-full" size="sm">
            Learn More
          </Button>
        </div>
      </Card>

      <DestinationDetailsModal destination={destination} open={showDetails} onOpenChange={setShowDetails} />
    </>
  )
}
