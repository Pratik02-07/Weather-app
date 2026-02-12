import { api } from "../lib/axios";

export const getWeather = async (city: string) => {
  const res = await api.get(`/api/weather?city=${city}`);
  return res.data;
};
