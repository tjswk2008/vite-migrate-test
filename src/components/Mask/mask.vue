<template>
  <div
    :class="['cp-mask', show ? 'show' : '']"
    @click="handleClose($event)"
  />
</template>
<style rel="stylesheet/stylus" lang="stylus" scoped>
    .cp-mask
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        background-color rgba(0, 0, 0, 0.75)
        z-index 2
        visibility hidden
        opacity 0
        -webkit-transition-duration 400ms
        transition-duration 400ms
        &.show
            visibility visible
            opacity 1
</style>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  beforeMount() {

  },
  mounted() {

  },
  methods: {
    handleClose(e) {
      e.preventDefault();
      e.stopPropagation();
      this.$emit('close');
    }
  }
}
</script>

