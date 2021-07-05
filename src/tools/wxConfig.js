import wx from 'weixin-js-sdk';
import Promise from 'es6-promise';

/**
 * 注册微信配置
 * @param config
 */
export default (config) => {
  // 注入权限验证配置
  return new Promise(function (resolve, reject) {
    wx.config({
      debug: false,
      appId: config.appId, // 必填，公众号的唯一标识
      timestamp: config.timestamp, // 必填，生成签名的时间戳
      nonceStr: config.nonceStr, // 必填，生成签名的随机串
      signature: config.signature, // 必填，签名
      jsApiList: [
        'checkJsApi',
        'chooseImage',
        'uploadImage',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'startRecord',
        'stopRecord',
        'playVoice',
        'uploadVoice',
        'hideOptionMenu',
        'showOptionMenu',
        'getNetworkType',
        'scanQRCode'
      ] // 必填，需要使用的JS接口列表
    });
    // 微信分享
    wx.ready(function() {
      // 判断当前客户端版本是否支持指定JS接口
      wx.checkJsApi({
        jsApiList: [
          'checkJsApi',
          'chooseImage',
          'uploadImage',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'startRecord',
          'stopRecord',
          'playVoice',
          'uploadVoice',
          'hideOptionMenu',
          'showOptionMenu',
          'getNetworkType',
          'scanQRCode'
        ], // 需要检测的JS接口列表
        success: function() {}
      });

      wx.getNetworkType({
        success: function (res) {
          resolve(res);
        }
      });

    });

    wx.error(function (res) {
      reject(res.errMsg);
    });

  });

}
