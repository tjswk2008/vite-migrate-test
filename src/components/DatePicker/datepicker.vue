<template>
  <div v-if="show" ref="datepicker" class="cp-datepicker" @touchmove.prevent>
    <transition name="fade" mode="out-in">
      <div class="pickerBoxBg" @touchmove="_stopDef" @mousewheel="_stopDef">
        <div v-show="show" class="pickerBox" @mousewheel="_stopDef">
          <div class="pickerBoxWrapper">
            <div class="pickerBoxTitle">
              <div class="title">选择时间</div>
              <ul>
                <li>年</li>
                <li>月</li>
                <li>日</li>
              </ul>
            </div>
            <div class="pickerBoxContent">
              <div class="pickerBoxContentList">
                <ul
                  :class="{'first_dragging': yearState.dragging}"
                  :style="{'transform' : 'translate3d(0,' + yearState.translateY + 'px, 0)'}"
                  @touchstart="_onTouchStart('year', $event)"
                  @mousedown="_onTouchStart('year', $event)"
                >
                  <li />
                  <li />
                  <li
                    v-for="(item, index) in yearState.data"
                    ref="list-box"
                    :key="index"
                    :class="{
                      'current': item === yearState.selectedId,
                      'node1': Math.abs(index - yearState.index) == 1,
                      'node2': Math.abs(index - yearState.index) == 2,
                      'node3': Math.abs(index - yearState.index) >= 3
                    }"
                  >
                    {{ item }}
                  </li>
                  <li />
                  <li />
                </ul>
                <div class="ProvCitySelectedTop" />
                <div class="ProvCitySelectedBottom" />
              </div>
              <div class="pickerBoxContentList">
                <ul
                  :class="{'second_dragging': monthState.dragging}"
                  :style="{'transform' : 'translate3d(0,' + monthState.translateY + 'px, 0)'}"
                  @touchstart="_onTouchStart('month', $event)"
                  @mousedown="_onTouchStart('month', $event)"
                >
                  <li />
                  <li />
                  <li
                    v-for="(item, index) in monthState.data"
                    :key="index"
                    :class="{
                      'current': item === monthState.selectedId,
                      'node1': Math.abs(index - monthState.index) == 1,
                      'node2': Math.abs(index - monthState.index) == 2,
                      'node3': Math.abs(index - monthState.index) >= 3
                    }"
                  >
                    {{ item }}
                  </li>
                  <li />
                  <li />
                </ul>
                <div class="ProvCitySelectedTop" />
                <div class="ProvCitySelectedBottom" />
              </div>
              <div class="pickerBoxContentList">
                <ul
                  ref:area-list
                  :class="{'third_dragging': dayState.dragging}"
                  :style="{'transform' : 'translate3d(0,' + dayState.translateY + 'px, 0)'}"
                  @touchstart="_onTouchStart('day', $event)"
                  @mousedown="_onTouchStart('day', $event)"
                >
                  <li />
                  <li />
                  <li
                    v-for="(item, index) in dayState.data"
                    :key="index"
                    :class="{
                      'current': item === dayState.selectedId,
                      'node1': Math.abs(index - dayState.index) == 1,
                      'node2': Math.abs(index - dayState.index) == 2,
                      'node3': Math.abs(index - dayState.index) >= 3
                    }"
                  >
                    {{ item }}
                  </li>
                  <li />
                  <li />
                </ul>
                <div class="ProvCitySelectedTop" />
                <div class="ProvCitySelectedBottom" />
              </div>
            </div>

          </div>
          <div class="pickerBoxConfirm" @click="submit">
            {{ confirm }}
          </div>
          <div class="pickerBoxCancle" @click="esc" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  props: {
    initialDate: {
      type: String,
      default: null
    },
    'propsResult': {
      type: Object,
      default: null
    },
    'propsShow': {
      type: Boolean,
      default: false
    },
    'startYear': {
      type: Number,
      default: 2000
    },
    'startMonth': {
      type: Number,
      default: 1
    },
    'startDay': {
      type: Number,
      default: 1
    },
    'endYear': {
      type: Number,
      default: 2049
    },
    'endMonth': {
      type: Number,
      default: 12
    },
    'endDay': {
      type: Number,
      default: null
    },
    'confirm': {
      type: String,
      default: '确定'
    }
  },
  data: function() {
    return {
      show: this.propsShow,
      result: this.propsResult,
      firstShow: true,
      target: '',
      yearState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      },
      monthState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      },
      dayState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      },
      delta: 0,
      slideEls: null
    };
  },
  watch: {
    propsShow: function(newVal) {
      this.show = newVal;
    },
    initialDate: function() {
      this.initData();
    },
    show: function(newVal) {
      this.$emit('setDialogVisible', newVal);
      this.transToToday();
    }
  },
  mounted: function() {
    this.initData();
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
  },
  methods: {
    computedYear() {
      const year = this.endYear ? this.endYear : new Date().getFullYear();
      let yearData = [];

      for (let i = this.startYear; i <= year; i++) {
        yearData.push(i);
      }

      return yearData;
    },
    computedMonth() {
      let monthData = [];

      const startControl = this.startControlComputed();
      const endControl = this.endControlComputed();
      const sameResult = this.sameComputed();

      // 开始年份限制 计算最小月
      if (startControl.yearFlag && !sameResult.sameYear) {
        const minMonth = this.startMonth;
        for (let i = minMonth; i <= 12; i++) {
          monthData.push(i);
        }
        return monthData;
      }
      // 结束年份限制 计算最大月
      if (endControl.yearFlag && !sameResult.sameYear) {
        const maxMonth = this.endMonth;
        for (let i = 1; i <= maxMonth; i++) {
          monthData.push(i);
        }
        return monthData;
      }
      // 开始与结束年份限制， 且年份相同 计算最小月-最大月
      if (startControl.yearFlag && endControl.yearFlag && sameResult.sameYear) {
        const minMonth = this.startMonth;
        const maxMonth = this.endMonth;
        for (let i = minMonth; i <= maxMonth; i++) {
          monthData.push(i);
        }
        return monthData;
      }

      // 无限制
      for (let i = 1; i <= 12; i++) {
        monthData.push(i);
      }

      return monthData;
    },
    computedDay() {
      let dayData = [];
      const year = this.yearState.selectedId;
      const month = this.monthState.selectedId;
      const current = new Date(year, month, 0);
      var currentDay = current.getDate();

      const startControl = this.startControlComputed();
      const endControl = this.endControlComputed();
      const sameResult = this.sameComputed();

      const startFlag = startControl.yearFlag && startControl.monthFlag;
      const endFlag = endControl.yearFlag && endControl.monthFlag;
      const startEndSame = sameResult.sameYear && sameResult.sameMonth;

      // 开始年月限制 计算最小日
      if (startFlag && !startEndSame) {
        const minDay = this.startDay;
        for (let i = minDay; i <= currentDay; i++) {
          dayData.push(i);
        }
        return dayData;
      }

      // 结束年月限制 计算最最大日
      if (endFlag && !startEndSame) {
        const maxDay = this.endDay || currentDay;
        for (let i = 1; i <= maxDay; i++) {
          dayData.push(i);
        }
        return dayData;
      }

      // 开始年月和结束年月限制 计算最小日-最大日
      if (startFlag && endFlag && startEndSame) {
        const minDay = this.startDay;
        const maxDay = this.endDay || currentDay;
        for (let i = minDay; i <= maxDay; i++) {
          dayData.push(i);
        }
        return dayData;
      }

      // 无限制
      for (let i = 1; i < currentDay + 1; i++) {
        dayData.push(i);
      }
      return dayData;
    },
    startControlComputed() {
      let startControlResult = {};
      startControlResult.yearFlag = this.yearState.selectedId === this.startYear;
      startControlResult.monthFlag = this.monthState.selectedId === this.startMonth;
      return startControlResult;
    },
    endControlComputed() {
      let endControlResult = {};
      endControlResult.yearFlag = this.yearState.selectedId === this.endYear;
      endControlResult.monthFlag = this.monthState.selectedId === this.endMonth;
      return endControlResult;
    },
    sameComputed() {
      let sameResult = {};
      sameResult.sameYear = this.startYear === this.endYear;
      sameResult.sameMonth = this.startMonth === this.endMonth;
      return sameResult;
    },
    initData() {
      let curDate = new Date();
      if (!/^请选择/.test(this.initialDate)) {
        curDate = new Date(this.initialDate);
      }
      const yearState = this.yearState;
      const monthState = this.monthState;
      const dayState = this.dayState;
      yearState.data = this.computedYear();
      yearState.selectedId = curDate.getFullYear();

      this.filterMonth();
      monthState.selectedId = curDate.getMonth() + 1;

      this.filterDay();
      dayState.selectedId = curDate.getDate();
    },
    transToToday() {
      const yearState = this.yearState;
      const monthState = this.monthState;
      const dayState = this.dayState;
      let _this = this;

      this.$nextTick(() => {
        setTimeout(() => {
          if (!_this.$refs['list-box'] || !_this.$refs['list-box'].length) return;
          const height = _this.$refs['list-box'][0].getBoundingClientRect().height;
          for (let i = 0; i < yearState.data.length; i++) {
            if (yearState.selectedId === yearState.data[i]) {
              yearState.index = i;
            }
          }
          yearState.translateY = -height * yearState.index;

          for (let i = 0; i < monthState.data.length; i++) {
            if (monthState.selectedId === monthState.data[i]) {
              monthState.index = i;
            }
          }
          monthState.translateY = -height * monthState.index;

          for (let i = 0; i < dayState.data.length; i++) {
            if (dayState.selectedId === dayState.data[i]) {
              dayState.index = i;
            }
          }
          dayState.translateY = -height * dayState.index;
        }, 300);
      });
    },
    submit() {
      this.$refs.datepicker.className += ' fadeOut';
      let t = setTimeout(() => {
        this.result = {
          'year': this.yearState.data[this.yearState.index],
          'month': this.monthState.data[this.monthState.index],
          'day': this.dayState.data[this.dayState.index]
        };
        this.$emit('setDate', this.result);
        this.show = false;
        this.initData();
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        clearTimeout(t);
      }, 300);
    },
    esc() {
      this.$refs.datepicker.className += ' fadeOut';
      let t = setTimeout(() => {
        this.show = false;
        this.$emit('escDate');
        this.initData();
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        clearTimeout(t);
      }, 300);
    },
    filterMonth() {
      this.monthState.data = this.computedMonth();

      this.monthState.selectedId = this.monthState.data[0];
      this.monthState.translateY = 0;
      this.monthState.index = 0;
    },
    filterDay() {
      this.dayState.data = this.computedDay();

      this.dayState.selectedId = this.dayState.data[0];
      this.dayState.translateY = 0;
      this.dayState.index = 0;
    },
    getSelectedData(index) {
      let target = this.target;
      let thisData = this[target + 'State'];
      thisData.selectedId = thisData.data[index];

      if (target === 'year') {
        this.filterMonth();
        this.filterDay();
      }
      if (target === 'month') {
        this.filterDay();
      }
    },
    setPage() {
      let target = this.target;
      let thisData = this[target + 'State'];
      let clientHeight = this.slideEls[0].getBoundingClientRect().height;
      let total = thisData.data.length;
      let goPage = Math.round((thisData.translateY / clientHeight).toFixed(1));
      if (goPage > 0) {
        goPage = 0;
      }
      goPage = total - 1 >= Math.abs(goPage) ? goPage : -(total - 1);
      let index = Math.abs(goPage);
      thisData.index = index;
      this.getSelectedData(index);
      thisData.translateY = goPage * clientHeight;
    },
    _getTouchPos(e) {
      return e.changedTouches ? e.changedTouches[0]['pageY'] : e['pageY'];
    },
    _getElem(e) {
      return Array.from(e.currentTarget.children).slice(3, -3);
    },
    _onTouchStart(target, e) {
      let thisData = this[target + 'State'];
      this.target = target;
      this.slideEls = this._getElem(e);
      this.delta = 0;
      thisData.startPos = this._getTouchPos(e);
      thisData.startTranslateY = thisData.translateY;
      thisData.dragging = true;
      document.addEventListener('touchmove', this._onTouchMove, false);
      document.addEventListener('touchend', this._onTouchEnd, false);
      document.addEventListener('mousemove', this._onTouchMove, false);
      document.addEventListener('mouseup', this._onTouchEnd, false);
    },
    _onTouchMove(e) {
      let target = this.target;
      let thisData = this[target + 'State'];
      this.delta = this._getTouchPos(e) - thisData.startPos;
      thisData.translateY = thisData.startTranslateY + this.delta;
      if (Math.abs(this.delta) > 0) {
        e.stopPropagation();
      }
    },
    _onTouchEnd() {
      let target = this.target;
      let thisData = this[target + 'State'];
      thisData.dragging = false;
      this.setPage();
      document.removeEventListener('touchmove', this._onTouchMove);
      document.removeEventListener('touchend', this._onTouchEnd);
      document.removeEventListener('mousemove', this._onTouchMove);
      document.removeEventListener('mouseup', this._onTouchEnd);
    },
    _stopDef(e) {
      e.preventDefault();
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cp-datepicker
  width: 100%;
  height: 100%;
  animation fadeIn 0.3s ease-in-out
  &.fadeOut {
    animation fadeOut 0.3s ease-in-out
    animation-fill-mode forwards
  }
  .pickerBoxBg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 200;
    position: fixed;
    top:0;
    left:0;
  }
  .pickerBox
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 300;
    width 7.0rem;
    height 6.2rem
    border-radius: 0.1rem;
    background-color: rgb(19, 17, 17);
    color: #ffffff
    .pickerBoxWrapper
      width: 5.94rem;
      margin: 0 auto;
      position relative
    .pickerBoxTitle
      border-bottom: 0.01rem solid #2c2c2b;
      overflow :hidden;
      .title
        font-size: 0.36rem;
        text-align center;
        height: 1.13rem;
        padding: 0.35rem 0;
        color: rgb(178, 145, 80);
        font-weight: bold;
        line-height: 1;
        border-bottom 1px solid #2c2c2b
      ul
        width: 100%;
        overflow: hidden;
        margin: 0.23rem auto;
        display flex
        li
          float: left;
          width: 0.88rem;
          margin-left: 0.85rem;
          text-align center;
          font-size: 0.24rem;
  .pickerBoxCancle
    position absolute
    top: 0.2rem;
    right: 0.2rem;
    width: 0.34rem;
    height: 0.34rem;
    background url('./images/close.png') no-repeat
    background-size 100% 100%
  .pickerBoxConfirm
    background-color: rgb(178, 145, 80);
    position: absolute;
    left: 50%;
    margin-left: -1.25rem;
    bottom: 0.35rem;
    width: 2.50rem;
    height: 0.83rem;
    border-radius: 0.415rem
    font-size: 0.36rem;
    line-height: 0.83rem;
    text-align: center
    color: #1a191f
    font-weight: bold
  .pickerBoxContent
    width: 100%
    margin: 0 auto;
    background: rgb(19, 17, 17);
    overflow: hidden;
    height: 2.65rem;
    overflow: hidden;
    display flex
  .pickerBoxContentList
    float: left;
    width: 0.88rem;
    margin-left: 0.85rem;
    text-align: center;
    background-color rgb(19, 17, 17);
    ul
      -webkit-transition: all .3s ease;
      transition: all .3s ease;
      background-color rgb(19, 17, 17);
      &.first_dragging,
      &.second_dragging,
      &.third_dragging
        -webkit-transition: none;
        transition: none;
    li
      line-height: 0.53rem;
      height: 0.53rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.24rem;
      background-color rgb(19, 17, 17);
      &.current
        font-size: 0.24rem;
      &.node1
        font-size: 0.24rem;
        color: #e6e6e6
        // opacity: .7;
      &.node2
        font-size: 0.24rem;
        color: #494949
        // opacity: .5;
      &.node3
        font-size: 0.24rem;
        color #212121
  .ProvCitySelectedTop
    width: 0.88rem;
    border: none;
    border-top: 0.01rem solid #8d7350;
    position: absolute;
    bottom: 1.59rem;
    margin: 0;
    height: 0;
  .ProvCitySelectedBottom
    width: 0.88rem;
    border: none;
    border-top: 0.01rem solid #8d7350;
    position: absolute;
    bottom: 1.06rem;
    margin: 0;
    height: 0;
  @keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
  }
  @keyframes fadeOut {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
  }
</style>
