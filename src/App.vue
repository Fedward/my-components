<template>
  <div id="app">
    <div class="filter-wrap">
      <MultiRangeFilter
        min="100"
        max="200"
        knobSize="16"
      />
    </div>
  </div>
</template>

<script>
import MultiRangeFilter from './components/MultiRangeFilter.vue';

export default {
  name: 'App',
  components: {
    MultiRangeFilter,
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
