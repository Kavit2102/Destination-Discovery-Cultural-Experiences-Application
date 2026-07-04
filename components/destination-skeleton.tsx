export function DestinationSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg animate-pulse h-96">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-4 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-8 bg-gray-200 rounded flex-1" />
          <div className="h-8 bg-gray-200 rounded flex-1" />
        </div>
      </div>
    </div>
  )
}

export function DestinationsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <DestinationSkeleton key={i} />
      ))}
    </div>
  )
}
