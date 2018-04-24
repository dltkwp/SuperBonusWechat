const _ = require('../../utils/lodash.core');
const request = require('../../utils/request');
const modal = require('../../utils/modal');
const message = require('../../utils/message');
const superConst = require("../../utils/super-const");
const app = getApp()

Page({
  data: {
    userInfo:{},
    sex:1
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
    let _this = this;
    _this.getUserInfo();
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  changeSex: function (e) {
    let _this = this;
    _this.setData({
        sex: Number(e.currentTarget.dataset.sex)
    })
  },
  submit: function (e) {
    let _this = this;
    let page = e.detail.value;

    if (!e.detail.value.realname){
      message.warn('请输入姓名')
      return false;
    }

    let userInfo = _this.data.userInfo
    userInfo.sex = Number(_this.data.sex)

    userInfo.realname= page.realname;
    userInfo.enterprise= page.enterprise;
    userInfo.position= page.position;
    userInfo.address= page.address;
    userInfo.alipay= page.alipay;

    let requestHandler = {
      isLoading:true,
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
  getUserInfo: function (){
    let _this = this;
    let storage = wx.getStorageSync(superConst.SUPER_TOKEN_KEY);
    if (storage && storage.openId){
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
            sex:data.sex || 1,
            userInfo:data
          })
        },
        fail: function () {

        }
      }
      request(requestHandler);
    }
  }
})