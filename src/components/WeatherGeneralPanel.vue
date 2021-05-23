<template>
  <div class="bg-primary lg:absolute lg:h-screen lg:w-3/4 lg:top-0 lg:right-0">
    <div class="mx-2 xl:mx-32 flex flex-col justify-center items-center">
      <div class="flex justify-center md:justify-end w-full">
        <i :class="{'active-degree': celsius, 'faraday-celsius-icon': !celsius}" @click="celsius = true">
          <span class="px-1.5">℃</span>
        </i>
        <i :class="{'active-degree': !celsius, 'faraday-celsius-icon': celsius}" @click="celsius = false">
          <span class="px-1.5">℉</span>
        </i>
      </div>
      <div class="flex justify-center items-center my-2 mx-2 xl:mx-32 w-full">
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-1">
          <card-skeleton-loader v-if="consolidatedWeather && consolidatedWeather.length === 0"
                                class="m-1 xl:m-4"
                                v-for="i in 5" :key="i"></card-skeleton-loader>
          <div v-if="consolidatedWeather && consolidatedWeather.length > 0" class="weather-day-card"
               v-for="(weather, index) in consolidatedWeather" :key="weather.id">
            <h4 class="day">{{ weatherDate(weather.applicable_date, index) }}</h4>
            <div class="image-wrapper">
              <img :src="weatherImage(weather)" :alt="weather.weather_state_name"
                   class="object-cover p-2 w-1/2">
            </div>
            <div class="flex justify-around my-4 mx-2">
              <span class="morning">{{ temperature(weather.max_temp) }}ªC</span>
              <span class="evening">{{ temperature(weather.min_temp) }}ªC</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-start mx-2 xl:mx-32 w-full">
        <div class="w-full flex flex-col justify-start p-2">
          <h3 class="text-tertiary text-3xl my-2 mx-4">Today’s Hightlights </h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-14 mx-4">
            <card-skeleton-loader v-if="consolidatedWeather && consolidatedWeather.length === 0"
                                  v-for="i in 4" :key="i"></card-skeleton-loader>
            <div class="hightlights-card" v-if="consolidatedWeather && consolidatedWeather.length > 0">
              <h4 class="my-2">Wind status</h4>
              <div class="flex my-2 text-2xl md:text-3xl lg:text-7xl">
                {{ windSpeed }}
                <div class="text-xl md:text-4xl mt-5">mph</div>
              </div>
              <div class="flex justify-center items-center mt-5">
                <i class="wind-icon mx-2 fill-current">
                  <svg class="w-6" :class="windDirectionClass" aria-hidden="true" data-icon="location-arrow"
                       data-prefix="fas" focusable="false" role="img" version="1.1" viewBox="0 0 512 512"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m216.42 35.951-151.94 405.86c-17.364 46.994 40.23 83.679 74.651 49.616l118.33-117.1 117.1 118.33c34.063 34.421 92.043-1.6537 75.165-48.833l-147.69-407.43c-14.799-36.468-70.448-36.759-85.615-0.44742z"
                        fill="currentColor" stroke-width=".94638"/>
                  </svg>

                </i>
                {{ windDirection }}
              </div>
            </div>
            <div class="hightlights-card" v-if="consolidatedWeather && consolidatedWeather.length > 0">
              <h4 class="my-2">Humidity</h4>
              <div class="flex my-2 text-2xl md:text-3xl lg:text-7xl">
                {{ humidity }}
                <div class="text-xl md:text-4xl mt-5">%</div>
              </div>
              <div class="flex justify-center items-center w-full">
                <div class="relative pt-1 w-full">
                  <div class="flex mb-2 items-center justify-between">
                    <div class="text-left">
                     <span class="text-xs font-semibold inline-block text-tertiary">
                      0
                    </span>
                    </div>
                    <div class="text-center">
                     <span class="text-xs font-semibold inline-block text-tertiary">
                      50
                    </span>
                    </div>
                    <div class="text-right">
                    <span class="text-xs font-semibold inline-block text-tertiary">
                      100
                    </span>
                    </div>
                  </div>
                  <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-tertiary">
                    <div :style="`width:${humidity}%`"
                         class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-300"></div>
                  </div>
                  <div class="text-right">
                    <span class="text-xs font-semibold inline-block text-tertiary">
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="hightlights-card" v-if="consolidatedWeather && consolidatedWeather.length > 0">
              <h4 class="my-2">Visibility</h4>
              <div class="flex my-2 text-2xl md:text-3xl lg:text-7xl">
                {{ visibility }}
                <div class="text-xl md:text-4xl mt-5">miles</div>
              </div>
            </div>
            <div class="hightlights-card" v-if="consolidatedWeather && consolidatedWeather.length > 0">
              <h4 class="my-2">Air Pressure</h4>
              <div class="flex my-2 text-2xl md:text-3xl lg:text-7xl">
                {{ Math.round(airPressure) }}
                <div class="text-xl md:text-4xl mt-5">mb</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="lg:absolute lg:bottom-0 w-full">
      <div class="flex justify-center items-center text-tertiary my-2">
        created by
        <a class="text-green-300 hover:scale-75 mx-2" href="https://www.blastkode.com">yacosta738</a> - devChallenges.io
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {WeatherData} from "../models/weather-data.model";
import {Weather} from "../models/weather.model";

