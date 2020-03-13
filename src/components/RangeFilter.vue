<template>
  <div>
    <!-- <div>{{values.lower}}<br>{{values.upper}}</div> -->
    <div class="range-filter">
      <div class="range-filter__header">
        <div class="range-filter__title">
          {{ title }}, <span class="range-filter__postfix">{{ titlePostfix }}</span>
        </div>
        <button
          class="range-filter__toggle-btn"
          :class="{ 'range-filter__toggle-btn_opened': !collapsed }"
          @click="collapsed = !collapsed"
        >toggle</button>
      </div>

      <div
        class="range-filter__collapsible"
        :class="{ 'range-filter__collapsible_collapsed': collapsed }"
      >
        <div class="range">
          <input
            class="range__input"
            type="number"
            :min="min"
            :max="values.upper"
            v-model="values.lower"
            @input="setPosByValue($event.target.value, 'lower')"
          >
          <span class="range__separator">–</span>
          <input
            class="range__input"
            type="number"
            :min="values.lower"
            :max="max"
            v-model="values.upper"
            @input="setPosByValue($event.target.value, 'upper')"
          >
        </div>

        <div class="slider" :style="styles.slider" ref="slider">
          <div class="slider__rail" :style="styles.rail"></div>
          <div
            class="slider__inactive-rail"
            :style="[styles.rail, { width: `${dotsPositions.lower}%` }]"
          ></div>
          <div
            class="slider__inactive-rail slider__inactive-rail_right"
            :style="[styles.rail, { width: `${100 - dotsPositions.upper}%` }]"
          ></div>

          <div class="slider__slide-zone">
            <div
              class="slider__dot"
              ref="lower"
              :style="[styles.dot, { left: `${dotsPositions.lower}%` }]"
              @mousedown="dragStart($event, 'lower')"
              @touchstart="dragStart($event, 'lower')"
            ></div>
            <div
              class="slider__dot"
              ref="upper"
              :style="[styles.dot, { left: `${dotsPositions.upper}%` }]"
              @mousedown="dragStart($event, 'upper')"
              @touchstart="dragStart($event, 'upper')"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEventOffsetXRelativeToElem } from './utils';

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
    resetBtn: {
      default: false,
    },
    title: String,
    titlePostfix: String,
    presets: Array,
  },
  data() {
    return {
      collapsed: true,
      values: {
        lower: this.min,
        upper: this.max,
      },
      dotsPositions: {
        lower: 0,
        upper: 100,
      },
      gap: 100 / (this.max - this.min), // distance between each value (%)
      scale: 1,
      currentDraggableDot: null,
      styles: {
        slider: {
          height: `${this.dotSize}px`,
          marginLeft: `${this.dotSize / 2}px`,
          marginRight: `${this.dotSize / 2}px`,
        },
        rail: {
          height: `${this.railWidth}px`,
        },
        dot: {
          // 2px - double border size
          width: `${this.dotSize - 2}px`,
          height: `${this.dotSize - 2}px`,
        },
      },
    };
  },
  computed: {
    dotValueRanges() {
      return {
        lower: [0, this.dotsPositions.upper],
        upper: [this.dotsPositions.lower, 100],
      };
    },
  },
  methods: {
    setScale() {
      this.scale = Math.floor(this.$refs.slider.offsetWidth) / 100;
    },
    dragStart(e, sideId) {
      this.currentDraggableDot = sideId;
      e.preventDefault();
    },
    dragMove(e) {
      if (!this.currentDraggableDot) {
        return;
      }

      e.preventDefault();
      const pos = getEventOffsetXRelativeToElem(e, this.$refs.slider) / this.scale;
      this.setDotPos(pos, this.currentDraggableDot);
    },
    dragEnd() {
      if (!this.currentDraggableDot) {
        return;
      }

      this.currentDraggableDot = null;
    },
    setDotPos(pos, sideId) {
      const validPos = this.getValidPos(pos, sideId);
      const changePos = this.dotsPositions[sideId] - validPos;

      if (!changePos) {
        return;
      }

      this.dotsPositions[sideId] = validPos;
      this.setValueByPos(validPos, sideId);
    },
    getValidPos(pos, sideId) {
      const range = this.dotValueRanges[sideId];

      if (pos < range[0]) {
        return range[0];
      }

      if (pos > range[1]) {
        return range[1];
      }

      return pos;
    },
    setValueByPos(pos, sideId) {
      this.values[sideId] = Math.floor(pos / this.gap + parseInt(this.min, 10));
    },
    setPosByValue(val, sideId) {
      const newPos = (val - this.min) * this.gap;
      const validPos = this.getValidPos(newPos, sideId);

      this.dotsPositions[sideId] = validPos;
    },
    bindEvents() {
      document.addEventListener('touchmove', this.dragMove, { passive: false });
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
    this.setScale();
    this.bindEvents();
  },
  beforeDestroy() {
    this.unbindEvents();
  },
};
</script>

<style lang="less">
.range-filter {
  padding: 16px 16px 32px;

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  &__title {
    font-size: 16px;
    line-height: 24px;
    color: #333333;
  }

  &__postfix {
    color: #A6A6A6;
  }

  &__toggle-btn {

    @media screen and (min-width: 1200px) {
      display: none;
    }

    &_opened {
      background-color: aquamarine;
    }
  }

  &__collapsible {
    &_collapsed {
      display: none;

      @media screen and (min-width: 1200px) {
        display: block;
      }
    }
  }

  .range {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__input {
      width: 100%;
      flex: 1;
      font-size: 16px;
      line-height: 22px;
      padding: 8px 16px;
      border: 1px solid #DFDFDF;
      border-radius: 4px;
      -moz-appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    &__separator {
      margin-left: 2px;
      margin-right: 2px;
    }
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
      // transition: width .15s ease-in-out;

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
      // transition: left .15s ease-in-out;
      cursor: pointer;

      &:active {
        background-color: #dadada;
      }
    }
  }
}
</style>
