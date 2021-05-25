// air_pressure: 1020
// applicable_date: "2021-05-17"
// created: "2021-05-18T01:18:37.467910Z"
// humidity: 58
// id: 5837054417043456
// max_temp: 27.67
// min_temp: 23.83
// predictability: 73
// the_temp: 26.625
// visibility: 12.407539966595085
// weather_state_abbr: "s"
// weather_state_name: "Showers"
// wind_direction: 67.16693729906565
// wind_direction_compass: "ENE"
// wind_speed: 9.54615079300883
export interface IWeather {
  air_pressure: number;
  applicable_date: string;
  created: string;
  humidity: number;
  id: number;
  max_temp: number;
  min_temp: number;
  predictability: number;
  the_temp: number;
  visibility: number;
  weather_state_abbr: string;
  weather_state_name: string;
  wind_direction: number;
  wind_direction_compass: string;
  wind_speed: number;
}

export class Weather implements IWeather {
  constructor(
    public air_pressure: number,
    public applicable_date: string,
    public created: string,
    public humidity: number,
    public id: number,
    public max_temp: number,
    public min_temp: number,
    public predictability: number,
    public the_temp: number,
    public visibility: number,
    public weather_state_abbr: string,
    public weather_state_name: string,
    public wind_direction: number,
    public wind_direction_compass: string,
    public wind_speed: number
  ) {
    this.air_pressure = this.air_pressure || 0;
    this.humidity = this.humidity || 0;
    this.id = this.id || 0;
    this.max_temp = this.max_temp || 0;
    this.min_temp = this.min_temp || 0;
    this.predictability = this.predictability || 0;
    this.the_temp = this.the_temp || 0;
    this.visibility = this.visibility || 0;
    this.wind_direction = this.wind_direction || 0;
    this.wind_speed = this.wind_speed || 0;
  }

  static fromJSON(json: any): Weather {
    return json
      ? new Weather(
          json.air_pressure,
          json.applicable_date,
          json.created,
          json.humidity,
          json.id,
          json.max_temp,
          json.min_temp,
          json.predictability,
          json.the_temp,
          json.visibility,
          json.weather_state_abbr,
          json.weather_state_name,
          json.wind_direction,
          json.wind_direction_compass,
          json.wind_speed
        )
      : new Weather(0, "", "", 0, 0, 0, 0, 0, 0, 0, "", "", 0, "", 0);
  }
}
