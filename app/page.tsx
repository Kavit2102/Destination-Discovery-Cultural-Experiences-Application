'use client'

import { DestinationGrid } from '@/components/destination-grid'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { REAL_DESTINATIONS } from '@/lib/destination-data'
import { useRouter } from 'next/navigation'
import { Compass, MapPin, Zap } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  // Use first 6 destinations to avoid hydration mismatch with random selection
  const featuredDestinations = REAL_DESTINATIONS.slice(0, 6)

  const handleStartDiscovery = () => {
    router.push('/discover')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-x-hidden">


      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-900">AI-Powered Travel Discovery</Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Your Next
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Adventure</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Chat with our AI travel advisor to find the perfect destination tailored to your budget, interests, and travel style. Explore both popular hotspots and hidden gems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button onClick={handleStartDiscovery} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              <Zap className="w-4 h-4 mr-2" />
              Start AI Discovery
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Browse Popular Destinations
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <p className="text-sm font-semibold text-gray-600 mb-4">Looking for something specific?</p>
            <div className="flex flex-wrap gap-3 justify-center text-slate-900">
              <Badge variant="ghost" className="cursor-pointer hover:bg-blue-50 px-4 py-2">
                🏖️ Beach Paradise
              </Badge>
              <Badge variant="ghost" className="cursor-pointer hover:bg-blue-50 px-4 py-2">
                ⛰️ Mountain Adventure
              </Badge>
              <Badge variant="ghost" className="cursor-pointer hover:bg-blue-50 px-4 py-2">
                🏛️ Cultural Immersion
              </Badge>
              <Badge variant="ghost" className="cursor-pointer hover:bg-blue-50 px-4 py-2">
                🌃 Urban Exploration
              </Badge>
              <Badge variant="ghost" className="cursor-pointer hover:bg-blue-50 px-4 py-2">
                💰 Budget-Friendly
              </Badge>
              <Badge variant="ghost" className="cursor-pointer hover:bg-blue-50 px-4 py-2">
                👑 Luxury Getaway
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <p className="text-sm font-semibold text-blue-600 uppercase">INSPIRATION</p>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Featured Destinations</h2>
            <p className="text-gray-600 max-w-2xl">
              Explore a handpicked selection of incredible destinations from around the world. Click on any destination to learn more about what makes it special.
            </p>
          </div>

          <DestinationGrid destinations={featuredDestinations} />

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Want personalized recommendations?</p>
            <Button onClick={handleStartDiscovery} size="lg" className="bg-blue-600 hover:bg-blue-700">
              Chat with Our AI Advisor
            </Button>
          </div>
        </div>
      </section>

      {/* All Destinations Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore All Destinations</h2>
          <DestinationGrid destinations={REAL_DESTINATIONS} />
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mx-4 my-8 sm:m-8">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-blue-100 mb-8 text-lg">
            Let our AI travel advisor help you find the perfect destination that matches your dreams and budget.
          </p>
          <Button
            onClick={handleStartDiscovery}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Discover Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Discover</a></li>
                <li><a href="#" className="hover:text-gray-900">Destinations</a></li>
                <li><a href="#" className="hover:text-gray-900">Guides</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Follow</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Twitter</a></li>
                <li><a href="#" className="hover:text-gray-900">Instagram</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <Compass className="w-5 h-5 text-blue-600" />
              <p className="font-semibold text-gray-900">Wanderlust Explorer</p>
            </div>
            <p className="text-sm text-gray-600">© 2024 Wanderlust Explorer. Powered by AI.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
