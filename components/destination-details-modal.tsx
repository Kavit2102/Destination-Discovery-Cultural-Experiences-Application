'use client'

import { Destination } from '@/lib/destination-data'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { MapPin, Users, DollarSign, Globe, Languages } from 'lucide-react'

interface DestinationDetailsModalProps {
  destination: Destination
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DestinationDetailsModal({ destination, open, onOpenChange }: DestinationDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <div className="aspect-video overflow-hidden rounded-lg mb-4 -mx-6 -mt-6">
          <img src={destination.imageUrl} alt={destination.name} className="w-full h-full object-cover" />
        </div>

        <DialogHeader>
          <DialogTitle className="text-3xl">{destination.name}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-lg">
            <MapPin className="w-4 h-4" />
            {destination.country}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            <div>
              <p className="text-gray-700">{destination.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Cost Information
                </h4>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-gray-600">Daily Budget:</span> ${destination.avgCost}
                  </p>
                  <p>
                    <span className="text-gray-600">Level:</span>{' '}
                    {destination.costLevel === 'budget'
                      ? 'Budget'
                      : destination.costLevel === 'mid'
                        ? 'Mid-Range'
                        : 'Luxury'}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Quick Facts
                </h4>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-gray-600">Climate:</span> {destination.climate}
                  </p>
                  <p>
                    <span className="text-gray-600">Currency:</span> {destination.currency}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Languages className="w-4 h-4" />
                Language
              </h4>
              <p className="text-sm">{destination.language}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Best Time to Visit</h4>
              <p className="text-sm">{destination.bestTime}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Population
              </h4>
              <p className="text-sm">{(destination.population / 1000000).toFixed(2)}M people</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Main Attractions</h4>
              <div className="space-y-2">
                {destination.attractions.map((attraction) => (
                  <p key={attraction} className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {attraction}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Top Activities</h4>
              <div className="flex flex-wrap gap-2">
                {destination.topActivities.map((activity) => (
                  <Badge key={activity}>{activity}</Badge>
                ))}
              </div>
            </div>

            {destination.rating && (
              <div className="pt-2 border-t">
                <p className="text-sm font-semibold">Rating: {destination.rating} ★</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
