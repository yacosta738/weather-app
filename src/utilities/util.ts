import Clear from "../assets/Clear.png";
import Hail from "../assets/Hail.png";
import HeavyRain from "../assets/HeavyRain.png";
import HeavyCloud from "../assets/HeavyCloud.png";
import LightRain from "../assets/LightRain.png";
import LightCloud from "../assets/LightCloud.png";
import Shower from "../assets/Shower.png";
import Sleet from "../assets/Sleet.png";
import Snow from "../assets/Snow.png";
import Thunderstorm from "../assets/Thunderstorm.png";
import { Weather } from "../models/weather.model";

// WMO weather codes from OpenWeatherMap
// https://openweathermap.org/weather-conditions
export const weatherStateImage = (weather: Weather): string => {
  const code = weather?.weather_state_abbr;
  if (!code) return LightRain;

  const numCode = parseInt(code, 10);

  // 0: Clear sky
  if (numCode === 0) return Clear;

  // 1, 2, 3: Mainly clear, partly cloudy, and overcast
  if (numCode >= 1 && numCode <= 3) {
    if (numCode === 1) return Clear;
    if (numCode === 2) return LightCloud;
    return HeavyCloud;
  }

  // 45, 48: Fog and depositing rime fog
  if (numCode === 45 || numCode === 48) return HeavyCloud;

  // 51, 53, 55: Drizzle
  if (numCode >= 51 && numCode <= 57) return LightRain;

  // 61, 63, 65: Rain
  if (numCode >= 61 && numCode <= 67) {
    if (numCode <= 63) return LightRain;
    return HeavyRain;
  }

  // 66, 67: Freezing Rain
  if (numCode === 66 || numCode === 67) return Sleet;

  // 71, 73, 75: Snow fall
  if (numCode >= 71 && numCode <= 77) return Snow;

  // 77, 80, 81, 82: Rain showers
  if (numCode >= 80 && numCode <= 82) return Shower;

  // 85, 86: Snowfall showers
  if (numCode === 85 || numCode === 86) return Snow;

  // 95: Thunderstorm
  if (numCode === 95) return Thunderstorm;

  // 96, 99: Thunderstorm with hail
  if (numCode >= 96 && numCode <= 99) return Hail;

  // Fallback based on weather state name
  const name = (weather?.weather_state_name || "").toLowerCase();
  if (name.includes("thunder")) return Thunderstorm;
  if (name.includes("snow")) return Snow;
  if (name.includes("rain") || name.includes("drizzle")) return LightRain;
  if (name.includes("cloud") || name.includes("fog")) return LightCloud;
  if (name.includes("clear") || name.includes("sun") || name.includes("sunny")) return Clear;

  return LightRain;
};

export const getWindDirectionCompass = (deg: number): string => {
  const directions = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

export const celsiusToFahrenheit = (value: number): number =>
  (value * 9) / 5 + 32;

export const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isYesterday = (date: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
};

export const isTomorrow = (date: Date) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
};
