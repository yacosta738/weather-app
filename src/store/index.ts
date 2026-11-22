import { createStore } from "vuex";
import axios from "axios";
import { PlaceLocation } from "../models/location.model";
import { WeatherData } from "../models/weather-data.model";
import { Weather } from "../models/weather.model";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || "YOUR_API_KEY_HERE";

const geocodingApi = axios.create({
  baseURL: "https://api.openweathermap.org/geo/1.0",
  params: { appid: apiKey },
});

const currentWeatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
  params: { appid: apiKey, units: "metric" },
});

const forecastApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/forecast",
  params: { appid: apiKey, units: "metric" },
});

const getLastSearch = (): string[] => {
  if (!localStorage.getItem("localSearch")) {
    localStorage.setItem("localSearch", JSON.stringify([]));
  }
  const lSearch: string | null = localStorage.getItem("localSearch");
  return lSearch ? JSON.parse(lSearch) : [];
};

// Empty weather data for initialization
const emptyWeather = new Weather(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", "", 0, 0, 0, 0, 0, "", 0);
const emptyLocation = new PlaceLocation("", 0, 0, "");

export default createStore({
  state: {
    drawer: false,
    loadingLocation: false,
    celsius: true,
    location: emptyLocation,
    weatherData: new WeatherData([], emptyWeather, emptyLocation, "", "", ""),
    lastSearch: getLastSearch(),
  },
  getters: {
    drawer: (state: any) => state.drawer,
    loadingLocation: (state: any) => state.loadingLocation,
    location: (state: any) => state.location,
    weatherData: (state: any) => state.weatherData,
    weatherToday: (state: any) => state.weatherData?.current || emptyWeather,
    consolidated_weather: (state: any) => state.weatherData?.daily || [],
    gradeLabel: (state: any) => (state.celsius ? "℃" : "℉"),
    celsius: (state: any) => state.celsius,
    lastSearch: (state: any) =>
      state.lastSearch?.filter((value: string, index: number) => index <= 10),
  },
  mutations: {
    updateDrawer(state: any, drawer: boolean) {
      state.drawer = drawer;
    },
    updateLoadingLocation(state: any, loadingLocation: boolean) {
      state.loadingLocation = loadingLocation;
    },
    updateCelsius(state: any, celsius: boolean) {
      state.celsius = celsius;
    },
    updateLocation(state: any, location: PlaceLocation) {
      state.location = location;
    },
    updateWeatherData(state: any, weatherData: WeatherData) {
      state.weatherData = weatherData;
    },
    addLastSearch(state: any, search: string) {
      const isSearchStored = state.lastSearch.find(
        (s: string) => s.toLowerCase() === search.toLowerCase()
      );
      if (isSearchStored) return;
      if (state.lastSearch.length >= 9) {
        state.lastSearch.shift();
      }
      state.lastSearch.push(search);
      localStorage.setItem("localSearch", JSON.stringify(state.lastSearch));
    },
  },
  actions: {
    getDataByLocation(context: any, location: string) {
      context.commit("updateLoadingLocation", true);
      geocodingApi
        .get("/direct", {
          params: { q: location, limit: 1 },
        })
        .then((response) => {
          console.log("SEARCH BY LOCATION", response.data);
          if (!response.data || response.data.length === 0) {
            console.error("No location found");
            context.commit("updateLoadingLocation", false);
            return;
          }
          const place = PlaceLocation.fromJSON(response.data[0]);
          context.commit("updateLocation", place);
          context
            .dispatch("getWeatherByCoords", { lat: place.lat, lon: place.lon })
            .then(() => {
              context.commit("updateLoadingLocation", false);
              context.commit("updateDrawer", false);
            })
            .catch(() => {
              context.commit("updateLoadingLocation", false);
            });
        })
        .catch((error) => {
          console.error("Error searching location:", error);
          context.commit("updateLoadingLocation", false);
        });
    },
    getWeatherByCoords(context: any, coords: { lat: number; lon: number }) {
      // Fetch current weather and 5-day forecast in parallel
      Promise.all([
        currentWeatherApi.get("/", {
          params: { lat: coords.lat, lon: coords.lon },
        }),
        forecastApi.get("/", {
          params: { lat: coords.lat, lon: coords.lon },
        }),
      ])
        .then(([currentRes, forecastRes]) => {
          console.log("WEATHER DATA", currentRes.data);
          const current = currentRes.data;
          const forecastList = forecastRes.data.list;

          // Group forecast by day (take entry closest to noon for each day)
          const dailyMap = new Map<string, any>();
          forecastList.forEach((item: any) => {
            const date = item.dt_txt.split(" ")[0];
            const time = item.dt_txt.split(" ")[1];
            if (!dailyMap.has(date) || time === "12:00:00") {
              dailyMap.set(date, item);
            }
          });
          // Remove today's forecast to avoid duplication with current weather
          const today = new Date().toISOString().split("T")[0];
          dailyMap.delete(today);

          const dailyForecast: Weather[] = Array.from(dailyMap.values()).map(
            (day: any) => Weather.fromJSON(day)
          );

          const location = new PlaceLocation(
            current.name,
            coords.lat,
            coords.lon,
            current.sys?.country || "",
            current.sys?.country || ""
          );

          const weatherData = WeatherData.fromCurrentAndForecast(
            current,
            dailyForecast,
            location
          );

          context.commit("updateLocation", location);
          context.commit("updateWeatherData", weatherData);
        })
        .catch((error) => {
          console.error("Error fetching weather:", error);
          context.commit("updateLoadingLocation", false);
        });
    },
    geolocation(context: any) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("START SEARCH LOCATION");
            const coords = {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            };
            context.commit("updateLoadingLocation", true);
            context.dispatch("getWeatherByCoords", coords).then(() => {
              context.commit("updateLoadingLocation", false);
            });
          },
          (error) => {
            console.error("Geolocation error:", error);
            alert("Geolocation no está disponible. Busca una ciudad manualmente.");
          }
        );
      } else {
        alert("Geolocation no está disponible en este navegador.");
      }
    },
  },
  modules: {},
});
