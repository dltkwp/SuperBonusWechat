const _ = require('../../utils/lodash.core');
const request = require('../../utils/request');
const modal = require('../../utils/modal');
const superConst = require("../../utils/super-const");
const moment = require("../../utils/moment.min");
const app = getApp()

Page({
  data: {
    orderList: [],
    loading: true,
    loadOver: false,
    pageNum: 1,
    pageSize: 10
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
    let _this = this;
    _this.setData({
      pageNum:1
    });
    _this.getOrderList();
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
    let _this = this;
    if (!_this.data.loadOver) {
      _this.getOrderList();
    }
  },
  getOrderList: function () {
    let _this = this;
    let requestHandler = {
      url: 'orders?pageNum=' + _this.data.pageNum + '&pageSize=' + _this.data.pageSize,
      method: 'GET',
      params: {},
      success: function (data) {
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