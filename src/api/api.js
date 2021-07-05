import fetch from './toFetch';

export default {
  /**
   * 提交答题
   * @returns {*|Promise|Promise.<T>|Promise.<U>}
   */
  submit(data) {
    return fetch('/api.php?act=submit', {data})
  },

  signContract(data) {
    return fetch('/api.php?act=contract', {data})
  },

  apply() {
    return fetch('/api.php?act=confirm', {}, {
      type: 'GET'
    })
  },

  saveContactInfo({
    name,
    sex,
    birthday,
    mobile,
    wechat,
    email
  }) {
    return fetch(`/api.php?act=contact&name=${name}&sex=${sex}&birthday=${birthday}&mobile=${mobile}&wechat=${wechat}&email=${email}`, {}, {
      type: 'GET'
    })
  },

  getActStatus() {
    return fetch('/api.php?act=getcfg', {}, {
      type: 'GET'
    })
  },

  getWorkingHours(page, start, end) {
    let url = `/api.php?mod=list&act=worktime&page=${page}`;
    if (start) {
      url += `&start=${start}`;
    }
    if (end) {
      url += `&end=${end}`;
    }
    return fetch(url, {}, {
      type: 'GET'
    })
  },

  sendStartDate() {
    return fetch('/api.php?act=start', {}, {
      type: 'GET'
    })
  },

  getQuestions() {
    return fetch('/api.php?act=question', {}, {
      type: 'GET'
    })
  },

  checkJobNumber(code) {
    return fetch(`/api.php?act=check&code=${code}`, {}, {
      type: 'GET'
    })
  },

  /**
   * 基本信息
   * @returns {*|Promise|Promise.<T>|Promise.<U>}
   */
  getInfo() {
    return fetch('/api.php?act=info', {}, {
      type: 'GET'
    });
  },

  pray() {
    return fetch('/api.php?act=pray', {}, {
      type: 'GET'
    });
  },

  getPrize() {
    return fetch('/api.php?act=box', {}, {
      type: 'GET'
    });
  },
}
