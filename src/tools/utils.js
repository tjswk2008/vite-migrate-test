// sessionStorage操作
export function setStore(name, content) {
  if (!name) {
    return;
  }
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
}
export function getStore(name) {
  let rtn = '';

  if (name) {
    rtn = JSON.parse(window.sessionStorage.getItem(name));
  }
  return rtn;
}
export function removeStore(name) {
  if (!name) {
    return;
  }
  window.sessionStorage.removeItem(name);
}

export function rem(size = 750) {
  let docEl = document.documentElement;
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  let reCalc = () => {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    if (clientWidth >= size) {
      docEl.style.fontSize = '100px';
    } else {
      docEl.style.fontSize = 100 * (clientWidth / size) + 'px';
    }
  };

  if (!document.addEventListener) return;
  reCalc();
  window.addEventListener(resizeEvt, reCalc, false);
  document.addEventListener('DOMContentLoaded', reCalc, false);
}

export function isWeiXin() {
  // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase();
  // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if (ua.match(/MicroMessenger/i) === 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

export function isAndroid() {
  // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('android') > -1 || ua.indexOf('adr') > -1;
}

export function isMobile() {
  // if (/Wechat/.test(navigator.userAgent)) {
  //     return false;
  // }
  if (
    /AppleWebKit.*Mobile/i.test(navigator.userAgent) ||
        /Android|iPhone|Windows Phone|webOS|iPod|BlackBerry/i.test(navigator.userAgent)
  ) {
    return true;
  }
  return false;
}

export function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  var results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function getDeviceRatio() {
  var isIPhone = window.navigator.appVersion.match(/iphone/gi);
  var devicePixelRatio = window.devicePixelRatio;
  var dpr;
  if (isIPhone) {
    // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
    if (devicePixelRatio >= 3) {
      dpr = 3;
    } else if (devicePixelRatio >= 2) {
      dpr = 2;
    } else {
      dpr = 1;
    }
  } else {
    // 其他设备下，仍旧使用1倍的方案
    dpr = 1;
  }
  return dpr
}
