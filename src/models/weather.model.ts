// OpenWeatherMap One Call 3.0 / Current Weather response fields
export interface IWeather {
  dt: number; // timestamp
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather_state_abbr: string; // WMO code
  weather_state_name: string;
  pop: number; // probability of precipitation
  clouds: number;
  sunrise: number;
  sunset: number;
  timezone: number;
  timezone_name: string;
  id: number;
}

export class Weather implements IWeather {
  constructor(
    public dt: number,
    public temp: number,
    public feels_like: number,
    public temp_min: number,
    public temp_max: number,
    public humidity: number,
    public pressure: number,
    public visibility: number,
    public wind_speed: number,
    public wind_deg: number,
    public weather_state_abbr: string,
    public weather_state_name: string,
    public pop: number,
    public clouds: number,
    public sunrise: number,
    public sunset: number,
    public timezone: number,
    public timezone_name: string,
    public id: number
  ) {
    this.dt = this.dt || 0;
    this.temp = this.temp || 0;
    this.feels_like = this.feels_like || 0;
    this.temp_min = this.temp_min || 0;
    this.temp_max = this.temp_max || 0;
    this.humidity = this.humidity || 0;
    this.pressure = this.pressure || 0;
    this.visibility = this.visibility || 0;
    this.wind_speed = this.wind_speed || 0;
    this.wind_deg = this.wind_deg || 0;
    this.pop = this.pop || 0;
    this.clouds = this.clouds || 0;
    this.sunrise = this.sunrise || 0;
    this.sunset = this.sunset || 0;
    this.timezone = this.timezone || 0;
    this.id = this.id || 0;
  }

  static fromJSON(json: any): Weather {
    if (!json) {
      return new Weather(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", "", 0, 0, 0, 0, 0, "", 0);
    }
    const weatherMain = json.weather?.[0] || {};
    return new Weather(
      json.dt || 0,
      json.temp || 0,
      json.feels_like || 0,
      json.temp?.min || json.temp_min || 0,
      json.temp?.max || json.temp_max || 0,
      json.humidity || 0,
      json.pressure || 0,
      json.visibility || 0,
      json.wind?.speed || json.wind_speed || 0,
      json.wind?.deg || json.wind_deg || 0,
      weatherMain.id?.toString() || "",
      weatherMain.main || "",
      json.pop || 0,
      json.clouds || 0,
      json.sunrise || 0,
      json.sunset || 0,
      json.timezone || 0,
      json.timezone_name || "",
      json.id || 0
    );
  }
}
