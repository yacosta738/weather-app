import { Weather } from "./weather.model";
import { PlaceLocation } from "./location.model";

export interface IWeatherData {
  daily: Weather[]; // daily forecast (up to 8 days)
  current: Weather; // current weather
  location: PlaceLocation;
  timezone: string;
  timezone_name: string;
  title: string;
}

export class WeatherData implements IWeatherData {
  constructor(
    public daily: Weather[],
    public current: Weather,
    public location: PlaceLocation,
    public timezone: string,
    public timezone_name: string,
    public title: string
  ) {
    this.daily = this.daily || [];
  }

  static fromCurrentAndForecast(current: any, forecast: Weather[], location: PlaceLocation): WeatherData {
    return new WeatherData(
      forecast,
      Weather.fromJSON(current),
      location,
      current?.timezone || "",
      current?.timezone_name || "",
      location.name
    );
  }
}
