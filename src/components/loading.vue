<template>
  <div class="cp-loading">
    <div class="container">
      <div class="ball" />
      <div class="ball ball-1" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    loadingWord: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="stylus" scoped>
  .cp-loading
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
    z-index 11
    background-color rgba(0, 0, 0, 0.9)
    .container
      width: 4.00rem;
      height: 2.00rem;
      left: 50%;
      top: 50%;
      margin: -2.00rem 0 0 -2.00rem;
      position: absolute;
      text-align: center;
      .ball
        background-color: rgba(0,0,0,0);
        border: 0.1rem solid rgba(0,183,229,0.9);
        border-color: rgba(0, 0, 0, 0) #fff #fff rgba(0, 0, 0, 0);
        opacity: .9;
        border-top: 0.1rem solid rgba(0,0,0,0);
        border-left: 0.1rem solid rgba(0,0,0,0);
        border-radius: 1rem;
        box-shadow: 0 0 0.7rem #fff;
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -0.5rem 0 0 -0.5rem;
        animation: spin .5s infinite linear;
        &-1
          box-shadow: 0 0 0.15rem #fff;
          width: 0.60rem;
          height: 0.60rem;
          margin: -0.3rem 0 0 -0.3rem;
          animation: spinoff .5s infinite linear;

  @keyframes spin
    0%
      transform rotate(0deg);
    100%
      transform rotate(360deg);

  @keyframes spinoff
    0%
      transform rotate(0deg);
    100%
      transform rotate(-360deg);
</style>
