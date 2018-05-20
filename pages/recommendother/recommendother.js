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
    projectId:''
  },
  onLoad: function (options) {
     let _this = this;
     _this.setData({
       projectId:options.id
     });
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  formSubmit: function (e) {
    let _this = this;
    let form = e.detail.value;
    let name = form.name;
    let phone = form.phone;
    let storage = wx.getStorageSync(superConst.SUPER_TOKEN_KEY);
    
    if(!name){
      modal({content: '联系人不可为空'});
      return false;
    }
    if (!regex.mobile(phone)) {
      modal({ content: '手机号格式不正确' });
      return false;
    }
      ///projects/{projectId}/recommend
      let param = [];
      param.push('username=' + name);
      param.push('phone=' + phone);
      param.push('userId=' + storage.userId);
      
    
    let requestHandler = {
      isLoading: true,
      url: 'projects/' + _this.data.projectId + "/recommend?" + param.join('&'),
      method: 'POST',
      params: {},
      success: function (data) {
        message.success('操作成功');
        setTimeout(function(){
          wx.navigateBack();
        },1000)
      },
      fail: function () { }
    }
    request(requestHandler);

  }
})