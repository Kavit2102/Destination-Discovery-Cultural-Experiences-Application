# Wanderlust Explorer - AI-Powered Travel Discovery Platform

A modern web application that helps travelers discover their next perfect destination using AI-powered recommendations and conversational chat.

## Features

🌍 **Hybrid Destination Database**
- Pre-curated collection of 15+ real-world destinations (Cairo, Tokyo, Bali, Paris, etc.)
- AI-generated hidden gem recommendations tailored to user preferences
- Rich destination details including climate, culture, best time to visit, and attractions

💬 **AI-Powered Chat Interface**
- Conversational travel advisor that understands your preferences
- Real-time streaming responses for instant feedback
- Natural language interaction to explore destinations

🎯 **Personalized Recommendations**
- Smart destination suggestions based on:
  - Travel style (adventure, relaxation, culture, food, etc.)
  - Budget preferences
  - Climate preferences
  - Trip duration
  - Group composition

📱 **Responsive Design**
- Beautiful, modern UI built with shadcn/ui and Tailwind CSS
- Mobile-first design that works seamlessly on all devices
- Two-panel discover interface: chat on left, destinations on right

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- Google Generative AI API key (free at [aistudio.google.com](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone and install dependencies**
   ```bash
   pnpm install
   ```

2. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   ```
   
   Get your free Google API key at: https://aistudio.google.com/app/apikey

3. **Run the development server**
   ```bash
   pnpm dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) to see the app.

## Usage

### Home Page
- Browse featured destinations in the grid
- Click any destination card to see detailed information
- Click "Start AI Discovery" to begin exploring with our AI travel advisor

### Discover Page
- **Left Panel**: Chat with the AI travel advisor
  - Describe your ideal vacation
  - Ask about specific regions or activities
  - Get personalized recommendations in real-time

- **Right Panel**: View destination suggestions
  - Browse AI-generated and real recommendations
  - Click any card to see detailed information
  - Save destinations for later consideration

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Styling and responsive design
- **shadcn/ui** - Component library with accessible components

### AI & Backend
- **Vercel AI SDK** - Unified API for AI interactions
- **Google Gemini 2.0 Flash** - Large language model for chat and recommendations
- **Next.js API Routes** - Serverless functions for chat and recommendations

### Architecture
- **Server Components** - Efficient data loading and rendering
- **Client Components** - Interactive UI with real-time chat
- **Streaming Responses** - Fast, progressive content delivery
- **Type-safe Data** - TypeScript interfaces for all destination data

## Project Structure

```
├── app/
│   ├── page.tsx                 # Home page with featured destinations
│   ├── discover/
│   │   └── page.tsx            # Discover page with chat interface
│   ├── api/
│   │   ├── chat/               # Chat streaming endpoint
│   │   └── recommendations/    # AI recommendation generation endpoint
│   └── layout.tsx              # Root layout with metadata
├── components/
│   ├── destination-card.tsx    # Reusable destination card component
│   ├── destination-grid.tsx    # Grid layout for destinations
│   ├── destination-details-modal.tsx  # Destination detail modal
│   ├── chat-interface.tsx      # Chat input and message display
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── destination-data.ts     # Real destinations and data structures
│   ├── ai-config.ts            # AI model configuration
│   └── utils.ts                # Utility functions
└── README.md
```

## Key Components

### DestinationCard
Displays a destination with image, name, description, and quick info. Supports:
- Click to view full details
- Responsive image loading
- Accessible hover states

### ChatInterface
Real-time chat with the AI travel advisor:
- Message history display
- Streaming response handling
- Auto-scrolling to latest messages
- Mobile-friendly input

### DestinationDetailsModal
Full destination information including:
- High-quality images
- Detailed description
- Climate information
- Best time to visit
- Top attractions
- Cultural highlights

## API Endpoints

### POST `/api/chat`
Streams conversational responses from the AI travel advisor.

**Request body:**
```json
{
  "messages": [
    { "role": "user", "content": "I want a beach vacation" }
  ]
}
```

### POST `/api/recommendations`
Generates personalized destination recommendations based on preferences.

**Request body:**
```json
{
  "preferences": "Beach vacation, luxury hotels, water sports"
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google Generative AI API key | Yes |

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set the environment variable `GOOGLE_GENERATIVE_AI_API_KEY`
   - Deploy

3. **Environment Variables in Vercel**
   - Go to Settings → Environment Variables
   - Add `GOOGLE_GENERATIVE_AI_API_KEY` with your API key
   - Redeploy if needed

## Performance Optimizations

- **Image Optimization**: Next.js Image component for automatic optimization
- **Code Splitting**: Route-based and component-based code splitting
- **Streaming**: Real-time chat responses with streaming
- **Caching**: Server-side caching of destination data
- **CSS**: Tailwind CSS with minimal bundle size

## Future Enhancements

- User accounts and saved favorite destinations
- Trip planning with itinerary generation
- Integration with booking platforms
- User reviews and ratings
- Multi-language support
- Advanced filters (price range, accessibility, safety rating)
- Real-time availability checking
- Map-based destination discovery

## Support

For issues or questions:
1. Check the [Vercel docs](https://vercel.com/docs)
2. Review [AI SDK documentation](https://sdk.vercel.ai)
3. Check [shadcn/ui components](https://ui.shadcn.com)
4. Open an issue in the repository

## License

MIT License - feel free to use this project as a template for your own travel discovery application.

---

Built with ❤️ using Next.js, Vercel AI SDK, and Google Gemini
