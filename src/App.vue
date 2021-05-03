<template>
  <div>
    <weather-left-panel />
    <weather-general-panel/>
  </div>
</template>

<script lang="ts">
import { Options, setup, Vue } from 'vue-class-component';
import WeatherLeftPanel from "./components/WeatherLeftPanel.vue";
import WeatherGeneralPanel from "./components/WeatherGeneralPanel.vue";
@Options({components:{WeatherGeneralPanel, WeatherLeftPanel}})
export default class App extends Vue{

}

</script>

<style>
#app {

}
</style>
