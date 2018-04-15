let superConst = require("../../utils/super-const");

Page({
  data: {
    userInfo:null
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
    let superToken =  wx.getStorageSync(superConst.SUPER_TOKEN_KEY);
    console.error('进行页面赋值操作');
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  }
})