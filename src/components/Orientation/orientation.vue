<template>
  <div v-if="isLandscape" class="cp-orientation">
    <div class="horizon-box">
      <div class="horizon-pic"><i /></div>
      <span>为了更好的体验，请将手机竖过来哦~</span>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isLandscape: false
    }
  },
  mounted() {
    this.checkOrientation();
    let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(resizeEvt, this.checkOrientation, false);
  },
  beforeDestroy() {
    let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    window.removeEventListener(resizeEvt, this.checkOrientation);
  },
  methods: {
    onOrientationChange() {
      let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
      let _this = this;
      window.addEventListener(resizeEvt, () => {
        setTimeout(() => {
          _this.checkOrientation();
        }, 300);
      }, false);
    },
    checkOrientation() {
      let ww = window.innerWidth;
      let wh = window.innerHeight;
      if (ww > wh) {
        this.isLandscape = true;
      } else {
        this.isLandscape = false;
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cp-orientation
  width: 100%;
  height: 100%;
  background: #000;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;

  .horizon-box
      width: 100%;
      height: 2.52rem;
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -1.19rem;

      .horizon-pic
          width: 1.01rem;
          height: 1.71rem;
          background: url(./images/pm.jpg) 0 0 no-repeat;
          background-size: 1.01rem 1.71rem;
          margin: 0 auto;
          position: static;
          display: block;
      span
          font-size: 0.16rem;
          display: block;
          color: #a69d6e;
          text-align: center;
          padding-top: 0.10rem;
</style>
