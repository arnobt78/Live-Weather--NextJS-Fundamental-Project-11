import type { WeatherKind } from "./weather";

/** 5-day / 3-hour forecast list items from OpenWeather (`/data/2.5/forecast`). */
export type ForecastItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: WeatherKind | string;
    description: string;
    icon: string;
  }>;
  wind: { speed: number };
  dt_txt: string;
};

export type ForecastResponse = {
  cod: string;
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
    coord: { lat: number; lon: number };
  };
};
