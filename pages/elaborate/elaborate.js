const WxParse = require('../../wxParse/wxParse.js')
const _ = require('../../utils/lodash.core');
const request = require('../../utils/request');
const modal = require('../../utils/modal');
const superConst = require("../../utils/super-const");
const message = require('../../utils/message');
const regex = require('../../utils/regex');
const app = getApp();

Page({
  data: {
    array: ['1个月', '3个月', '6个月', '1年'],
    values: [1,3,6,12],
    index: 0,
    other:{
      productDesc:'',
      target:'',
      remark1:'',
      remark2:'',
      remark3:'',
      cnt:''
    }
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
    let _this = this;
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    let prevPage = pages[pages.length - 2];

    _this.setData({
        index:prevPage.data.other.index||0,
        other:prevPage.data.other
    });

  },
  submitp: function (e) {
    let save = e.detail.value;
    let _this = this;
    let cnt  = save.cnt;
    let productDesc = save.productDesc;
    let target = save.target;
    
    let remark1 = save.remark1;
    let remark2 = save.remark2;
    let remark3 = save.remark3;

    if (cnt&&!regex.gtZeroNumber(cnt)) {
      message.warn('数量格式不正确');return false;
    }

    save.time = _this.data.values[_this.data.index];
    save.index = _this.data.index;
    
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      other:save
    });
    wx.navigateBack();
    
  }
})