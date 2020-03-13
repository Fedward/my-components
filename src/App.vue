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

<style lang="less">
@import (css) url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');

body {
  margin: 0;
}

#app {
  font-family: 'Roboto', sans-serif;
  margin: auto;
  background-color: #F7F7F7;
  border-radius: 4px;

  & > *:not(:last-child) {
    border-bottom: 1px solid #DFDFDF;;
  }
}
</style>
