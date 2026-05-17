# Weather App 2.0

A modern and responsive weather application built with **Next.js 16**, **React 19**, and **TypeScript** that provides real-time weather data and 5-day forecasts using the [OpenWeather API](https://openweathermap.org/api). Features a stunning glass-morphism UI with animated beams background and smooth transitions.

## Features

### Current Weather Display
- 🌡️ Real-time temperature with "feels like" indicator
- ☁️ Weather conditions with dynamic WebP icons
- 📊 High/Low temperature ranges
- 💨 Wind speed information (m/s)
- 📅 Current date and location
- 🌅 Sunrise and sunset times
- 💧 Humidity levels

### 5-Day Forecast
- 📈 Daily temperature predictions
- 🎨 Animated weather condition icons
- 📆 Day-wise breakdown with hover effects
- 🎯 Accurate forecasting with smooth transitions

### Air Quality Monitoring
- �️ Real-time AQI (Air Quality Index)
- � PM2.5 and PM10 particle measurements
- 🎨 Color-coded quality levels (Good to Very Poor)
- 💡 Visual indicators for air quality status

### User Interface
- ✨ Glass-morphism design with backdrop blur effects
- 🌟 Animated beams background with customizable parameters
- � Fully cresponsive design (mobile, tablet, desktop)
- 🎭 Smooth page transitions and animations
- 🔍 Smart city search with autocomplete
- 🎯 Popular cities quick access
- 🔄 Rotating text animations on home page
- 🎨 Gradient orbs and hover effects

### Error Handling
- 🔍 Smart error detection with visual feedback
- 💡 Context-specific error messages
- 🛠️ User-friendly error states
- ✅ Loading states with animated spinners

## Technologies Used

### Frontend
- **Framework**: Next.js 16.1.1 (App Router with React 19)
- **Language**: TypeScript 5
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4 with PostCSS
- **Components**: shadcn/ui (Radix UI primitives)
- **HTTP Client**: Axios 1.13.2
- **Form Handling**: React Hook Form 7.69.0 + Zod 4.2.1 validation
- **Animations**: Framer Motion 12.23.26
- **3D Graphics**: Three.js 0.182.0 with React Three Fiber
- **Icons**: Custom WebP weather icons + Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority

### Backend (Serverless)
- **Runtime**: Node.js on Vercel Edge Functions
- **Language**: TypeScript
- **API Type**: Next.js 16 API Routes

### APIs & Services
- **Weather Data**: [OpenWeather API](https://openweathermap.org/api)
  - Geocoding API (city name to coordinates)
  - Current Weather Data API
  - 5-Day/3-Hour Forecast API
  - Air Quality API

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── weather/
│   │   │       └── route.ts          # Weather API endpoint
│   │   ├── [city]/
│   │   │   └── page.tsx              # Dynamic city weather page
│   │   ├── globals.css               # Global styles & animations
│   │   ├── layout.tsx                # Root layout with fonts
│   │   └── page.tsx                  # Home page with search
│   ├── components/
│   │   ├── AirQualityCard.tsx        # Air quality display
│   │   ├── Beams.tsx                 # Animated background beams
│   │   ├── Beams.css                 # Beams animations
│   │   ├── CitySearch.tsx            # Search with autocomplete
│   │   ├── ForecastList.tsx          # 5-day forecast list
│   │   ├── RotatingText.tsx          # Animated rotating text
│   │   ├── RotatingText.css          # Text animations
│   │   ├── SunTimesCard.tsx          # Sunrise/sunset display
│   │   ├── TodayWeather.tsx          # Current weather card
│   │   └── ui/                       # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   ├── hooks/
│   │   └── useWeather.ts             # Weather data fetching hook
│   ├── services/
│   │   └── weather.service.ts        # Weather API service
│   ├── types/
│   │   └── weather.ts                # TypeScript interfaces
│   ├── lib/
│   │   ├── axios.ts                  # Axios instance config
│   │   └── utils.ts                  # Utility functions
│   └── assets/
│       └── WeatherIcons.tsx          # Weather icon components
├── public/
│   └── assets/
│       ├── fonts/                    # Custom fonts
│       │   ├── Bricolage_Grotesque/
│       │   ├── CormorantGaramond/
│       │   └── DM_Sans/
│       └── images/                   # Weather icons & UI assets
│           ├── icon-sunny.webp
│           ├── icon-rain.webp
│           ├── icon-snow.webp
│           └── ... (more icons)
├── .env.local                        # Environment variables
├── .nvmrc                            # Node version specification
├── components.json                   # shadcn/ui config
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS config
├── tsconfig.json                     # TypeScript config
├── vercel.json                       # Vercel deployment config
└── package.json                      # Dependencies & scripts
```

## How It Works

1. **Home Page**: User lands on the home page with animated beams background and rotating feature text
2. **City Search**: User enters a city name or selects from popular cities (Kolhapur, Pune, Mumbai, Delhi, etc.)
3. **Dynamic Routing**: App navigates to `/[city]` route with URL-friendly city name
4. **API Call**: Frontend makes request to `/api/weather?city={cityName}`
5. **Geocoding**: Backend resolves city name to coordinates using OpenWeather Geocoding API
6. **Weather Data**: Fetches current weather, 5-day forecast, and air quality data
7. **Data Processing**: Formats and structures the weather data
8. **Display**: Beautiful glass-morphism UI renders:
   - Current weather with temperature, conditions, wind speed
   - 5-day forecast with daily predictions
   - Sun times (sunrise/sunset)
   - Air quality index with PM2.5 and PM10 levels
9. **Animations**: Smooth transitions, hover effects, and loading states enhance UX

## Future Enhancements

- 📍 Geolocation support for automatic location detection
- 🌙 Dark/Light mode theme toggle
- 🌡️ Temperature unit toggle (°C/°F)
- ❤️ Favorites/Bookmarks for quick city access
- 📊 Historical weather data and trends
- 🎨 Customizable themes and color schemes
- 📱 Progressive Web App (PWA) support
- 🔔 Weather alerts and notifications
- 🗺️ Interactive weather maps
- 📈 Detailed hourly forecasts

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Weather data powered by [OpenWeather API](https://openweathermap.org/api)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- 3D effects with [Three.js](https://threejs.org/) and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- Icons from [Lucide React](https://lucide.dev/)
- Built with [Next.js](https://nextjs.org/) and [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤ by [@pratik02-07](https://github.com/pratik02-07)
