let superConst = require("../../utils/super-const");

Page({
  data: {
    userInfo:{}
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  getUserInfo: function (){
    let superToken =  wx.getStorageSync(superConst.SUPER_TOKEN_KEY);
    if(superToken && superToken.memberId){
        // 根据 memberId 查询用户的基本信息
    }
  }

})