let util = require("./utils/util");
App({
  globalData: {
    openId: ''
  },
  onShow: function () {
    let _this = this;
    !_this.globalData.openId && util.getOpenId();
  }
})