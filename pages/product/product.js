const WxParse = require('../../wxParse/wxParse.js')
const _ = require('../../utils/lodash.core');
const request = require('../../utils/request');
const modal = require('../../utils/modal');
const superConst = require("../../utils/super-const");
const app = getApp()

Page({
  data: {
    id: '',
    detail: {},
    loading: false,
    disabled: false
  },
  onLoad: function (options) {
    let _this = this;
    _this.setData({
      id: options.productId
    })
    _this.getProductDetail();
  },
  getProductDetail: function () {
    let _this = this;
    let requestHandler = {
      url: 'products/' + _this.data.id,
      method: 'GET',
      params: {},
      success: function (data) {
        _this.setData({
          detail: data
        })
        WxParse.wxParse('article', 'html', data.description, _this, 5)
      },
      fail: function () {}
    }
    request(requestHandler);
  },
  pay: function () {
    let _this = this;
    let storage = wx.getStorageSync(superConst.SUPER_TOKEN_KEY)
    let openId = storage.openId;
    let productId = _this.data.id;

    let requestHandler = {
      url: 'pay',
      method: 'POST',
      params: {
        openId: openId,
        productId: productId
      },
      success: function (data) {
        if (data.code && data.code>0){
          message.error(data.msg);
        } else {
          let orderId = data.orderId
          data.success = function (res) {
            wx.redirectTo({url: '../joinsuc/joinsuc'})
          }
          data.fail = function (res) {
            message.error('支付失败');
          }
          data.complete = function (res) {
            if (res.errMsg != 'requestPayment:ok') {
               // 调用清理订单接口
            }
          }
          wx.requestPayment(data)
        }
        _this.setData({
          loading: false,
          disabled: false
        })
      },
      fail: function () {
        _this.setData({
          loading: false,
          disabled: false
        })
      }
    }
    request(requestHandler);
  },
  onReady: function () {},
  onShow: function () {}

})