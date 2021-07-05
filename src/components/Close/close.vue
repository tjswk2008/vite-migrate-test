<template>
  <div class="cp-close">
    <div :class="[isMobile ? 'mobile' : 'site']" @click="handleClose($event)" />
  </div>
</template>
<style rel="stylesheet/stylus" lang="stylus" scoped>
  .cp-close
    .site
      position absolute
      margin-left 27px
      margin-top 32px
      width 31px
      height 30px
      background url('./images/close.png')
    .mobile
      top 100%
      margin-top 29px
      width 71px
      height 68px
      background url('./images/close-m.png')
      left 50%;
      transform translateX(-50%)
      position absolute
</style>
<script>
import * as types from '~/store/mutation-type';
import store from '~/store/index';
export default {
  props: {
    isMobile: {
      type: Boolean,
      default: true
    }
  },
  mounted() {

  },
  methods: {
    handleClose(e) {
      e.preventDefault();
      e.stopPropagation();
      store.commit(types.HIDE_MODAL);
    }
  }
}
</script>

