"use client";

import { useState, useRef, useEffect } from "react";

const POPULAR_CITIES = ["Kolhapur", "Pune", "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Ahmedabad"];
const recentSearches = ["Kolhapur", "Mumbai", "Delhi"];

export default function CitySearch({ onSearch, currentCity }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState('recent');
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCities = POPULAR_CITIES.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCitySelect = (city) => {
    onSearch(city);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
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
        <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${isFocused ? 'bg-white/10 blur-lg' : 'opacity-0'}`} />
        <div className="relative flex items-center">
          <span className="absolute left-4 text-gray-500">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
              setActiveTab('popular');
            }}
            onFocus={() => {
              setIsOpen(true);
              setIsFocused(true);
              if (!searchTerm) setActiveTab('recent');
            }}
            onBlur={() => setIsFocused(false)}
            placeholder={currentCity || "Search for a city..."}
            className="w-full pl-12 pr-12 py-4 glass text-white rounded-xl placeholder:text-gray-600 relative z-10 transition-all font-medium text-sm"
          />
          {searchTerm ? (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                inputRef.current?.focus();
              }}
              className="absolute right-4 p-1 hover:bg-white/10 rounded-lg"
            >
              <span className="text-gray-500">✕</span>
            </button>
          ) : currentCity && (
            <div className="absolute right-4 flex items-center gap-1 text-gray-600">
              <span className="text-xs">📍</span>
              <span className="text-xs">{currentCity}</span>
            </div>
          )}
        </div>
      </form>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 glass rounded-xl shadow-2xl overflow-hidden z-50 border border-white/10">
          <div className="flex border-b border-white/5">
            <button
              onClick={() => setActiveTab('recent')}
              className={`flex-1 py-3 text-xs font-medium transition-colors ${activeTab === 'recent' ? 'text-white bg-white/5' : 'text-gray-500'}`}
            >
              🕐 Recent
            </button>
            <button
              onClick={() => setActiveTab('popular')}
              className={`flex-1 py-3 text-xs font-medium transition-colors ${activeTab === 'popular' ? 'text-white bg-white/5' : 'text-gray-500'}`}
            >
              📍 Popular
            </button>
          </div>

          <div className="p-2">
            {activeTab === 'recent' && !searchTerm && (
              <div className="py-2">
                <p className="px-3 py-2 text-xs text-gray-600 mb-1">Recent searches</p>
                {recentSearches.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className="w-full px-3 py-2.5 text-left hover:bg-white/10 rounded-lg flex items-center gap-3 text-white text-sm"
                  >
                    🕐 {city}
                  </button>
                ))}
              </div>
            )}

            {(activeTab === 'popular' || searchTerm) && (
              <ul className="max-h-64 overflow-y-auto">
                {filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <li key={city}>
                      <button
                        onClick={() => handleCitySelect(city)}
                        className="w-full px-3 py-2.5 text-left hover:bg-white/10 rounded-lg flex items-center justify-between text-white text-sm"
                      >
                        <span className="font-medium">{city}</span>
                        <span className="text-xs text-gray-600">→</span>
                      </button>
                    </li>
                  ))
                ) : (
                  <div className="px-3 py-6 text-center">
                    <p className="text-sm font-medium text-white mb-1">No cities found</p>
                    <p className="text-xs text-gray-600">Press Enter to search for "{searchTerm}"</p>
                  </div>
                )}
              </ul>
            )}
          </div>

          <div className="px-3 py-2 border-t border-white/5 bg-black/20">
            <p className="text-[10px] text-gray-600 text-center">Press Enter to search</p>
          </div>
        </div>
      )}
    </div>
  );
}