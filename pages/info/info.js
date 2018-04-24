const _ = require('../../utils/lodash.core');
const request = require('../../utils/request');
const modal = require('../../utils/modal');
const message = require('../../utils/message');
const superConst = require("../../utils/super-const");
const app = getApp()


Page({
  data: {
    userInfo:{}
  },
  onLoad: function (options) {
  
  },
  onShow: function () {
    let _this = this;
    _this.getUserInfo();
  },
  submit: function (e) {
    let _this = this;
    let page = e.detail.value;

    if (!e.detail.value.realname) {
      message.warn('请输入姓名')
      return false;
    }

    let userInfo = _this.data.userInfo;
    
    userInfo.realname = page.realname;
    userInfo.alipay = page.alipay;

    let requestHandler = {
      url: 'users',
      method: 'PUT',
      params: userInfo,
      success: function (data) {
        message.success('操作成功');
      },
      fail: function () {

      }
    }
    request(requestHandler);
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
          data.realname = data.realname || data.nickname;
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
  }
})