<template>
  <div>
    <div>{{currentMin}}<br>{{currentMax}}</div>
    <div class="range-filter">
      <div class="range">

      </div>

      <div class="slider" :style="styles.slider">
        <div class="slider__rail" :style="styles.rail"></div>
        <div class="slider__inactive-rail" :style="styles.rail"></div>
        <div class="slider__inactive-rail slider__inactive-rail_right" :style="styles.rail"></div>
        <div class="slider__slide-zone">
          <div class="slider__knob" ref="lower" :style="styles.knob"></div>
          <div class="slider__knob" ref="upper" @mousedown="dragStart" @touchstart="dragStart" :style="styles.knob"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RangeFilter',
  props: ['min', 'max', 'knobSize', 'railWidth'],
  data() {
    return {
      currentMin: this.min,
      currentMax: this.max,
      minLeftPos: 0,
      maxLeftPos: 0,
      haha: '',
      styles: {
        slider: {
          height: `${this.knobSize}px`,
        },
        rail: {
          height: `${this.railWidth}px`,
        },
        slideZone: {

        },
        knob: {
          width: `${this.knobSize}px`,
          height: `${this.knobSize}px`,
        },
      },
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


.slider {
  position: relative;

  &__rail {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    background-color: #C62828;
    border-radius: 1px
  }

  &__inactive-rail {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    background-color: #DFDFDF;
    border-radius: 1px;

    &_right {
      right: 0;
      width: 50px;
    }
  }

  &__slide-zone {
    position: relative;
    height: 100%;
  }

  &__knob {
    position: absolute;
    background-color: #FFFFFF;
    border-radius: 50%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    transform: translateX(-50%);
    cursor: pointer;

    &:active {
      background-color: #dadada;
    }
  }
}
</style>
