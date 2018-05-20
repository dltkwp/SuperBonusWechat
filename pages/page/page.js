const WxParse = require('../../wxParse/wxParse.js')
const _ = require('../../utils/lodash.core');
const request = require('../../utils/request');
const modal = require('../../utils/modal');
const superConst = require("../../utils/super-const");
const message = require('../../utils/message');

Page({
  data: {
    detail: {},
    id: ''
  },
  onLoad: function (options) {
    let _this = this;
    _this.setData({
      id: options.id
    });
    _this.getDetail();
  },
  onReady: function () {

  },
  onShow: function () {

  },
  getDetail: function () {
    let _this = this;
    let requestHandler = {
      url: 'customPages/' + _this.data.id,
      method: 'GET',
      params: {},
      success: function (data) {
        if (!data.description) {
          data.description = '';
        }
        _this.setData({
          detail: data
        })
        wx.setNavigationBarTitle({
          title: data.title
        })
        WxParse.wxParse('article', 'html', data.description, _this, 5)
      },
      fail: function () { }
    }
    request(requestHandler);
  }
})