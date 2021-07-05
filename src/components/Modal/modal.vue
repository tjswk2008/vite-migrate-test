<template>
  <div class="cp-modal">
    <slot />
  </div>
</template>
<style rel="stylesheet/stylus" lang="stylus" scoped>
@import '../../assets/stylus/minixs/_center.styl';
    .cp-modal
        width: 100%
        height 100%
        top 0
        left 0
        right 0
        bottom 0
        display flex
        justify-content center
        align-items center
        position fixed
        z-index 3
        background-color rgba(0, 0, 0, 0.8)
</style>
<script>
export default {
  beforeMount() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

