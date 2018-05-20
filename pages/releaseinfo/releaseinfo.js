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
    array: ['实体产品', '虚拟服务'],
    index: 0,
    image:'',
    other:{}
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
  
  },
  uploadImage: function () {

  },
  submit: function (e) {
    let save = e.detail.value;
    let _this = this;
    let commpanyName =  save.companyName;
    let userName = save.userName;
    let phone = save.phone;
    let projectName = save.projectName;
    let projectArea = save.projectArea;
    let productPrice = save.productPrice;
    let platePrice = save.platePrice;
    let desc = save.desc;
    let image = _this.data.image;
    
    if (!commpanyName) {
      message.warn('公司名称不可为空'); return false;
    }
    if (!userName) {
      message.warn('联系人不可为空'); return false;
    }
    if (!regex.mobile(phone)) {
      message.warn('联系电话格式不正确'); return false;
    }
    if (!projectName) {
      message.warn('项目名称不可为空'); return false;
    }
    if (!productPrice) {
      message.warn('产品价格不可为空'); return false;
    }
    if (!platePrice) {
      message.warn('平台价格不可为空'); return false;
    }

    let param = {
      "company": commpanyName,
      "contact": userName,
      "phone": phone,
      "projectName": projectName,

      "originPrice": productPrice,
      "price": platePrice,
      "cycle":0,

      "images": "",
    }

    if (projectArea){
      param.area = projectArea;
    }
    switch (_this.data.index){
      case 0: { param.properties = '实体产品'; } break;
      case 1: { param.properties = '虚拟服务'; } break;
    }
    if (desc) {
      param.intoduction = desc;
    }

    if (_this.data.other && _this.data.other.cnt){
      param.projectNumber = _this.data.other.cnt;
    }
    if(_this.data.other && _this.data.other.time){
      param.cycle = _this.data.other.index;
    }
    if (_this.data.other && _this.data.other.productDesc) {
      param.context = _this.data.other.productDesc;
    }
    if(_this.data.other&&_this.data.other.target){
      param.target = _this.data.other.target;
    }
    if (_this.data.other && _this.data.other.remark1){
      param.superiority = _this.data.other.remark1;
    }
    if (_this.data.other && _this.data.other.remark2) {
      param.sellingPoint = _this.data.other.remark2;
    }
    if (_this.data.other && _this.data.other.remark3) {
      param.competitor = _this.data.other.remark3;
    }

    let requestHandler = {
      isLoading: true,
      url: 'projects/apply',
      method: 'POST',
      params: param,
      success: function (data) {
        wx.redirectTo({
          url: '../releasesuc/releasesuc'
        });
      },
      fail: function () { }
    }
    request(requestHandler);
  }
})