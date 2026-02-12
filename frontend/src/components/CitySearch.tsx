"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface CitySearchProps {
  onSearch: (city: string) => void;
  currentCity?: string;
}

const POPULAR_CITIES = [
  "Kolhapur",
  "Pune",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Ahmedabad",
];

export default function CitySearch({ onSearch, currentCity }: CitySearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCities = POPULAR_CITIES.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCitySelect = (city: string) => {
    onSearch(city);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-0 bg-white/10 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={currentCity || "Search for a city..."}
          className="w-full px-5 py-4 pr-14 glass-effect text-neutral-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 placeholder:text-neutral-400 relative z-10 transition-all font-medium"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all transform hover:scale-110"
          aria-label="Search"
        >
          <Image
            src="/assets/images/icon-search.svg"
            alt="Search"
            width={18}
            height={18}
          />
        </button>
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 glass-effect rounded-xl shadow-2xl overflow-hidden z-50 animate-scaleIn border border-white/10">
          {filteredCities.length > 0 ? (
            <ul className="max-h-64 overflow-y-auto">
              {filteredCities.map((city, index) => (
                <li key={city}>
                  <button
                    onClick={() => handleCitySelect(city)}
                    className="w-full px-5 py-4 text-left hover:bg-white/10 transition-all flex items-center justify-between group/item border-b border-white/5 last:border-b-0"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <span className="font-medium text-neutral-0 group-hover/item:text-white transition-colors">{city}</span>
                    <span className="text-xs text-neutral-300 group-hover/item:text-white transition-colors">→</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-5 py-4 text-neutral-200 text-center">
              <p className="text-sm font-medium">No cities found</p>
              <p className="text-xs text-neutral-300 mt-1">Press Enter to search anyway</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