import {celsiusToFahrenheit, isToday, isTomorrow, weatherStateImage} from "../utilities/util";
import {format} from "date-fns";
import CardSkeletonLoader from "./CardSkeletonLoader.vue";

@Options({
  components: {CardSkeletonLoader}
})
export default class WeatherGeneralPanel extends Vue {

  weatherDate(applicableDate: string | Date, index: number) {
    const date = applicableDate ? new Date(applicableDate) : new Date();
    return isTomorrow(date) || index === 0? 'Tomorrow' : format(date, 'E, d MMM');
  }

  get todayWeather() {
    return this.$store.getters.weatherToday;
  }

  get humidity() {
    return this.todayWeather?.humidity
  }

  get visibility() {
    return this.todayWeather?.visibility?.toFixed(1)?.replace('.', ',')
  }

  get airPressure() {
    return this.todayWeather?.air_pressure
  }

  get windSpeed() {
    return this.todayWeather && this.todayWeather?.wind_speed ? Math.round(this.todayWeather.wind_speed) : 0
  }

  get windDirection() {
    return this.todayWeather?.wind_direction_compass ? this.todayWeather.wind_direction_compass : 'W';
  }

  get windDirectionClass(): string {
    if (this.isInRange(this.todayWeather?.wind_direction, 0, 10)) {
      return 'transform rotate-0';
    } else if (this.isInRange(this.todayWeather?.wind_direction, 10, 45)
        || this.isInRange(this.todayWeather?.wind_direction, 45, 70)) {
      return 'transform rotate-45';
    } else if (this.isInRange(this.todayWeather?.wind_direction, 70, 90)
        || this.isInRange(this.todayWeather?.wind_direction, 90, 100)) {
      return 'transform rotate-90';
    } else if (this.isInRange(this.todayWeather?.wind_direction, 100, 135)
        || this.isInRange(this.todayWeather?.wind_direction, 135, 170)) {
      return 'transform rotate-135';
    } else if (this.isInRange(this.todayWeather?.wind_direction, 170, 180)
        || this.isInRange(this.todayWeather?.wind_direction, 180, 190)) {
      return 'transform rotate-180';
    } else if (this.isInRange(this.todayWeather?.wind_direction, 190, 225)
        || this.isInRange(this.todayWeather?.wind_direction, 225, 250)) {
      return 'transform rotate-225';
    } else if (this.isInRange(this.todayWeather?.wind_direction, 250, 270)
        || this.isInRange(this.todayWeather?.wind_direction, 270, 280)) {
      return 'transform rotate-270';
    } else if (this.isInRange(this.todayWeather?.wind_direction, 280, 315)
        || this.isInRange(this.todayWeather?.wind_direction, 315, 340)) {
      return 'transform rotate-315';
    } else if (this.isInRange(this.todayWeather?.wind_direction, 340, 360)) {
      return 'transform rotate-0'
    } else return 'transform rotate-0';
  }

  private isInRange(value: number, minValue: number, maxValue: number): boolean {
    return minValue <= value && value < maxValue;
  }

  get celsius() {
    return this.$store.getters.celsius;
  }

  set celsius(value: boolean) {
    this.$store.commit("updateCelsius", value);
  }

  get consolidatedWeather(): Weather[] {
    return this.$store.getters.weatherData?.consolidated_weather?.filter((weather: Weather, index: number) => index > 0);
  }

  get weather(): WeatherData {
    return this.$store.getters.weatherData;
  }

  temperature(temp: number) {
    return Math.round(this.$store.getters.celsius ? temp : celsiusToFahrenheit(temp));
  }

  weatherImage(weather: Weather): string {
    return weatherStateImage(weather);
  }
}
</script>

<style lang="scss" scoped>
.active-degree {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  @apply mx-4 mt-8 p-2 rounded-full cursor-pointer bg-tertiary text-primary;
}

.faraday-celsius-icon {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  @apply mx-4 mt-8 p-2 rounded-full cursor-pointer bg-gray-700 text-tertiary;
}

.weather-day-card {
  @apply bg-secondary text-tertiary p-2 m-1 xl:m-4;
  .day {
    font-family: Raleway, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    @apply text-center my-4;
  }

  .image-wrapper {
    @apply flex justify-center items-center  xl:h-20;
  }

  .morning {
    font-family: Raleway, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #E7E7EB;
  }

  .evening {
    font-family: Raleway, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #A09FB1;

  }
}

.wind-icon {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  @apply float-right p-2 rounded-full cursor-pointer z-10;
  svg {
    fill: #e7e7eb;
  }
}

.hightlights-card {
  @apply flex flex-col justify-center items-center p-4 bg-secondary text-tertiary;
}
</style>
