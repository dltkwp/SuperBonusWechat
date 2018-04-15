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

            if (data.phone) { 
              wx.setStorageSync(superConst.SUPER_TOKEN_KEY, data);
            } else {
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


module.exports = {
  isLogin,
  getOpenId
}