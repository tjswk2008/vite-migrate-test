// import fetch from 'isomorphic-fetch';
import axios from 'axios';
// const Qs = require('qs');
import * as types from '../store/mutation-type';
import store from '../store/index';

/**
 * 封装fetch
 * @param path
 * @param params
 * @returns {*|Promise|Promise.<T>|Promise<U>}
 */
export default function toFetch(path, params, config) {
  let {
    //TODO:
    url = import.meta.env.VUE_APP_ENV == 'development' ? '' : '/act/moon2019/api',
    type = 'POST',
    contextType = 'application/json'
  } = config || {};

  url = `${url}${path}`;


  let promise = type === 'POST' ? axios({
    method: 'post',
    url: url,
    headers: {
      'Content-Type': contextType
    },
    data: JSON.stringify(params)
  }) : axios.get(url);

  return promise
    .then(res => {
      if(/info/.test(url)) {
        // alert(`info api status: ${res.data.status}`);
      }
      store.commit(types.SHOW_LOADING, false);
      if (res.data) {
        if (res.data.status == 1) {
          return res.data;
        } else {
          store.commit(types.SHOW_ALERT, {
            msg: res.data.msg || `网络异常，status: ${res.data.status}`
          });
        }
      }
    })
    .catch(() => {
      store.commit(types.SHOW_LOADING, false);
      store.commit(types.SHOW_ALERT, {
        msg: '请求出错，请稍后重试'
      });
      return {}
    })
}
