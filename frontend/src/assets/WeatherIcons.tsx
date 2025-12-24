export const WeatherIcons: { [key: string]: React.ReactNode } = {
  Clouds: (
    <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M75 45C80.5228 45 85 49.4772 85 55C85 60.5228 80.5228 65 75 65H25C15.5294 65 8 57.4706 8 48C8 39.7157 14.0294 33 22 33C24.5 20 35 12 48 12C62.5 12 74 23.5 75 45Z" fill="#B0BEC5" />
    </svg>
  ),
  Clear: (
    <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" src="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="20" fill="#FFD54F" />
      <line x1="50" y1="10" x2="50" y2="25" stroke="#FFD54F" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="75" x2="50" y2="90" stroke="#FFD54F" strokeWidth="3" strokeLinecap="round" />
      <line x1="10" y1="50" x2="25" y2="50" stroke="#FFD54F" strokeWidth="3" strokeLinecap="round" />
      <line x1="75" y1="50" x2="90" y2="50" stroke="#FFD54F" strokeWidth="3" strokeLinecap="round" />
      <line x1="20" y1="20" x2="30" y2="30" stroke="#FFD54F" strokeWidth="3" strokeLinecap="round" />
      <line x1="70" y1="70" x2="80" y2="80" stroke="#FFD54F" strokeWidth="3" strokeLinecap="round" />
      <line x1="80" y1="20" x2="70" y2="30" stroke="#FFD54F" strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="70" x2="20" y2="80" stroke="#FFD54F" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  Rain: (
    <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M70 35C75 35 78.5 38.5 78.5 43.5C78.5 48.5 75 52 70 52H30C20 52 12 44 12 34C12 25 19 18 28 18C30 10 37 5 45 5C56 5 65 12 68 22C69 21 70 20 71 20C76 20 80 24 80 29" fill="#64B5F6" />
      <line x1="25" y1="60" x2="20" y2="75" stroke="#64B5F6" strokeWidth="3" strokeLinecap="round" />
      <line x1="45" y1="60" x2="40" y2="75" stroke="#64B5F6" strokeWidth="3" strokeLinecap="round" />
      <line x1="65" y1="60" x2="60" y2="75" stroke="#64B5F6" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  Drizzle: (
    <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M70 35C75 35 78.5 38.5 78.5 43.5C78.5 48.5 75 52 70 52H30C20 52 12 44 12 34C12 25 19 18 28 18C30 10 37 5 45 5C56 5 65 12 68 22" fill="#81C784" />
      <line x1="30" y1="58" x2="28" y2="65" stroke="#81C784" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="58" x2="48" y2="65" stroke="#81C784" strokeWidth="2" strokeLinecap="round" />
      <line x1="70" y1="58" x2="68" y2="65" stroke="#81C784" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Thunderstorm: (
    <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M70 35C75 35 78.5 38.5 78.5 43.5C78.5 48.5 75 52 70 52H30C20 52 12 44 12 34C12 25 19 18 28 18C30 10 37 5 45 5C56 5 65 12 68 22" fill="#455A64" />
      <polygon points="45,55 40,75 48,75 42,90 55,70 47,70" fill="#FFD54F" />
    </svg>
  ),
  Snow: (
    <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M70 35C75 35 78.5 38.5 78.5 43.5C78.5 48.5 75 52 70 52H30C20 52 12 44 12 34C12 25 19 18 28 18C30 10 37 5 45 5C56 5 65 12 68 22" fill="#E0F7FA" />
      <text x="25" y="70" fontSize="20" fill="#B3E5FC">❄</text>
      <text x="45" y="70" fontSize="20" fill="#B3E5FC">❄</text>
      <text x="65" y="70" fontSize="20" fill="#B3E5FC">❄</text>
    </svg>
  ),
  Mist: (
    <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M70 40C75 40 78.5 43.5 78.5 48.5C78.5 53.5 75 57 70 57H30C20 57 12 49 12 39C12 30 19 23 28 23C30 15 37 10 45 10C56 10 65 17 68 27" fill="#B0BEC5" opacity="0.7" />
      <line x1="15" y1="65" x2="85" y2="65" stroke="#B0BEC5" strokeWidth="2" opacity="0.5" />
      <line x1="15" y1="75" x2="85" y2="75" stroke="#B0BEC5" strokeWidth="2" opacity="0.3" />
    </svg>
  ),
};

export function getWeatherIcon(condition: string): React.ReactNode {
  const icon = WeatherIcons[condition] || WeatherIcons.Clear;
  return icon;
}
