<template>
  <div>
    <div>{{lowerVal}}<br>{{upperVal}}</div>
    <div class="range-filter">
      <div class="range">
        <input type="number" :min="min" :max="upperVal" v-model="lowerVal">
        <input type="number" :min="lowerVal" :max="max" v-model="upperVal">
      </div>

      <div class="slider" :style="styles.slider">
        <div class="slider__rail" :style="styles.rail"></div>
        <div
          class="slider__inactive-rail"
          :style="[styles.rail, { width: `${lowerRatio}%` }]"
        ></div>
        <div
          class="slider__inactive-rail slider__inactive-rail_right"
          :style="[styles.rail, { width: `${100 - upperRatio}%` }]"
        ></div>

        <div class="slider__slide-zone" :style="styles.slideZone">
          <div
            class="slider__dot"
            ref="lower"
            :style="[styles.dot, { left: `${lowerRatio}%` }]"
            @mousedown="dragStart($event, 'lower')"
            @touchstart="dragStart($event, 'lower')"
          ></div>
          <div
            class="slider__dot"
            ref="upper"
            :style="[styles.dot, { left: `${upperRatio}%` }]"
            @mousedown="dragStart($event, 'upper')"
            @touchstart="dragStart($event, 'upper')"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const getOffset = (elem) => {
  const { body, documentElement: doc } = document;
  const { top, left } = elem.getBoundingClientRect();
  const offset = {
    x: left + (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || body.clientLeft || 0),
    y: top + (window.pageYOffset || doc.scrollTop) - (doc.clientTop || body.clientTop || 0),
  };
  return offset;
};

/**
 * Получить координаты клика относительно
 * верхнего левого угла элемента
 *
 * @param {MouseEvent|TouchEvent} e
 * @param {HTMLDivElement} elem - element relative to which coordinates are calculated
 *
 * @returns {object} - coords x,y
 */
const getCoordsRelativeToElem = (e, elem) => {
  const event = 'targetTouches' in e ? e.targetTouches[0] : e;
  const elemOffset = getOffset(elem);

  return {
    x: event.pageX - elemOffset.x,
    y: event.pageY - elemOffset.y,
  };
};

export default {
  name: 'RangeFilter',
  props: ['min', 'max', 'dotSize', 'railWidth'],
  data() {
    return {
      lowerVal: Number.parseInt(this.min, 10),
      upperVal: Number.parseInt(this.max, 10),
      lowerPos: 0,
      upperPos: 100,
      intervalSize: this.max - this.min,
      haha: '',
      styles: {
        slider: {
          height: `${this.dotSize}px`,
        },
        rail: {
          height: `${this.railWidth}px`,
        },
        slideZone: {
          marginLeft: `${this.dotSize / 2}px`,
          marginRight: `${this.dotSize / 2}px`,
        },
        dot: {
          width: `${this.dotSize - 2}px`,
          height: `${this.dotSize - 2}px`,
        },
      },
    };
  },
  computed: {
    lowerRatio() {
      const ratio = (this.lowerVal - this.intervalSize) / this.intervalSize;

      return ratio * 100;
    },
    upperRatio() {
      const ratio = (this.upperVal - this.intervalSize) / this.intervalSize;

      return ratio * 100;
    },
    currentMinPos() {
      return 0;
    },
  },
  created() {
    console.log('interval size', this.intervalSize);
    console.log('lower val', this.lowerVal);
    console.log('upper val', this.upperVal);
  },
  mounted() {
    // this.bindEvents();
  },
  beforeDestroy() {
    // this.unbindEvents();
  },
  methods: {
    dragStart(e, dotId) {
      if (e.type === 'touchstart') {
        console.log('touch');
      } else {
        console.log('mouse');
      }

      // e.preventDefault();
    },
    getValidPos(pos, dotId) {

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
    background-color: #DFDFDF;
    border-radius: 1px;

    &_right {
      right: 0;
    }
  }

  &__slide-zone {
    position: relative;
    height: 100%;
  }

  &__dot {
    position: absolute;
    background-color: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    transform: translateX(-50%);
    transition: left .15s ease-in-out;
    cursor: pointer;

    &:active {
      background-color: #dadada;
    }
  }
}
</style>
