let request = require("./request");
let superConst = require("./super-const");
let moment = require('./moment.min');
let app = getApp();

/**
 * 获取当前微信登录用户的openId信息，只有在全局openId 没有的情况下才去调用这个方法
 * @param {回调函数} callback 
 */
const getOpenId = function (callback) {
  let temp = wx.getStorageSync(superConst.SUPER_TOKEN_KEY);
  if(!temp.openId){
    wx.login({
      success: function (res) {
        let code = res.code;
        if (code) {
          request({
            method: 'GET',
            url: 'oauth/session?code=' + code,
            success: function (data) {
              wx.setStorageSync(superConst.SUPER_TOKEN_KEY, data);
              if (!data.phone) { 
                setTimeout(function(){
                  wx.redirectTo({url: '../register/register'});
                },800)
              }
              callback && callback();
            }
          });
        }
      }
    })
  } else if (!temp.phone){
      wx.login({
        success: function (res) {
          let code = res.code;
          if (code) {
            request({
              method: 'GET',
              url: 'oauth/session?code=' + code,
              success: function (data) {
                wx.setStorageSync(superConst.SUPER_TOKEN_KEY, data);
                callback && callback();
              }
            });
          }
        }
      })
  }
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

/**
 * 验证登录用户是否是付费用户
 */
const isPayAccount = function (opt,callback) {
  let requestHandle = {
    url: 'users/point',
    method: 'GET',
    success: function (data) {
      if (data.code && data.code > 0) {
        wx.showModal({
          title: '温馨提示',
          confirmText: '立即加入',
          cancelText: '取消',
          content: '加入超级悬赏共享平台方可进行' + (opt=='publish'?"发布":"承接"),
          success: function (d) {
            if (d.confirm) {
              wx.navigateTo({
                url: '/pages/product/product?productId=20'
              });
            }
          }
        });
      } else {
        if(data>0){
          callback && callback()
        }else{
          wx.showModal({
            title: '温馨提示',
            confirmText: '立即加入',
            cancelText: '取消',
            content: '加入超级悬赏共享平台方可进行' + (opt == 'publish' ? "发布" : "承接"),
            success: function (d) {
              if(d.confirm){
                wx.navigateTo({
                  url: '/pages/product/product?productId=20'
                });
              }
            }
          });
        }
      }
    },
    fail: function () { 
      wx.showModal({
        title: '温馨提示',
        confirmText: '立即加入',
        cancelText: '取消',
        content: '加入超级悬赏共享平台方可进行' + (opt == 'publish' ? "发布" : "承接"),
        success: function (d) {
          if (d.confirm) {
            wx.navigateTo({
              url: '/pages/product/product?productId=20'
            });
          }
        }
      });
    }
  };
  request(requestHandle);
}

module.exports = {
  isLogin,
  getOpenId,
  countIndex,
  isPayAccount
}