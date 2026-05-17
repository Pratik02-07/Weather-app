# Weather AI Agent 

Agentic AI backend for weather queries using **LangChain + OpenRouter LLM** with true tool-calling capability.

## How It Works

```
User Question: "Can I go for bike ride tonight in Pune?"
    ↓
LangChain Agent analyzes the query
    ↓
Agent decides which tools to call:
  → get_weather(city="Pune")
  → detect_rain(city="Pune")
  → get_wind_speed(city="Pune")
    ↓
Tool outputs are collected
    ↓
Agent generates final response:
"Weather will remain clear till 10 PM with low wind. Good conditions for a bike ride."
```

  New Features Added:

  ┌────────────────┬───────────────────────────────────┬───────────────────────────┐
  │    Feature     │            Description            │       Example Query       │
  ├────────────────┼───────────────────────────────────┼───────────────────────────┤
  │ Nearby Places  │ Places to visit based on location │ "Nearby places to visit"  │
  ├────────────────┼───────────────────────────────────┼───────────────────────────┤
  │ Travel Time    │ Best time to travel               │ "Best time to travel?"    │
  ├────────────────┼───────────────────────────────────┼───────────────────────────┤
  │ Personalized   │ Custom weather for user           │ "My personalized weather" │
  ├────────────────┼───────────────────────────────────┼───────────────────────────┤
  │ Forecast       │ 5-day weather forecast            │ "What's the forecast?"    │
  ├────────────────┼───────────────────────────────────┼───────────────────────────┤
  │ Rain Detection │ Check if rain expected            │ "Will it rain tomorrow?"  │
  ├────────────────┼───────────────────────────────────┼───────────────────────────┤
  │ Wind Info      │ Wind speed and direction          │ "How's the wind?"         │
  └────────────────┴───────────────────────────────────┴───────────────────────────┘

  Frontend Suggestions Updated with new features!