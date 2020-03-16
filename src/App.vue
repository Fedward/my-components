<template>
  <div id="app">
    {{ range }}
    <RangeFilter
      name="price"
      title="Price"
      titlePostfix="usd"
      :min="100"
      :max="300"
      :presets="[
        { text: 'Any' },
        { text: '120-240', range: [120, 240]}
      ]"
      @change="range = $event"
    />
  </div>
</template>

<script>
import RangeFilter from './components/RangeFilter.vue';

export default {
  name: 'App',
  data() {
    return {
      range: [0, 0],
    };
  },
  components: {
    RangeFilter,
  },
};
</script>

<style lang="less">
@import (css) url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');

body {
  margin: 0;
}

#app {
  font-family: 'Roboto', sans-serif;
  margin: auto;
  border-radius: 4px;

  & > *:not(:last-child) {
    border-bottom: 1px solid #DFDFDF;;
  }

  @media screen and (min-width: 1200px) {
    background-color: #F7F7F7;
  }
}
</style>
