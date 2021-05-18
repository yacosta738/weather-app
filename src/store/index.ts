import {createStore} from "vuex";
import axios from "axios";
import {Location} from "../models/location.model";
import {WeatherData} from "../models/weather-data.model";

const cors_proxy = "https://intense-hollows-87072.herokuapp.com/";

const api = axios.create({
    baseURL: `${cors_proxy}https://www.metaweather.com/api/location`,
});

export default createStore({
    state: {
        drawer: false,
        location: new Location('', '', '', 0, 0),
        weatherData: new WeatherData([], '', '', '', '', '', '', '', '', 0),
        temp: ''
    },
    getters: {
        drawer: (state) => state.drawer,
        location: (state) => state.location,
        weatherData: (state) => state.weatherData,
    },
    mutations: {
        updateDrawer(state, drawer) {
            state.drawer = drawer;
        },
        updateLocation(state, location: Location) {
            state.location = location;
        },
        updateTemp(state, temp) {
            state.temp = temp;
        },
        updateWeatherData(state, weatherData: WeatherData) {
            state.weatherData = weatherData;
        }
    },
    actions: {
        getDataByLocation(context, location: string) {
            api
                .get(`/search/?query=${location}`)
                .then((response) => {
                    console.log(response);
                    context.commit("updateTemp", response);
                })
                .catch((error) => console.log(error));
        },
        getDataByCoord(context, lat_lon) {
            api
                .get<Location[]>(`/search/?lattlong=${lat_lon}`)
                .then((response) => {
                    context.commit("updateLocation", response.data[0]);
                    context.dispatch("getDataByWoeid", context.getters.location.woeid).then();
                })
                .catch((error) => console.log(error));
        },
        getDataByWoeid(context, woeid) {
            api
                .get<WeatherData>(`/${woeid}`)
                .then((response) => {
                    console.log(response.data);
                    context.commit("updateWeatherData", response.data);
                })
                .catch((error) => console.log(error));
        },
    },
    modules: {},
});
