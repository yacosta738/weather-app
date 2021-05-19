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
export const weatherStateImage = (weather: Weather): string => {
  switch (weather.weather_state_abbr) {
    case "s":
      return Shower;
    case "sn":
      return Snow;
    case "sl":
      return Sleet;
    case "h":
      return Hail;
    case "t":
      return Thunderstorm;
    case "hr":
      return HeavyRain;
    case "lr":
      return LightRain;
    case "hc":
      return HeavyCloud;
    case "lc":
      return LightCloud;
    case "c":
      return Clear;
    default:
      return LightRain;
  }
};

export const celsiusToFahrenheit = (value: number): number =>
  (value * 9) / 5 + 32;
