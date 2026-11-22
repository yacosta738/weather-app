// OpenWeatherMap Geocoding API response
export interface ILocation {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export class PlaceLocation implements ILocation {
  constructor(
    public name: string,
    public lat: number,
    public lon: number,
    public country: string,
    public state?: string,
    public local_names?: Record<string, string>
  ) {
    this.lat = this.lat || 0;
    this.lon = this.lon || 0;
  }

  static fromJSON(json: any): PlaceLocation {
    return json
      ? new PlaceLocation(
          json.name,
          json.lat,
          json.lon,
          json.country,
          json.state,
          json.local_names
        )
      : new PlaceLocation("", 0, 0, "");
  }
}
