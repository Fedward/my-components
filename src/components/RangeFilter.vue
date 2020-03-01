<template>
  <div>
    <div>{{currentMin}}<br>{{currentMax}}</div>
    <div class="range-filter">
      <div class="range">
        <input type="text" v-model="lowerPos">
        <input type="text" v-model="upperPos">
      </div>

      <div class="slider" :style="styles.slider">
        <div class="slider__rail" :style="styles.rail"></div>
        <div class="slider__inactive-rail" :style="styles.rail"></div>
        <div class="slider__inactive-rail slider__inactive-rail_right" :style="styles.rail"></div>
        <div class="slider__slide-zone" :style="styles.slideZone">
          <div
            class="slider__dot"
            ref="lower"
            :style="[styles.dot, { left: `${lowerPos}%` }]"
          ></div>
          <div
            class="slider__dot"
            ref="upper"
            :style="[styles.dot, { left: `${upperPos}%` }]"
            @mousedown="dragStart"
            @touchstart="dragStart"
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

const getAvailableRangeForDot = () => {};

export default {
  name: 'RangeFilter',
  props: ['min', 'max', 'dotSize', 'railWidth'],
  data() {
    return {
      currentMin: this.min,
      currentMax: this.max,
      lowerPos: 0,
      upperPos: 100,
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
