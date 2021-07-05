import * as types from '../mutation-type';


const state = {
  nFootprint: 0,
  bIsFirstTime: true
};

const getters = {};

const actions = {
};

const mutations = {
  [types.UPDATE_SIGN_COUNT](state, count){
    state.nFootprint = count;
  },
  [types.UPDATE_FIRST_TIME](state, flag){
    state.bIsFirstTime = flag;
  }
}
;

/**
 * 数组store
 */
export default {
  state,
  getters,
  actions,
  mutations
}
