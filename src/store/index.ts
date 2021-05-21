import {createStore} from "vuex";
import axios from "axios";
import {PlaceLocation} from "../models/location.model";
import {WeatherData} from "../models/weather-data.model";
import {Weather} from "../models/weather.model";

const cors_proxy = "https://intense-hollows-87072.herokuapp.com/";

const api = axios.create({
    baseURL: `${cors_proxy}https://www.metaweather.com/api/location`,
});
const getLastSearch = (): string[] => {
    if (!localStorage.getItem("localSearch")) {
        localStorage.setItem("localSearch", JSON.stringify([]));
    }
    const lSearch: string | null = localStorage.getItem("localSearch");
    return lSearch ? JSON.parse(lSearch): [];
}
export default createStore({
    state: {
        drawer: false,
        loadingLocation: false,
        celsius: true,
        location: new PlaceLocation("", "", "", 0, 0),
        weatherData: new WeatherData(
            [],
            "",
            "",
            new PlaceLocation("", "", "", 0, 0),
            [],
            "",
            "",
            "",
            "",
            "",
            "",
            0
        ),
        lastSearch: getLastSearch()
    },
    getters: {
        drawer: (state) => state.drawer,
        loadingLocation: (state) => state.loadingLocation,
        location: (state) => state.location,
        weatherData: (state) => state.weatherData,
        weatherToday: (state) => state.weatherData?.consolidated_weather[0],
        gradeLabel: (state) => (state.celsius ? "℃" : "℉"),
        celsius: (state) => state.celsius,
        lastSearch: (state) => state.lastSearch?.filter((value: string , index: number) => index <= 10)
    },
    mutations: {
        updateDrawer(state, drawer) {
            state.drawer = drawer;
        },
        updateLoadingLocation(state, loadingLocation) {
            state.loadingLocation = loadingLocation;
        },
        updateCelsius(state, celsius) {
            state.celsius = celsius;
        },
        updateLocation(state, location: PlaceLocation) {
            state.location = location;
        },
        updateWeatherData(state, weatherData: WeatherData) {
            const consolidatedWeather: Weather[] =
                weatherData.consolidated_weather.map((weather) =>
                    Weather.fromJSON(weather)
                );
            state.weatherData = new WeatherData(
                consolidatedWeather,
                weatherData.latt_long,
                weatherData.location_type,
                weatherData.parent,
                weatherData.sources,
                weatherData.sun_rise,
                weatherData.sun_set,
                weatherData.time,
                weatherData.timezone,
                weatherData.timezone_name,
                weatherData.title,
                weatherData.woeid
            );
        },
        addLastSearch(state, search: string){
            const isSearchStored = state.lastSearch.find(s => s.toLowerCase() === search.toLowerCase());
            if(isSearchStored) return;
            if(state.lastSearch.length >= 9){
                state.lastSearch.slice(1);
            }
            state.lastSearch.push(search);
            localStorage.setItem("localSearch", JSON.stringify(state.lastSearch));
        }
    },
    actions: {
        getDataByLocation(context, location: string) {
            context.commit("updateLoadingLocation", true);
            api
                .get(`/search/?query=${location}`)
                .then((response) => {
                    console.log('S E A R C H   B Y   L O C A T I O N');
                    console.log(location);
                    context.commit("updateLocation", response.data[0]);
                    context
                        .dispatch("getDataByWoeid", context.getters.location.woeid)
                        .then(()=> {
                            context.commit("updateLoadingLocation", false);
                            context.commit("updateDrawer", false);

                        });
                })
                .catch((error) => console.log(error));
        },
        getDataByCoord(context, lat_lon) {
            api
                .get<PlaceLocation[]>(`/search/?lattlong=${lat_lon}`)
                .then((response) => {
                    context.commit("updateLocation", response.data[0]);
                    context
                        .dispatch("getDataByWoeid", context.getters.location.woeid)
                        .then();
                })
                .catch((error) => console.log(error));
        },
        getDataByWoeid(context, woeid) {
            api
                .get<WeatherData>(`/${woeid}`)
                .then((response) => {
                    context.commit("updateWeatherData", response.data);
                })
                .catch((error) => console.log(error));
        }, geolocation(context){
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log('S T A R T   S E A R C H   L O C A T I O N');
                    let latt_long = position.coords.latitude.toFixed(2) + "," + position.coords.longitude.toFixed(2);
                    context.dispatch("getDataByCoord", latt_long);
                })
            } else {
                alert(" geolocation IS NOT available")
            }
        }
    },
    modules: {},
});
