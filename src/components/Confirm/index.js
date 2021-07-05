import Vue from 'vue'
import confirm from './confirm.vue'

const ConfirmBox = Vue.extend(confirm);

let Confirm = (text, title = '提示', options) => {
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

  let instance = new ConfirmBox({
    data: options
  }).$mount();

  document.body.appendChild(instance.$el);

  return instance.confirm();
};

export default Confirm;
