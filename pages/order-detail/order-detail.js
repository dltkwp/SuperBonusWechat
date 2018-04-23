
const _ = require('../../utils/lodash.core');
const request = require('../../utils/request');
const modal = require('../../utils/modal');
const superConst = require("../../utils/super-const");
const moment = require("../../utils/moment.min");
const app = getApp()

Page({
  data: {
    orderId:''
  },
  onLoad: function (options) {
    let _this = this;
    _this.setData({
      orderId: options.orderId
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
    let _this = this;
    _this.getOrderDetail();
  },
  getOrderDetail: function () {
    let _this = this;
    let requestHandler = {
      url: 'orders/'+_this.data.orderId,
      method: 'GET',
      params: {},
      success: function (data) {
        console.log(data,1231231231231);
          let list = data.list;

          // 处理下图片
          _.forEach(list,function(item){
             if(item.images){
               let arr = item.images.split(',');
               item.imageUrl = superConst.IMAGE_STATIC_URL + arr[0];
              }
              item.createDate = moment(item.createDate).format('YYYY/MM/DD HH:mm')
          });

          let temp = [];
          if (_this.data.pageNum == 1) {
            temp = list;
          } else if (_this.data.pageNum > 1) {
            temp = _this.data.orderList.concat(list);
          }
          if (list.length < _this.data.pageSize) {
            _this.setData({ loadOver: true })

          }
          _this.setData({
            pageNum: _this.data.pageNum + 1,
            ordeList: temp
          });
      },
      fail: function () {}
    }
    request(requestHandler);
  }
})