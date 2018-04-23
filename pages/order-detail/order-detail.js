
const _ = require('../../utils/lodash.core');
const request = require('../../utils/request');
const modal = require('../../utils/modal');
const superConst = require("../../utils/super-const");
const moment = require("../../utils/moment.min");
const app = getApp()

Page({
  data: {
    orderId:'',
    detail:{}
  },
  onLoad: function (options) {
    let _this = this;
    _this.setData({
      orderId: options.orderId
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
    let _this = this;
    _this.getOrderDetail();
  },
  getOrderDetail: function () {
    let _this = this;
    let requestHandler = {
      url: 'orders/'+_this.data.orderId,
      method: 'GET',
      params: {},
      success: function (data) {
        data.createDate = moment(data.createDate).format('YYYY/MM/DD HH:mm');
        data.payDate = moment(data.payDate).format('YYYY/MM/DD HH:mm');
        _this.setData({
          detail:data
        })
      },
      fail: function () {}
    }
    request(requestHandler);
  }
})