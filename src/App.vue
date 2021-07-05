<template>
  <div class="app">
    <Base v-if="show" />
    <Modal v-if="modal.show" class="fadeIn animated" />
    <Loading v-if="loading" />
    <Orientation />
  </div>
</template>
<style rel="stylesheet/stylus" lang="stylus">
    .app
        width 100%
        height 100%
    ::-webkit-scrollbar
        width: 6px;
        height: 6px;
        /* background-color:#fff; */
        display: none;

    ::-webkit-scrollbar:hover
        background-color: #eee;

    ::-webkit-scrollbar-thumb
        min-height: 5px;
        min-width: 5px;
        -webkit-border-radius: 20px;
        border: 1px solid #AAA;
        background-color: #AAA;

    ::-webkit-scrollbar-thumb:hover
        min-height: 5px;
        min-width: 5px;
        -webkit-border-radius: 20px;
        border: 1px solid #444;
        background-color: #444;

    ::-webkit-scrollbar-thumb:active
        -webkit-border-radius: 20px;
        border: 1px solid #444;
        background-color: #444;
</style>
<script>
import { mapState } from 'vuex';
import Vue from 'vue';
import Base from '~/views/base/base.vue';
import Loading from '~/components/loading.vue';
import Modal from '~/components/Modal/modal.vue';
import Orientation from '~/components/Orientation/orientation.vue';
import store from '~/store/index';
import * as types from '~/store/mutation-type';
import alert from '~/components/Alert';
import confirm from '~/components/Confirm';
import imgUrl from './images/share.png';
import 'animate.css/animate.min.css';
import '@babel/polyfill';

Vue.prototype.$alert = alert;
Vue.prototype.$confirm = confirm;

export default {
  components: {
    Loading,
    Modal,
    Base,
    Orientation
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapState({
      modal: state => state.modal,
      loading: state => state.loading,
      showGuide: state => state.showGuide,
      alert: state => state.alert
    })
  },
  mounted() {
    console.log('loading app');
    store.commit(types.SHOW_LOADING, true);
    // 解决ios输入之后键盘收起后留白
    document.body.addEventListener('focusout', function() {
      window.scrollTo(0, document.documentElement.clientHeight);
    });
    if (import.meta.env.VUE_APP_ENV !== 'development') {
      // 设置分享
    }
    this.show = true;
  },
  methods: {
    closeAlert() {
      store.commit(types.HIDE_ALERT);
    },
    close() {
      store.commit(types.HIDE_MODAL);
    }
  }
}
</script>
