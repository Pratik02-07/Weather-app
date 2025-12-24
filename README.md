# Weather App 2.0

A modern and responsive weather application built with **Next.js**, **React**, and **TypeScript** that provides real-time weather data and 5-day forecasts using the [OpenWeather API](https://openweathermap.org/api). Features a beautiful beach-themed UI with gradient backgrounds and smooth animations.

## Features

### Current Weather Display
- 🌡️ Real-time temperature
- ☁️ Weather conditions with dynamic icons
- 📊 Min/Max temperature ranges
- 💨 Wind speed information
- 📅 Current date and location

### 5-Day Forecast
- 📈 Daily temperature predictions
- 🎨 Weather condition icons
- 📆 Day-wise breakdown
- 🎯 Accurate forecasting

### User Interface
- 🏖️ Beautiful beach-themed gradient background
- 📱 Fully responsive design (mobile, tablet, desktop)
- ✨ Smooth animations and transitions
- 🎯 Intuitive search interface
- 🌊 Ocean wave SVG animations
- 🌙 Glass-morphism design elements

### Error Handling
- 🔍 Smart error detection
- 💡 Context-specific error messages
- 🛠️ Connection troubleshooting tips
- ✅ Validation feedback

## Technologies Used

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Custom SVG weather icons

### Backend (Serverless)
- **Runtime**: Node.js on Vercel (serverless functions)
- **Language**: TypeScript
- **API Type**: Next.js API Routes

### APIs & Services
- **Weather Data**: [OpenWeather API](https://openweathermap.org/api)
  - Geo-coding API
  - Current Weather API
  - 5-Day Forecast API

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "weather app/frontend"
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_OWM_API_KEY=your_openweather_api_key
```

Get your free API key from [OpenWeather](https://openweathermap.org/api)

4. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Project Structure

```
weather app/
├── frontend/                    # Next.js application
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/            # Serverless API routes (Optional)
│   │   │   │   └── weather/    # Weather API endpoint
│   │   │   ├── globals.css     # Global styles
│   │   │   ├── layout.tsx      # Root layout
│   │   │   └── page.tsx        # Home page
│   │   ├── components/         # React components
│   │   │   ├── CurrentWeather.tsx
│   │   │   ├── Forecast.tsx
│   │   │   ├── SearchForm.tsx
│   │   │   ├── ErrorDisplay.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ui/            # shadcn/ui components
│   │   ├── hooks/             # Custom React hooks
│   │   │   └── useWeather.ts
│   │   ├── services/          # API services
│   │   │   └── weather.service.ts
│   │   ├── types/             # TypeScript types
│   │   │   └── weather.ts
│   │   ├── lib/               # Utility functions
│   │   │   └── axios.ts
│   │   └── assets/            # Static assets
│   │       └── WeatherIcons.tsx
│   ├── public/                # Static files
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── vercel.json           # Vercel deployment config
│   └── .env.local            # Environment variables
└── backend/                   # Original Flask backend (optional)
    ├── main.py
    ├── requirements.txt
    └── .env
```

## How It Works

1. **User Search**: User enters a city name in the search form
2. **API Call**: Frontend makes request to `/api/weather?city={cityName}`
3. **Geo-coding**: Backend resolves city name to coordinates
4. **Weather Data**: Fetches current weather from OpenWeather
5. **Forecast Data**: Fetches 5-day forecast and processes it
6. **Display**: Beautiful UI renders the weather information

## Building & Deployment

### Local Build
```bash
npm run build
npm run start
```

### Deploy to Vercel

1. **Push to GitHub**
```bash
git push origin main
```

2. **Deploy on Vercel**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Set framework to "Next.js"
   - Add environment variables:
     - `NEXT_PUBLIC_OWM_API_KEY`: Your OpenWeather API key
   - Click "Deploy"

The app will be live at `https://your-project.vercel.app`

## API Endpoints

### GET /api/weather
Fetches current weather and forecast for a city.

**Query Parameters:**
- `city` (required): City name

**Response:**
```json
{
  "city": "Pune",
  "date": "Wednesday, December 24",
  "current": {
    "temp": 24,
    "condition": "Clouds",
    "min": 24,
    "max": 24,
    "wind": 3.65
  },
  "forecast": [
    {
      "day": "Wed",
      "temp": 25,
      "condition": "Clouds"
    }
  ]
}
```

## Environment Variables

```env
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3000          # API base URL
NEXT_PUBLIC_OWM_API_KEY=your_api_key              # OpenWeather API key

# Backend (if using Flask)
OWM_API_KEY=your_api_key
```

## Performance Optimizations

- ✅ Next.js Image Optimization
- ✅ Code Splitting
- ✅ Server-Side Rendering (SSR)
- ✅ Static Generation (SSG) where applicable
- ✅ CSS minification with Tailwind
- ✅ Font optimization with Next.js fonts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- 📍 Geolocation support
- 🌙 Dark mode theme
- 🌡️ Temperature unit toggle (°C/°F)
- ❤️ Favorites/Bookmarks
- 📊 Historical weather data
- 🎨 Customizable themes
- � Mobile app (React Native)

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Weather data powered by [OpenWeather API](https://openweathermap.org/api)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Thanks to the Next.js and React communities


