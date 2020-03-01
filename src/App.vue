<template>
  <div id="app">
    <div class="filter-wrap">
      <RangeFilter
        min="100"
        max="200"
        dotSize="16"
        railWidth="4"
      />
    </div>
  </div>
</template>

<script>
import RangeFilter from './components/RangeFilter.vue';

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
  display: flex;
  justify-content: center;
}

.filter-wrap {
  width: 280px;
}
</style>
