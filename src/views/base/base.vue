<template>
  <div class="pg-index">
    <div class="content content_home">
      <div class="date" @click="showStart = true">{{ startDate }}</div>
      <Scroller
        ref="scroll"
        class="scroll"
        :data-list="filmList"
        :is-end="loaded"
        @onPullUp="pullUpHandle"
      >
        <div v-for="(v, i) in filmList" :key="i" class="film-list" tag="li">
          <div class="film-list__img">
            <img :src="v.image" alt="">
          </div>
          <div class="film-list__detail">
            <p class="film-list__detail__title">{{ v.title }}</p>
            <p class="film-list__detail__director">导演：{{ v.director }}</p>
            <p class="film-list__detail__year">年份：{{ v.year }}<span>{{ v.stock }}</span></p>
            <p class="film-list__detail__type">类别：{{ v.genres.join(" / ") }}<span /></p>
            <p class="film-list__detail__rank">评分：<span>{{ v.rating.average }}分</span></p>
          </div>
        </div>
      </Scroller>
      <!-- <AutoScroll class="scroll">
              <div class="film-list" v-for="(v, i) in filmList" :key="i" tag="li">
                  <div class="film-list__img">
                      <img :src="v.image" alt="" />
                  </div>
                  <div class="film-list__detail">
                      <p class="film-list__detail__title">{{v.title}}</p>
                      <p class="film-list__detail__director">导演：{{v.director}}</p>
                      <p class="film-list__detail__year">年份：{{v.year}}<span>{{v.stock}}</span></p>
                      <p class="film-list__detail__type">类别：{{v.genres.join(" / ")}}<span></span></p>
                      <p class="film-list__detail__rank">评分：<span>{{v.rating.average}}分</span></p>
                  </div>
              </div>
            </AutoScroll> -->
      <date-picker
        :props-show="showStart"
        :initial-date="startDate"
        @setDialogVisible="(val) => showStart = val"
        @setDate="setStart"
      />
    </div>
  </div>
</template>
<script>
import store from '~/store/index';
import * as types from '~/store/mutation-type';
import { mapState } from 'vuex';
import { isAndroid } from '~/tools/utils'
import datePicker from '~/components/DatePicker/datepicker.vue';
import Scroller from '~/components/scroller.vue'
//   import AutoScroll from '~/components/AutoScroll/autoscroll.vue'

