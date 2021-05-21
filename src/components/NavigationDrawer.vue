<template>
  <nav
      :class="drawer ? 'navbar-open' : 'navbar-close'"
      class="navbar w-full absolute overflow-x-scroll bg-secondary top-0 h-screen rounded z-50"
  >
    <div class="flex pr-2 justify-end">
      <i @click="drawer = false"
         class="m-4 py-1 px-2.5 text-white text-xl text-center font-bold rounded-full cursor-pointer">X</i>
    </div>
    <div class="flex justify-center items-center mx-12">
      <div class="relative flex w-full flex-wrap items-stretch mb-3">
        <span
            class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
          <i class="text-lightest">
            <svg enable-background="new 0 0 1000 1000" version="1.1" viewBox="0 0 1e3 1e3" xml:space="preserve"
                 xmlns="http://www.w3.org/2000/svg" class="fill-current">
              <path
                  d="m932.8 850-201-201c56.4-67.6 90.3-154.5 90.3-249.5 0.1-215.3-174.2-389.5-389.4-389.5-215.3 0-389.5 174.2-389.5 389.5 0 215.2 174.2 389.5 389.5 389.5 61.1 0 119-14.1 170.5-39.1 3 4.7 6.6 9.1 10.7 13.2l203 203c32 32 84 32 116 0 31.9-32.1 31.9-84.1-0.1-116.1zm-807.6-450.5c0-169.8 137.7-307.5 307.5-307.5s307.5 137.7 307.5 307.5-137.8 307.5-307.5 307.5c-169.8 0-307.5-137.7-307.5-307.5z"/>
            </svg>
          </i>
        </span>
        <input type="text" placeholder="Placeholder" v-model="city"
               class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"/>
      </div>
      <button
          class="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ml-4"
          type="button" @click="searchByLocation()">
        Search
      </button>
    </div>
    <div class="flex justify-start mx-12">
      <ul class="flex flex-col justify-start  text-tertiary list-none w-full">
        <li v-for="(search, i) in $store.getters.lastSearch" :key="i" class="flex justify-between my-4 text-lg cursor-pointer border-none p-4"
            :class="{'active-location': $store.getters.location.title.toLowerCase() === search}"
        @click="city = search;searchByLocation()">
          {{search}}
          <i class="text-lightest" v-if="$store.getters.location.title.toLowerCase() === search">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" class="fill-current"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </i>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import {Options, Vue} from "vue-property-decorator";

Options({})
export default class NavigationDrawer extends Vue {
  city: string = '';

  searchByLocation() {
    this.$store.dispatch('getDataByLocation', this.city);
    this.$store.commit("addLastSearch", this.city);
    this.city = '';
  }

  get drawer() {
    return this.$store.getters.drawer;
  }

  set drawer(drawer: boolean) {
    this.$store.commit("updateDrawer", drawer);
  }

  mounted() {
    document.addEventListener('DOMContentLoaded', () => this.geolocation(), false);
  }

  private geolocation() {
        this.$store.dispatch("geolocation");
  }
}
</script>

<style scoped>
.navbar {
  transition: all 330ms ease-out;
}

.navbar-open {
  transform: translateX(0%);
}

.navbar-close {
  transform: translateX(-100%);
}
.active-location{
  border: 1px solid #616475;
  box-sizing: border-box;

}
</style>
