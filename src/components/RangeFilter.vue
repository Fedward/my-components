<template>
  <div>
    <div>{{currentMin}}<br>{{currentMax}}</div>
    <div class="range-filter">
      {{ haha }}
      <div class="slider">
        <div class="slider__rail"></div>
        <div class="slider__inactive-rail"></div>
        <div class="slider__inactive-rail slider__inactive-rail_right"></div>
        <div class="slider__knob" ref="lower"></div>
        <div class="slider__knob" ref="upper" @mousedown="dragStart" @touchstart="dragStart"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RangeFilter',
  props: ['min', 'max', 'knobSize'],
  data() {
    return {
      currentMin: this.min,
      currentMax: this.max,
      minLeftPos: 0,
      maxLeftPos: 0,
      haha: '',
    };
  },
  computed: {
    currentMinPos() {
      return 0;
    },
  },
  mounted() {
    // this.bindEvents();
  },
  beforeDestroy() {
    // this.unbindEvents();
  },
  methods: {
    dragStart(e) {
      if (e.type === 'touchstart') {
        console.log('touch');
      } else {
        console.log('mouse');
      }

      e.preventDefault();
    },
  },
};
</script>

<style lang="less">
.range-filter {
  padding: 16px 24px 32px;
  background-color: #F7F7F7;
}

@knob-size: 16px;
@knob-border-size: 2px;
@slider-height: @knob-size + @knob-border-size;
@rail-height: 4px;

.slider {
  position: relative;
  height: @slider-height;

  &__rail {
    position: absolute;
    top: @slider-height / 2 - @rail-height / 2;
    width: 100%;
    height: @rail-height;
    background-color: #C62828;
    border-radius: 1px
  }

  &__inactive-rail {
    position: absolute;
    top: @slider-height / 2 - @rail-height / 2;
    width: 50px;
    height: @rail-height;
    background-color: #DFDFDF;
    border-radius: 1px;

    &_right {
      right: 0;
      width: 50px;
    }
  }

  &__knob {
    position: absolute;
    width: @knob-size;
    height: @knob-size;
    background-color: #FFFFFF;
    border-radius: 50%;
    border: 1px solid #dadada;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    cursor: pointer;

    &:active {
      background-color: #dadada;
    }
  }
}
</style>
