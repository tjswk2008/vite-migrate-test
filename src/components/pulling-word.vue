<template>
  <div class="cp-loading-word">
    <span class="iconfont icon-shangla">{{ loadingWord }}</span>
  </div>
</template>

<script>
export default {
  props: {
    loadingWord: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="stylus" scoped>
  @font-face {
    font-family: "iconfont";
    src: url('~/components/font/iconfont.eot?t=1504891136164'),
    url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
    url('~/components/font/iconfont.ttf?t=1504891136164') format('truetype'),
    url('~/components/font/iconfont.svg?t=1504891136164#iconfont') format('svg');
  }

  .iconfont {
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-youhuiquan:before { content: "\e6dc"; }

  .icon-sousuo:before { content: "\e626"; }

  .icon-shangla:before { content: "\e61f"; }

  .icon-rank:before { content: "\e715"; }

  .icon-back:before { content: "\e67f"; }

  .icon-gerenzhongxinxia:before { content: "\e625"; }

  .icon-bangzhu-copy:before { content: "\e604"; }

  .icon-jiangli:before { content: "\e624"; }

  .icon-arrow-left:before { content: "\e648"; }

  .icon-icon:before { content: "\e649"; }

  .icon-set:before { content: "\e6bd"; }

  .icon-iconfont7:before { content: "\e602"; }

  .icon-zhanghao:before { content: "\e831"; }

  .icon-wuliu2:before { content: "\e820"; }

  .icon-dingdan:before { content: "\e6cf"; }

  .icon-shanchu:before { content: "\e643"; }

  .icon-ss:before { content: "\e63f"; }

  .icon-more:before { content: "\e616"; }

  .icon-xuanzhong:before { content: "\e637"; }

  .icon-guanzhu:before { content: "\e6a2"; }

  .icon-zhanghaomima-:before { content: "\e698"; }

  .icon--devil:before { content: "\e6eb"; }

  .icon-shouye:before { content: "\e607"; }

  .icon-shoppingcart:before { content: "\e600"; }

  .icon-jianhao:before { content: "\e61a"; }
  .cp-loading-word{
    text-align: center;
    z-index: 100;
    width: 100%;
    height:1rem;
    line-height: 1rem;
    font-size: 0.24rem;
    span{
      vertical-align: middle;
      margin-left: 0.14rem;
      &:before{
        color:#666;
        margin-right: 0.1rem;
      }
    }
  }
</style>
