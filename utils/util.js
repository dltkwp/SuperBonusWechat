let request = require("./request");
let superConst = require("./super-const");
let moment = require('./moment.min');
let app = getApp();

/**
 * 获取当前微信登录用户的openId信息，只有在全局openId 没有的情况下才去调用这个方法
 * @param {回调函数} callback 
 */
const getOpenId = function (callback) {
  wx.login({
    success: function (res) {
      let code = res.code;
      if (code) {
        request({
          method: 'GET',
          url: 'oauth/session?code=' + code,
          success: function (data) {
            getApp().globalData.openId = data.openId;
            wx.setStorageSync(superConst.SUPER_TOKEN_KEY, data);
            if (!data.phone) { 
              wx.redirectTo({url: '../register/register'});
            }
            callback && callback();
          }
        });
      }
    }
  })
}

/**
 * 判定是否是登录状态
 * 1: 是否登录过
 * 2: 登录过是否token过期
 */
const isLogin = function () {
  let auth = wx.getStorageSync(superConst.SUPER_TOKEN_KEY)
  if (!auth) {
    return false;
  } else {
    if (moment().isAfter(moment(auth.expiredAt))) {
      return false;
    }
    return true;
  }
}

 
 /**
   * offetHeight  滚动计算部分到顶部距离
   * scrollTop   滚动高度
   * height      每个模块的高度
   * colunm      列数
  **/
  const countIndex = function(offetHight, scrollTop, height, colunm) {
  // 单例获取屏幕宽度比
  if (!countIndex.pix) {
      try {
        let res = wx.getSystemInfoSync()
        countIndex.pix = res.windowWidth / 375
      } catch (e) {
        countIndex.pix = 1
      }
  }
  let scroll = scrollTop - offetHight * countIndex.pix
  let hei = height * countIndex.pix
  return scroll > 0 ? Math.floor(scroll / hei) * colunm : 0
}

module.exports = {
  isLogin,
  getOpenId,
  countIndex
}