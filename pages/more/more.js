const _ = require('../../utils/lodash.core');
const request = require('../../utils/request');
const modal = require('../../utils/modal');
const superConst = require("../../utils/super-const");
const app = getApp()

Page({
  data: {
    userInfo:{}
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
    let _this = this;
    _this.getUserInfo();
  },
  getUserInfo: function () {
    let _this = this;
    let storage = wx.getStorageSync(superConst.SUPER_TOKEN_KEY);
    if (storage && storage.openId) {
      let openId = storage.openId;
      let requestHandler = {
        url: 'users?openId=' + openId,
        method: 'GET',
        params: {},
        success: function (data) {
          if (data.headImage) {
            let httpIndex = data.headImage.indexOf('http');
            if (httpIndex == -1) {
              data.headImage = superConst.IMAGE_STATIC_URL + data.headImage;
            }
          }
          _this.setData({
            userInfo: data
          })
        },
        fail: function () {

        }
      }
      request(requestHandler);
    }
  },
  logout: function () {
    wx.setStorageSync(superConst.SUPER_TOKEN_KEY, '');
    setTimeout(function () {
      wx.redirectTo({ url: '../register/register' });
    }, 800)
  }
})