<template>
  <div v-if="visible" ref="alert" class="cp-alert">
    <div class="box-mask">
      <div class="box-container">
        <div class="box-header">
          <div class="box-title">{{ title }}</div>
        </div>
        <div class="box-content">{{ text }}</div>
        <div class="box-bottom">
          <div class="bottom-item" @click="onClose">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  data() {
    return {
      visible: false,
      title: '',
      text: '',
      promiseStatus: null
    }
  },
  methods: {
    confirm() {
      let _this = this;
      this.visible = true;
      return new Promise(function(resolve, reject) {
        _this.promiseStatus = { resolve, reject };
      });
    },
    onClose() {
      this.$refs.alert.className += ' fadeOut';
      let t = setTimeout(() => {
        this.visible = false;
        clearTimeout(t);
        this.promiseStatus.resolve('ok');
      }, 300);
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cp-alert{
    text-align: center;
    color: #2c3e50;
    height: 100%;
    font-size: .32rem;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index 3
    top 0
    animation fadeIn 0.3s ease-in-out
    &.fadeOut {
      animation fadeOut 0.3s ease-in-out
      animation-fill-mode forwards
    }
    .box-mask{
      z-index: 900;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.75);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .box-container{
    border-radius: 0.15rem;
    background: #fff;
    width: 70%;
    .box-header {
      padding-top: 0.25rem;
    }
    .box-title {
      text-align: center;
      padding-left: 0;
      margin-bottom: 0;
      font-size: 0.32rem;
      font-weight: 700;
      color: #333;
      letter-spacing 0.04rem
    }
    .box-content{
      min-height: 1.76rem;
      padding: 0.25rem;
      word-break: break-all;
      line-height: 0.48rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .box-bottom{
      border-top: 1px solid #ddd;
      width: 100%;
      height: 0.92rem;
      line-height 0.92rem
      display: flex;
      align-items: center;
      justify-content: center;
      color: #26a2ff
      letter-spacing 0.04rem
      .bottom-item{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
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
