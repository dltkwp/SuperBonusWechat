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
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  getUserInfo: function (){
    let storage = wx.getStorageSync(superConst.SUPER_TOKEN_KEY);
    if (storage && storage.openId){
      let openId = storage.openId;
      let productId = _this.data.id;

      let _this = this;
      let requestHandler = {
        url: 'users?openId=' + openId,
        method: 'GET',
        params: {},
        success: function (data) {
          let list = data.list;

          // 处理下图片
          _.forEach(list, function (item) {
            if (item.images) {
              let arr = item.images.split(',');
              item.imageUrl = superConst.IMAGE_STATIC_URL + arr[0];
            }
          });

          let temp = [];
          if (_this.data.pageNum == 1) {
            temp = list;
          } else if (_this.data.pageNum > 1) {
            temp = _this.data.productList.concat(list);
          }
          if (list.length < _this.data.pageSize) {
            _this.setData({ loadOver: true })

          }
          _this.setData({
            pageNum: _this.data.pageNum + 1,
            productList: temp
          });
        },
        fail: function () {

        }
      }
      request(requestHandler);

    }
  }
})