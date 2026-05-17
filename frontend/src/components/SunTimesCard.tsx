"use client";

interface SunTimesCardProps {
  sunrise: number;
  sunset: number;
}

export default function SunTimesCard({ sunrise, sunset }: SunTimesCardProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="glass-effect rounded-xl p-4">
      <h3 className="text-white text-xs font-bold mb-3 flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full"></span>
        Sun Times
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-3xl mb-1">🌅</div>
          <p className="text-xs text-neutral-300 mb-1 font-bold">Sunrise</p>
          <p className="text-base font-bold text-white">
            {formatTime(sunrise)}
          </p>
        </div>
        
        <div className="text-center">
          <div className="text-3xl mb-1">🌇</div>
          <p className="text-xs text-neutral-300 mb-1 font-bold">Sunset</p>
          <p className="text-base font-bold text-white">
            {formatTime(sunset)}
          </p>
        </div>
      </div>
    </div>
  );
}
