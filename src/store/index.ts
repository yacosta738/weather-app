import { createStore } from "vuex";
import axios from "axios";
import { PlaceLocation } from "../models/location.model";
import { WeatherData } from "../models/weather-data.model";
import { Weather } from "../models/weather.model";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || "YOUR_API_KEY_HERE";

const geocodingApi = axios.create({
  baseURL: "https://geocoding-api.openweathermap.org",
  params: { appid: apiKey },
});

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/3.0",
  params: { appid: apiKey },
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
        .get("/geocode/1.0", {
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
      // Fetch current weather
      weatherApi
        .get("/onecall", {
          params: {
            lat: coords.lat,
            lon: coords.lon,
            units: "metric",
          },
        })
        .then((response) => {
          console.log("WEATHER DATA", response.data);
          const data = response.data;

          // Build daily forecast from One Call data
          const dailyForecast: Weather[] = (data.daily || []).map((day: any) =>
            Weather.fromJSON(day)
          );

          // Get location name from current weather response
          const currentData = data.current;
          const locationName = data.name || context.getters.location.name || "Unknown";

          const location = new PlaceLocation(
            locationName,
            coords.lat,
            coords.lon,
            data.timezone || ""
          );

          const weatherData = WeatherData.fromCurrentAndForecast(
            { ...currentData, timezone: data.timezone, timezone_name: data.timezone },
            dailyForecast,
            location
          );

          context.commit("updateLocation", location);
          context.commit("updateWeatherData", weatherData);
        })
        .catch((error) => {
          console.error("Error fetching weather:", error);
          // Fallback: try current weather API if onecall fails
          this.fetchWeatherFallback(coords);
        });
    },
    fetchWeatherFallback(context: any, coords: { lat: number; lon: number }) {
      // Fallback to current weather + 5-day forecast APIs
      Promise.all([
        axios.get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            lat: coords.lat,
            lon: coords.lon,
            units: "metric",
            appid: apiKey,
          },
        }),
        axios.get("https://api.openweathermap.org/data/2.5/forecast", {
          params: {
            lat: coords.lat,
            lon: coords.lon,
            units: "metric",
            appid: apiKey,
          },
        }),
      ])
        .then(([currentRes, forecastRes]) => {
          const current = currentRes.data;
          const forecastList = forecastRes.data.list;

          // Group forecast by day (take one entry per day at noon)
          const dailyMap = new Map<string, any>();
          forecastList.forEach((item: any) => {
            const date = item.dt_txt.split(" ")[0];
            if (!dailyMap.has(date)) {
              dailyMap.set(date, item);
            }
          });
          const dailyForecast: Weather[] = Array.from(dailyMap.values()).map(
            (day: any) => Weather.fromJSON(day)
          );

          const location = new PlaceLocation(
            current.name,
            coords.lat,
            coords.lon,
            current.sys?.country || ""
          );

          const weatherData = WeatherData.fromCurrentAndForecast(
            current,
            dailyForecast,
            location
          );

          context.commit("updateLocation", location);
          context.commit("updateWeatherData", weatherData);
          context.commit("updateLoadingLocation", false);
        })
        .catch((error) => {
          console.error("Fallback weather fetch failed:", error);
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
