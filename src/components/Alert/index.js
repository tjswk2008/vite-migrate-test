import Vue from 'vue'
import alert from './alert.vue'

const AlertBox = Vue.extend(alert);

let Alert = (text, title = '提示', options) => {
  if (typeof title === 'object') {
    options = title;
    title = '';
  } else if (title === undefined) {
    title = '';
  }

  options = Object.assign({
    title: title,
    text: text
  }, options);

  let instance = new AlertBox({
    data: options
  }).$mount();

  document.body.appendChild(instance.$el);

  return instance.confirm();
};

export default Alert;
