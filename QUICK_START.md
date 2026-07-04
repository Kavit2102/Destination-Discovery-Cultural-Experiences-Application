# Quick Start: AI-Generated Destinations

## 🚀 Get Started in 2 Minutes

### Step 1: Add OpenAI API Key

**Locally (Development):**
```bash
# Create or edit .env.local
echo "OPENAI_API_KEY=sk-your-key-here" >> .env.local

# Get your key from https://platform.openai.com/api-keys
```

**On Vercel (Production):**
1. Go to Vercel Project Settings
2. Click "Environment Variables"
3. Add `OPENAI_API_KEY`
4. Redeploy

### Step 2: Restart Dev Server
```bash
# Kill the running server with Ctrl+C, then:
npm run dev
```

### Step 3: Test It
1. Visit `http://localhost:3000/discover`
2. Type: "Beach destinations under $50 a day"
3. Watch as AI generates unique destinations with images! 🎉

## 📋 What Happens Behind the Scenes

```
Your Message
    ↓
AI reads your preferences
    ↓
Searches 13 real destinations first
    ↓
If needed, generates new AI destinations
    ↓
Creates relevant images automatically
    ↓
Returns destinations with all details
```

## ✅ Features

- 🤖 **AI-Generated** - Unique destinations created on-the-fly
- 🖼️ **Auto Images** - Beautiful images for every destination
- 💰 **Smart Pricing** - Real data on daily costs
- 📍 **Real Details** - Climate, currency, activities, attractions
- ⚡ **Fast** - 30-minute cache keeps things snappy
- 🔄 **Reliable** - Falls back to 13 real destinations if API fails

## 🆘 Troubleshooting

### "OpenAI API key is missing"
- ✅ Check `.env.local` has the key
- ✅ Restart dev server
- ✅ Get key from https://platform.openai.com/api-keys

### Images not showing
- Unsplash is used by default (free, no setup needed)
- Optional: Add `FAL_KEY` for AI image generation

### Want to test without OpenAI?
- The app still works! Falls back to 13 hardcoded destinations
- Just won't generate new destinations based on your preferences

## 🎯 What Works Now

| Feature | Status |
|---------|--------|
| Chat with AI advisor | ✅ Working |
| Real destinations | ✅ Always available |
| AI-generated destinations | ✅ With API key |
| Destination images | ✅ Automatic |
| Caching | ✅ 30-minute TTL |
| Mobile responsive | ✅ Ready |

## 📚 Want More Info?

- **Setup & Config:** See `AI_GENERATION_GUIDE.md`
- **Technical Details:** See `IMPLEMENTATION_SUMMARY.md`
- **Code:** Check `lib/ai-destination-generator.ts`

## 💡 Pro Tips

1. **Cost:** Each destination generation costs ~$0.001
2. **Speed:** Cached results are instant
3. **Variety:** Generate fresh destinations anytime
4. **Fallback:** Always works even without OpenAI

## 🔑 API Key Options

### OpenAI (Recommended)
- Free tier includes $5 credits
- ~$0.001 per destination
- Generous rate limits

Get it: https://platform.openai.com/api-keys

### Optional: Fal.ai
- Better image generation
- More creative AI images
- Same setup process

Get it: https://fal.ai

## 🎬 Next Steps

1. ✅ Add `OPENAI_API_KEY`
2. ✅ Restart dev server
3. ✅ Visit `/discover`
4. ✅ Chat with the AI advisor
5. ✅ See AI-generated destinations with images!

---

**That's it!** You're now generating destinations with AI. 🌍✨

For detailed docs, check the `AI_GENERATION_GUIDE.md` file.
