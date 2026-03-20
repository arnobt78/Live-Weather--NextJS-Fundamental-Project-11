/** One row from OpenWeather Geocoding API (`/geo/1.0/direct`). */
export type GeoItem = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};
