import * as types from '../mutation-type';
import data from '../../api/api';


const state = {
  venue: {}
};

const getters = {};

const actions = {
  [types.GET_VENUE_INFO]: ({commit}, {openid, next}) => {
    data
      .getGameSignInfo({openid})
      .then(function (res) {
        // console.log(res);
        commit(types.UPDATE_VENUE_INFO, res.data.sign_info);
        next && next();
      })
  }
};

const mutations = {
    [types.UPDATE_VENUE_INFO](state, venue){
      state.venue = venue;
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
