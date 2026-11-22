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

// OpenWeatherMap weather condition codes
// https://openweathermap.org/weather-conditions
export const weatherStateImage = (weather: Weather): string => {
  const code = weather?.weather_state_abbr;
  if (!code) return LightRain;

  const numCode = parseInt(code, 10);

  // 2xx: Thunderstorm
  if (numCode >= 200 && numCode < 300) {
    if (numCode >= 220) return Hail; // thunderstorm with hail
    return Thunderstorm;
  }

  // 3xx: Drizzle
  if (numCode >= 300 && numCode < 400) return LightRain;

  // 5xx: Rain
  if (numCode >= 500 && numCode < 600) {
    if (numCode === 511) return Sleet; // freezing rain
    if (numCode >= 502) return HeavyRain; // heavy/extreme rain
    return Shower;
  }

  // 6xx: Snow
  if (numCode >= 600 && numCode < 700) {
    if (numCode >= 620) return Sleet; // rain and snow mix
    return Snow;
  }

  // 7xx: Atmosphere (fog, sand, dust, etc.)
  if (numCode >= 700 && numCode < 800) return HeavyCloud;

  // 800: Clear sky
  if (numCode === 800) return Clear;

  // 801: Few clouds
  if (numCode === 801) return LightCloud;

  // 802, 803, 804: Clouds
  if (numCode >= 802 && numCode <= 804) {
    if (numCode <= 803) return LightCloud;
    return HeavyCloud;
  }

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
