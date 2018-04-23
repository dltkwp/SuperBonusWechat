const _ = require('../../utils/lodash.core');
const request = require('../../utils/request');
const modal = require('../../utils/modal');
const superConst = require("../../utils/super-const");
const app = getApp()

Page({
  data: {
    userInfo:{}
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
    let userInfo = this.data.userInfo
    userInfo.sex = Number(e.currentTarget.dataset.sex)
    this.setData({
      userInfo: userInfo
    })
  },
  submit: function (e) {
    let page = e.detail.value;
     
    if (!e.detail.value.memberName){
      util.message({
        content: '请输入姓名'
      })
      return
    }
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
          if (data.headImage) {
            let httpIndex = data.headImage.indexOf('http');
            if (httpIndex == -1) {
              data.headImage = superConst.IMAGE_STATIC_URL + data.headImage;
            } 
          }
          _this.setData({
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