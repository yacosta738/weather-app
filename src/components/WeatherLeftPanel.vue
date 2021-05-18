<template>
  <div class="bg-secondary absolute h-screen w-1/4 top-0 left-0">
    <div class="flex justify-between mb-6">
      <button class="search-location" @click="$store.commit('updateDrawer', true)">Search for place</button>
      <navigation-drawer></navigation-drawer>
      <i class="location-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4"/>
          <path
              d="M13,4.069V2h-2v2.069C7.389,4.522,4.523,7.389,4.069,11H2v2h2.069c0.454,3.611,3.319,6.478,6.931,6.931V22h2v-2.069 c3.611-0.453,6.478-3.319,6.931-6.931H22v-2h-2.069C19.478,7.389,16.611,4.522,13,4.069z M12,18c-3.309,0-6-2.691-6-6s2.691-6,6-6 s6,2.691,6,6S15.309,18,12,18z"/>
        </svg>
      </i>
    </div>
    <div class="banner-wrapper">
      <div class="banner"></div>
      <img src="../assets/LightCloud.png" alt="time">
    </div>
    <div class="flex justify-center items-center">
      <div class="temperature">15 <p>℃</p></div>
    </div>
    <div class="flex justify-center items-center text-lightest text-4xl mt-20">Shower</div>
    <div class="flex flex-col justify-center items-center text-lightest-min mt-20">
      <div class="flex justify-center items-center">
        <span class="mx-4">Today</span> • <span class="mx-4">Fri, 5 Jun</span>
      </div>
      <div class="flex justify-center items-center mt-5">
        <i class="mx-1 fill-current">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
        </i>
        WSW
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import NavigationDrawer from "./NavigationDrawer.vue";

@Options({
  components: {NavigationDrawer}
})
export default class WeatherLeftPanel extends Vue {
}
</script>

<style lang="scss" scoped>
.search-location {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  background: #6E707A;
  font-family: Raleway, serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #e7e7eb;
  @apply bg-gray-600 py-2 px-4 text-sm ml-8 mt-8;
}

.location-icon {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  @apply float-right mr-8 mt-8 p-2 rounded-full cursor-pointer z-10;
  svg {
    fill: #e7e7eb;
  }
}

.banner-wrapper {
  position: relative;
  @apply flex justify-center items-center p-2 w-full h-2/5;
}

.banner {
  position: absolute;
  left: -4%;
  right: -5%;
  top: -5%;
  bottom: -10%;
  width: calc(100% + 20px);
  height: calc(100%);
  background: url(../assets/Cloud-background.png) center center no-repeat;
  background-size: cover;
  @apply opacity-20;
}

.temperature {
  font-family: Raleway;
  font-style: normal;
  font-weight: 500;
  font-size: 144px;
  line-height: 169px;
  color: #E7E7EB;
  @apply flex justify-center items-center;
  p {
    font-family: Raleway;
    font-size: 48px;
    font-style: normal;
    font-weight: 500;
    line-height: 56px;
    letter-spacing: 0;
    color: #A09FB1
  }
}
</style>
