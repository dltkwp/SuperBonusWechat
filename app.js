let util = require("./utils/util");
App({
  globalData: {
    openId:''
  },
  onShow: function () {
    util.getOpenId(); 
  }
})