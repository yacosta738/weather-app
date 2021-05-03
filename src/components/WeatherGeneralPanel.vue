<template>
  <div class="bg-primary absolute h-screen w-2/3 top-0 right-0">
    <h1 class="text-red-500">Hello world General</h1>
  </div>
</template>

<script lang="ts">
import { Options, setup, Vue } from 'vue-class-component';
@Options({})
export default class WeatherGeneralPanel extends Vue {

}
</script>

<style scoped></style>
