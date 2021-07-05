<template>
  <div ref="wrapper" class="cp-auto-scroll">
    <div ref="ulDom">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      interval: null
    };
  },
  mounted() {
    window.requestAnimationFrame(this.autoScroll.bind(this));
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.$refs.wrapper.onmouseover = null;
    this.$refs.wrapper.onmouseout = null;
  },
  methods: {
    autoScroll() {
      if (!this.$refs.wrapper) return;
      var speed = 50; // 设置向上轮动的速度
      let that = this;
      this.interval = setInterval(this.moveTop.bind(this), speed);
      this.$refs.wrapper.onmouseover = function() {
        clearInterval(that.interval);
      }
      this.$refs.wrapper.onmouseout = () => {
        that.interval = setInterval(() => {
          that.moveTop();
        }, speed);
      }
    },
    moveTop() {
      if (!this.$refs.wrapper) return;
      var sh = this.$refs.wrapper.getBoundingClientRect().height;
      var st = this.$refs.wrapper.scrollTop;
      var mt = this.$refs.ulDom.scrollHeight;
      if (sh + st + 1 > mt) {
        this.$refs.wrapper.scrollTop = 0;
      } else if (this.$refs.wrapper) {
        this.$refs.wrapper.scrollTop++;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
  .cp-auto-scroll
    width: 100%;
    height: auto;
    overflow: scroll;
    background: #fff;
    font-size 0.24rem;
</style>
