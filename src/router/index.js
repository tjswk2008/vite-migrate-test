import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/base',
      component: resolve => require(['../views/base/base.vue'], resolve)
    }
  ]
});

/**
 * 每次路由跳转是判断，是否解析了 微信配置需要参数
 * 若未获取则获取一次
 */
router.beforeEach((to, from, next) => {
  // console.log(to, from, next);
  // if (!store.state.bIsGetWxConfig){
  //   store.dispatch(types.GET_WX_CONFIG, {});
  // }
  next();
});
// router.afterEach((to, from) => {
//   console.log(to, from, 'after', store);
//   if (Object.keys(from.query).length){
//     let {openid,sceneId} = from.query;
//     to.query = { openid, sceneId}
//   }
// })

export default router;