export default {
  components: {
    Scroller,
    datePicker
    // AutoScroll
  },
  data() {
    return {
      callBackFn: '',
      needToRequestUserInfo: true,
      loaded: false,
      filmList: [
        {
          image: 'http://sf1-ttcdn-tos.pstatp.com/obj/tos-cn-p-0051/809a2af2470149c896ca03ffa105bd46',
          title: '风雪俏佳人',
          stock: 1990,
          genres: ['悬疑', '惊悚'],
          rating: { average: 7.5 },
          director: '李安'
        },
        {
          image: 'http://sf1-ttcdn-tos.pstatp.com/obj/tos-cn-p-0051/809a2af2470149c896ca03ffa105bd46',
          title: '风雪俏佳人',
          stock: 1991,
          genres: ['悬疑', '惊悚'],
          rating: { average: 7.5 },
          director: '李安'
        },
        {
          image: 'http://sf1-ttcdn-tos.pstatp.com/obj/tos-cn-p-0051/809a2af2470149c896ca03ffa105bd46',
          title: '风雪俏佳人',
          stock: 1992,
          genres: ['悬疑', '惊悚'],
          rating: { average: 7.5 },
          director: '李安'
        }
      ],
      cardList: [],
      user_info: {},
      index_data: {},
      downloadUrl: `https://xxx.com/download/${isAndroid() ? 'android' : 'ios'}.html`,
      showStart: false,
      endYear: 2099,
      startDate: '请选择开始日期'
    }
  },
  computed: {
    ...mapState({
      goToLogin: state => state.goToLogin
    })
  },
  mounted() {
    store.commit(types.SHOW_LOADING, false);
  },
  methods: {
    pullUpHandle() {
      if (this.filmList.length > 5) {
        this.loaded = true;
      } else {
        setTimeout(() => {
          this.filmList = this.filmList.concat([
            {
              image: 'http://sf1-ttcdn-tos.pstatp.com/obj/tos-cn-p-0051/809a2af2470149c896ca03ffa105bd46',
              title: '风雪俏佳人',
              stock: this.filmList[this.filmList.length - 1].stock + 1,
              genres: ['悬疑', '惊悚'],
              rating: { average: 7.5 }
            },
            {
              image: 'http://sf1-ttcdn-tos.pstatp.com/obj/tos-cn-p-0051/809a2af2470149c896ca03ffa105bd46',
              title: '风雪俏佳人',
              stock: this.filmList[this.filmList.length - 1].stock + 2,
              genres: ['悬疑', '惊悚'],
              rating: { average: 7.5 }
            }
          ]);
        }, 1000);
      }
    },
    setStart(val) {
      this.startDate = `${val.year}-${val.month}-${val.day}`;
    }
  }
}
</script>
<style rel="stylesheet/stylus" lang="stylus" scoped>
@import '../../assets/stylus/minixs/_center.styl';
    .pg-index
        width: 100%;
        height: 100%;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        background #efefef;

        .scroll
          width: 100%;
          height: 100%;
          position absolute

        .hide
            display: none

        .show
            display: block !important;
        .date
            border-radius: 0.06rem;
            background-color: rgb(255, 255, 255);
            width: 1.80rem;
            height: 0.50rem;
            color: #1d1d1d;
            text-align center
            right 0.2rem
            top 1.5rem;
            line-height 0.5rem
            font-size: 0.24rem;
            position absolute
        .film-list
            font-size 0.3rem;
            line-height 1.5;
            padding 0.3rem;
            img
              width: 100%;
        .emphasis
            color #ffde00
        .content
            height: 100%;
            width: 100%;
            color: black;
            position: relative;

            &_home
                .header
                    position: fixed;
                    top: 0;
                    height: 1.28rem;
                    background: rgba(0, 0, 0, 0.8);
                    width: 100%;
                    img
                        height 1.04rem
                        float: left;
                        margin: 0.10rem 0 0 0.20rem;
                    .main_title
                        position absolute
                        top 0.28rem
                        left 1.39rem
                        font-size: 0.30rem;
                        color: #fff;
                        .sub_title
                            display: block;
                            margin: 0.05rem 0 0 0;
                            font-size: 0.19rem;
                    .btnsom
                        float: right;
                        margin: 0.40rem 0.30rem 0 0;
                        width: 1.50rem;
                        height: 0.50rem;
                        background: #b48e52;
                        border-radius: 0.10rem;
                        text-align: center;
                        line-height: 0.48rem;
                        color: #fff;
                        font-size: 0.26rem;
                        text-shadow: 0.01rem 0.01rem 0.01rem #00000073;
                        text-decoration none

        .slideInLeftNew
            animation-name: slideInLeftNew;

        .slideInRightNew
            animation-name: slideInRightNew;

        .moon_ani
            animation: moon 1s ease-in-out forwards;
        .moon_up
            animation: moonUp 1s ease-in-out forwards;

        @media screen and (max-height: 1733px)
            .center
                margin-top -4.82rem !important;

            .content_2
                .title
                    top 0.2rem !important
                .moon
                    left: 4.72rem !important;
                    margin-top -4.97rem !important;

            .pray_container
                margin-top -0.4rem !important

        @keyframes moon
            from
                transform: translate3d(-100%, -100%, 0);
                opacity: 0;
            to
                transform: translateZ(0);
                opacity: 1;
        @keyframes moonUp
            from
                transform: translate3d(-100%, 100%, 0);
                opacity: 0;
            to
                transform: translateZ(0);
                opacity: 1;
        @keyframes slideInRightNew
            from
                transform: translate3d(100%, 0, 0);
                visibility: visible;
            to
                transform: translateZ(0);
                visibility: visible;

        @keyframes slideInLeftNew
            from
                transform: translate3d(-100%, 0, 0);
                visibility: visible;
            to
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
                visibility: visible;

        @keyframes down
            0%
                opacity: 0;
                transform: translateY(-0.16rem);
            40%
                opacity: 1;
                transform: translate(0);
            100%
                opacity: 0;
                transform: translateY(0.2rem);

        @keyframes round
            to
                transform: rotate(360deg);

        @keyframes scaleAni
            from
                opacity: 0.8;
                transform: scale3d(0.95, 0.95, 1);

            50%
                opacity: 1;
                transform: scale3d(1.05, 1.05, 1);

            to
                opacity: 0.8;
                transform: scale3d(0.95, 0.95, 1);
</style>
