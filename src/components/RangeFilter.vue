<template>
  <div>
    <div>{{lowerVal}}<br>{{upperVal}}</div>
    <div class="range-filter">
      <div class="range">
        <input class="range__input" type="number" :min="min" :max="upperVal" v-model="lowerVal">
        <input class="range__input" type="number" :min="lowerVal" :max="max" v-model="upperVal">
      </div>

      <div class="slider" :style="styles.slider">
        <div class="slider__rail" :style="styles.rail"></div>
        <div
          class="slider__inactive-rail"
          :style="[styles.rail, { width: `${lowerPercentageRatio}%` }]"
        ></div>
        <div
          class="slider__inactive-rail slider__inactive-rail_right"
          :style="[styles.rail, { width: `${100 - upperPercentageRatio}%` }]"
        ></div>

        <div class="slider__slide-zone" :style="styles.slideZone">
          <div
            class="slider__dot"
            ref="lower"
            :style="[styles.dot, { left: `${lowerPercentageRatio}%` }]"
            @mousedown="dragStart($event, 'lowe')"
            @touchstart="dragStart($event, 'lower')"
          ></div>
          <div
            class="slider__dot"
            ref="upper"
            :style="[styles.dot, { left: `${upperPercentageRatio}%` }]"
            @mousedown="dragStart($event, 'upper')"
            @touchstart="dragStart($event, 'upper')"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const getOffsetX = (elem) => {
  const { body, documentElement: doc } = document;
  const { left } = elem.getBoundingClientRect();
  const { pageXOffset } = window;
  const offsetX = left + (pageXOffset || doc.scrollLeft) - (doc.clientLeft || body.clientLeft || 0);

  return offsetX;
};

/**
 * Получить координаты по оси X
 * клика относительно элемента
 *
 * @param {MouseEvent|TouchEvent} e
 * @param {HTMLDivElement} elem - element relative to which coordinate X is calculated
 *
 * @returns {number} - X axis value
 */
const getEventOffsetXRelativeToElem = (e, elem) => {
  const event = e.targetTouches ? e.targetTouches[0] : e;
  const elemOffsetX = getOffsetX(elem);
  const eventOffsetXFromElem = event.pageX - elemOffsetX;

  return eventOffsetXFromElem;
};

export default {
  name: 'RangeFilter',
  props: {
    min: {
      default: 0,
    },
    max: {
      default: 100,
    },
    dotSize: {
      default: 16,
    },
    railWidth: {
      default: 4,
    },
    lazy: {
      default: false,
    },
  },
  data() {
    return {
      lowerVal: this.min,
      upperVal: this.max,
      gap: 100 / (this.max - this.min),
      currentDraggableDot: null,
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
    lowerPercentageRatio() {
      return (this.lowerVal - this.min) * this.gap;
    },
    upperPercentageRatio() {
      return (this.upperVal - this.min) * this.gap;
    },
    dotValueRanges() {
      return {
        lower: [this.min, this.upperVal],
        upper: [this.lowerVal, this.max],
      };
    },
  },
  methods: {
    dragStart(e, dotId) {
      this.currentDraggableDot = dotId;
      e.preventDefault();
    },
    dragMove() {
      if (!this.currentDraggableDot) {
        return;
      }

    },
    dragEnd() {
      this.currentDraggableDot = null;
    },
    getValidPos(pos, dotId) {

    },
    bindEvents() {
      document.addEventListener('touchmove', this.dragMove);
      document.addEventListener('touchend', this.dragEnd);
      document.addEventListener('mousemove', this.dragMove);
      document.addEventListener('mouseup', this.dragEnd);
      document.addEventListener('mouseleave', this.dragEnd);
    },
    unbindEvents() {
      document.removeEventListener('touchmove', this.dragMove);
      document.removeEventListener('touchend', this.dragEnd);
      document.removeEventListener('mousemove', this.dragMove);
      document.removeEventListener('mouseup', this.dragEnd);
      document.removeEventListener('mouseleave', this.dragEnd);
    },
  },
  mounted() {
    this.bindEvents();
  },
  beforeDestroy() {
    this.unbindEvents();
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
    transition: width .15s ease-in-out;

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
