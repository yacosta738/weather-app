<template>
  <div class="bg-primary absolute h-screen w-2/4 top-0 right-0">
    <div class="mx-32 flex flex-col justify-center items-center">
      <div class="flex justify-end w-full">
        <i :class="{'active-grade': celsius, 'faraday-celsius-icon': !celsius}" @click="celsius = true">
          <span class="px-1.5">ªC</span>
        </i>
        <i :class="{'active-grade': !celsius, 'faraday-celsius-icon': celsius}" @click="celsius = false">
          <span class="px-1.5">ªF</span>
        </i>
      </div>
      <div class="flex justify-center items-center my-2 mx-32 w-full">
        <div class="weather-day-card">
          <h4 class="day">Tomorrow</h4>
          <div class="flex justify-center items-center">
            <img src="../assets/LightRain.png" alt="day icon" class="object-cover p-2 w-1/2">
          </div>
          <div class="flex justify-around my-4 mx-2">
            <span class="morning">31ªC</span>
            <span class="evening">11ªC</span>
          </div>
        </div>
        <div class="weather-day-card">
          <h4 class="day">Tomorrow</h4>
          <div class="flex justify-center items-center">
            <img src="../assets/LightRain.png" alt="day icon" class="object-cover p-2 w-1/2">
          </div>
          <div class="flex justify-around my-4 mx-2">
            <span class="morning">31ªC</span>
            <span class="evening">11ªC</span>
          </div>
        </div>
        <div class="weather-day-card">
          <h4 class="day">Tomorrow</h4>
          <div class="flex justify-center items-center">
            <img src="../assets/LightRain.png" alt="day icon" class="object-cover p-2 w-1/2">
          </div>
          <div class="flex justify-around my-4 mx-2">
            <span class="morning">31ªC</span>
            <span class="evening">11ªC</span>
          </div>
        </div>
        <div class="weather-day-card">
          <h4 class="day">Tomorrow</h4>
          <div class="flex justify-center items-center">
            <img src="../assets/LightRain.png" alt="day icon" class="object-cover p-2 w-1/2">
          </div>
          <div class="flex justify-around my-4 mx-2">
            <span class="morning">31ªC</span>
            <span class="evening">11ªC</span>
          </div>
        </div>
        <div class="weather-day-card">
          <h4 class="day">Tomorrow</h4>
          <div class="flex justify-center items-center">
            <img src="../assets/LightRain.png" alt="day icon" class="object-cover p-2 w-1/2">
          </div>
          <div class="flex justify-around my-4 mx-2">
            <span class="morning">31ªC</span>
            <span class="evening">11ªC</span>
          </div>
        </div>
      </div>
      <div class="flex justify-start mx-32 w-full">
        <div class="w-full flex flex-col justify-start p-2">
          <h3 class="text-tertiary text-3xl my-2 mx-4">Today’s Hightlights </h3>
          <div class="grid grid-cols-2 gap-14 mx-4">
            <div class="hightlights-card">
              <h4 class="my-5">Wind status</h4>
              <div class="flex my-5 text-7xl">7
                <div class="text-4xl mt-5">mph</div>
              </div>
              <div class="flex justify-center items-center mt-5">
                <i class="wind-icon mx-2 fill-current">
                  <svg aria-hidden="true" focusable="false" class="w-6 transform rotate-180" role="img"
                       xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 512 512">
                    <path fill="currentColor"
                          d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z"></path>
                  </svg>
                </i>
                WSW
              </div>
            </div>
            <div class="hightlights-card">
              <h4 class="my-5">Humidity</h4>
              <div class="flex my-5 text-7xl">
                84
                <div class="text-4xl mt-5">%</div>
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
                    <div style="width:30%"
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
            <div class="hightlights-card">
              <h4 class="my-5">Wind status</h4>
              <div class="flex my-5 text-7xl">7
                <div class="text-4xl mt-5">mph</div>
              </div>
            </div>
            <div class="hightlights-card">
              <h4 class="my-5">Wind status</h4>
              <div class="flex my-5 text-7xl">7
                <div class="text-4xl mt-5">mph</div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div class="text-tertiary my-2">created by <a class="text-green-300 hover:scale-75" href="https://www.blastkode.com">yacosta738</a> - devChallenges.io</div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({})
export default class WeatherGeneralPanel extends Vue {
  celsius = true;
}
</script>

<style lang="scss" scoped>
.active-grade {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  @apply mx-4 mt-8 p-2 rounded-full cursor-pointer bg-tertiary text-primary;
}

.faraday-celsius-icon {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  @apply mx-4 mt-8 p-2 rounded-full cursor-pointer bg-gray-700 text-tertiary;
}

.weather-day-card {
  @apply bg-secondary text-tertiary w-1/3 p-2 m-4;
  .day {
    font-family: Raleway;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    @apply text-center my-4;
  }

  .morning {
    font-family: Raleway;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #E7E7EB;
  }

  .evening {
    font-family: Raleway;
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
