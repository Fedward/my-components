<template>
  <div id="app">
    <RangeFilter
      min="1"
      max="4"
      dotSize="16"
      railWidth="4"
    />
  </div>
</template>

<script>
import RangeFilter from './components/RangeFilter/index.vue';

export default {
  name: 'App',
  components: {
    RangeFilter,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');

#app {
  font-family: 'Roboto', sans-serif;
  width: 280px;
  margin: auto;
}
</style>
