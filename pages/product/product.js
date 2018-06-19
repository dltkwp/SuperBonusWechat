const _ = require('../../utils/lodash.core');
const request = require('../../utils/request');
const superConst = require("../../utils/super-const");
const message = require('../../utils/message');
const util = require("../../utils/util");

const Wxmlify = require('../../wxmlify/wxmlify.js')


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
    util.getOpenId(function () {
      _this.getProductDetail();
    });
  },
  getProductDetail: function () {
    let _this = this;
    let requestHandler = {
      url: 'products/' + _this.data.id,
      method: 'GET',
      params: {},
      success: function (data) {
        if (!data.description){
          data.description = '';
        }
        _this.setData({
          detail: data
        })
        wx.setNavigationBarTitle({
          title: data.productName
        })
        var wxmlify = new Wxmlify(data.description, _this, {preserveStyles:'all'})
        // WxParse.wxParse('article', 'html', data.description, _this, 5)
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
      isLoading:true,
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
  onShareAppMessage: function (res) {
    return {
      title: this.data.detail.productName,
      path: '/pages/product/product?productId=' + this.data.id,
      success: function (res) { },
      fail: function (res) { }
    }
  }

})