import { api } from "../lib/axios";

export const getWeather = async (city) => {
  const res = await api.get(`/api/weather?city=${city}`);
  return res.data;
};

export const compareCities = async (city1, city2) => {
  const res = await api.post('/api/weather', {
    action: 'compare',
    city1,
    city2
  });
  return res.data;
};

export const sendAgentQuery = async (query, weatherData) => {
  const res = await api.post('/api/agent', {
    query,
    weatherData
  });
  return res.data.message;
};