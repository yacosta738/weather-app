export interface IWeatherSource {
  crawl_rate: number;
  slug: string;
  title: string;
  url: string;
}

export class WeatherSource implements IWeatherSource {
  constructor(
    public crawl_rate: number,
    public slug: string,
    public title: string,
    public url: string
  ) {
    this.crawl_rate = this.crawl_rate || 0;
  }
}
