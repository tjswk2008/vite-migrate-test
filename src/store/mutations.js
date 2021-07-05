import * as types from './mutation-type';

export default {
  [types.SHOW_ALERT]: (state, { type, msg }) => {
    state.alert = Object.assign({}, {
      show: true,
      type,
      msg
    });
  },
  [types.HIDE_ALERT]: (state) => {
    state.alert = Object.assign({}, {
      show: false
    });
  },
  [types.SHOW_MODAL]: (state, { type, card_id, card_id_list, code, share }) => {
    state.modal = Object.assign({}, {
      show: true,
      type,
      card_id,
      code,
      share
    });
    if (card_id_list) {
      state.modal.card_id_list = null;
      state.modal.card_id_list = [];
      card_id_list.forEach(item => {
        state.modal.card_id_list.push(item);
      });
    }
  },
  [types.HIDE_MODAL]: (state) => {
    state.modal = Object.assign({}, {
      show: false
    });
  },
  [types.SHOW_CONFIRM]: (state) => {
    state.confirm = Object.assign({}, {
      show: true
    });
  },
  [types.HIDE_CONFIRM]: (state) => {
    state.confirm = Object.assign({}, {
      show: false
    });
  },
  [types.UPDATE_USER]: (state, data) => {
    state.userInfo = Object.assign({}, data);
  },
  [types.UPDATE_USER_STATUS]: (state, status) => {
    state.userStatus = status;
  },
  [types.UPDATE_STYLE]: (state) => {
    state.updateStyle = true;
  },
  [types.SHOW_LOADING]: (state, status) => {
    state.loading = status;
  },
  [types.SHOW_GUIDE]: (state, status) => {
    state.showGuide = status;
  },
  [types.GO_TO_LOGIN]: (state, status) => {
    state.goToLogin = status;
  }
}
