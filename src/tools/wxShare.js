import wx from 'weixin-js-sdk';
/**
 * 微信分享
 * @param obj
 * @param cb
 */
export default (obj, cb) => {
// 微信分享
  wx.ready(function() {
    /*分享给朋友*/
    wx.onMenuShareAppMessage(obj);

    /*分享到QQ*/
    wx.onMenuShareQQ(obj);

    /*分享到腾讯微博*/
    wx.onMenuShareWeibo(obj);

    /*分享到QQ空间*/
    wx.onMenuShareQZone(obj);

    /*分享到朋友圈*/
    // obj.title = obj.desc; /*分享到朋友圈没有desc字段，取title*/
    wx.onMenuShareTimeline({
      title: obj.desc, // 分享标题
      link: obj.link, // 分享链接
      imgUrl:obj.imgUrl, // 分享图标
      success: obj.success,
      cancel: obj.cancel
    });

    if (cb) {
      cb();
    }
  });

  wx.error(function (res) {
    // console.error(res.errMsg);
  });
}
