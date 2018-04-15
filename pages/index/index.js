const request = require('../../utils/request');
const modal = require('../../utils/modal');
const superConst = require("../../utils/super-const");
const app = getApp()

Page({
  data: {

    current: 0,
    showModalStatus: false,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    bannerList: [],

  },
  onLoad: function () {
  },
  onShow: function () {
    let _this = this;
    _this.getAdvImages();
  },
  noWork: function () {
    modal({
      content: '程序猿小伙伴正在加班赶工中。。。'
    })
  },
  getAdvImages: function () {
    return false;
    let _this = this;
    let requestHandler = {
      url: '',
      method: '',
      params: {},
      success: function (data) {
        _this.setData({
          bannerList: data
        })
      },
      fail: function () {

      }
    }
    request(requestHandler);
  }
})