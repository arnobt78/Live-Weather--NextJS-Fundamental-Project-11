"use client";

/**
 * useWeather — client hook for “search city → fetch → UI state”
 *
 * Walkthrough:
 * - Holds discriminated union state: loading | ready | error(notFound).
 * - `searchWeather` calls `fetchWeatherByCity` (client-side fetch to OpenWeather logic — key via env as configured in lib).
 * - Special case: default city + no data keeps loading (avoids flashing “not found” on bootstrap).
 * - `onSuccess` syncs context (city, coords, saved cities) from the parent — keeps hook focused on fetch state only.
 */
import { DEFAULT_CITY } from "@/data/constants";
import { fetchWeatherByCity } from "@/lib/openweather";
import type { WeatherApiSuccess, WeatherState } from "@/types/weather";
import { useCallback, useState } from "react";

export type UseWeatherOptions = {
  onSuccess?: (data: WeatherApiSuccess, city: string) => void;
};

/**
 * Custom hook that manages weather fetch flow. Optional onSuccess runs when search succeeds.
 */
export function useWeather(
  initialData: WeatherApiSuccess | null,
  options?: UseWeatherOptions,
) {
  const onSuccess = options?.onSuccess;

  const [state, setState] = useState<WeatherState>(
    initialData
      ? { status: "ready", data: initialData, notFound: false }
      : {
          status: "loading",
          data: null,
          notFound: false,
        },
  );

  const searchWeather = useCallback(
    async (city: string, showLoading = true) => {
      // Optional loading flag: e.g. background refetch can skip the full-screen skeleton.
      if (showLoading) {
        setState({ status: "loading", data: null, notFound: false });
      }
      const data = await fetchWeatherByCity(city);
      if (!data && city === DEFAULT_CITY) {
        setState({ status: "loading", data: null, notFound: false });
        return;
      }
      if (!data) {
        setState({ status: "error", data: null, notFound: true });
        return;
      }
      setState({ status: "ready", data, notFound: false });
      onSuccess?.(data, city);
    },
    [onSuccess],
  );

  return {
    state,
    searchWeather,
  };
}
