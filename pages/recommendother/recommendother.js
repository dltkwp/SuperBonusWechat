const _ = require('../../utils/lodash.core');
const request = require('../../utils/request');
const modal = require('../../utils/modal');
const message = require('../../utils/message');
const superConst = require("../../utils/super-const");
const regex = require('../../utils/regex.js');
const moment = require("../../utils/moment.min.js");
const app = getApp()


Page({
  data: {
    name:'',
    phone:'',
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  formSubmit: function (e) {
    let form = e.detail.value;
    let name = form.name;
    let phone = form.phone;
    
    if(!name){
      modal({content: '联系人不可为空'});
      return false;
    }
    if (!regex.mobile(phone)) {
      modal({ content: '手机号格式不正确' });
      return false;
    }

    

  }
})