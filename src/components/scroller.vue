<template>
  <div ref="wrapper" class="cp-scroller">
    <div ref="ulDom">
      <slot />
      <div>
        <!-- <PullingWord v-show="!inPullUp && dataList.length > 0" :loading-word="beforePullUpWord" /> -->
        <div v-if="inPullUp && !isEnd" class="loadingContainer">
          <div class="loadEffect">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div>{{ PullingUpWord }}</div>
        </div>
        <div v-if="isEnd" class="loaded">加载完毕，没有更多数据了~</div>
      </div>
    </div>
  </div>
</template>

<script >
// import PullingWord from './pulling-word.vue'
const PullingUpWord = '正在拼命加载中...';
const beforePullUpWord = '上拉加载更多';
export default {
  // components: { PullingWord },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    isEnd: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  data() {
    return {
      scroll: null,
      inPullUp: false,
      beforePullUpWord,
      PullingUpWord,
      continuePullUp: true
    }
  },

  mounted() {
    this.$refs.wrapper.addEventListener('scroll', this.scrollBottomHandler);
  },
  beforeDestroy() {
    this.$refs.wrapper.removeEventListener('scroll', this.scrollBottomHandler)
  },
  methods: {
    scrollBottomHandler() {
      window.requestAnimationFrame(() => {
        var sh = this.$refs.wrapper.getBoundingClientRect().height;
        var st = this.$refs.wrapper.scrollTop;
        var mt = this.$refs.ulDom.scrollHeight;
        // console.log(`st: ${st}, mt: ${mt}, sh+st: ${sh+st}`);
        if (sh + st + 1 > mt) {
          // this.fetchData();
          this.$emit('onPullUp', '当前状态：上拉加载');
          this.PullingUpWord = PullingUpWord;
          this.inPullUp = true;
        } else {
          this.inPullUp = false;
        }
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cp-scroller {
    width: 100%;
    height: auto;
    overflow: scroll;
    background: #fff;
    font-size 0.24rem;
  }

  .pullup-wrapper{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.16rem 0;
  }

  .loaded {
    height 1rem;
    font-size 0.24rem;
    text-align center;
    line-height 1rem
  }

  .loadingContainer {
    display flex
    justify-content center
    align-items center
    height 1rem
  }

  .loadEffect{
      width: 0.5rem;
      height: 0.5rem;
      position: relative;
      margin-right: 0.14rem;
  }
  .loadEffect span{
      display: inline-block;
      width: 0.10rem;
      height: 0.10rem;
      border-radius: 50%;
      background: grey;
      position: absolute;
      -webkit-animation: load 1.04s ease infinite;
  }

  .loadEffect span:nth-child(1){
      left: 0;
      top: 50%;
      margin-top: -0.05rem;
      -webkit-animation-delay:0.13s;
  }
  .loadEffect span:nth-child(2){
      left: 0.07rem;
      top: 0.07rem;
      -webkit-animation-delay:0.26s;
  }
  .loadEffect span:nth-child(3){
      left: 50%;
      top: 0;
      margin-left: -0.05rem;
      -webkit-animation-delay:0.39s;
  }
  .loadEffect span:nth-child(4){
      top: 0.07rem;
      right: 0.07rem;
      -webkit-animation-delay:0.52s;
  }
  .loadEffect span:nth-child(5){
      right: 0;
      top: 50%;
      margin-top: -0.05rem;
      -webkit-animation-delay:0.65s;
  }
  .loadEffect span:nth-child(6){
      right: 0.07rem;
      bottom: 0.07rem;
      -webkit-animation-delay:0.78s;
  }
  .loadEffect span:nth-child(7){
      bottom: 0;
      left: 50%;
      margin-left: -0.05rem;
      -webkit-animation-delay:0.91s;
  }
  .loadEffect span:nth-child(8){
      bottom: 0.07rem;
      left: 0.07rem;
      -webkit-animation-delay:1.04s;
  }

  @-webkit-keyframes load{
      0%{
          -webkit-transform: scale(1.2);
          opacity: 1;
      }
      100%{
          -webkit-transform: scale(.3);
          opacity: 0.5;
      }
  }

</style>
