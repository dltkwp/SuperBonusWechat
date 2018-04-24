const _ = require('../../utils/lodash.core');
const request = require('../../utils/request');
const modal = require('../../utils/modal');
const message = require('../../utils/message');
const superConst = require("../../utils/super-const");
const app = getApp()

Page({
  data: {

    current: 0,
    showModalStatus: false,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    bannerList: [],
    productList: [],
    loading: true,
    loadOver: false,
    pageNum: 1,
    pageSize: 10
  },
  onLoad: function () {
   
  },
  onShow: function () {
    let _this = this;
    _this.setData({
      bannerList:[],
      productList:[]
    });
    setTimeout(function(){
      _this.getAdvImages();
      _this.getProductList();
    },0)
  },
  noWork: function () {
    modal({
      content: '程序猿小伙伴正在加班赶工中。。。'
    })
  },
  advItemClick: function (e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let _this = this;
    let cur = _this.data.bannerList[index];
    if (cur.href) {   // pages/product/product?productId=17
      wx.navigateTo({
        url: '../product/product?productId=' + cur.href
      });  
    }
  },
  getAdvImages: function () {
    let _this = this;
    let requestHandler = {
      url: 'advs',
      method: 'GET',
      params: {},
      success: function (data) {
        let temp = data;
        if (temp.length ==0){
          temp.push({
            image: superConst.HOME_BANNER_DEFAULT_IMAGE
          });
        }else{
          _.forEach(data,function(item){
            if(item.image.indexOf('product')>=0){
              item.image = superConst.IMAGE_STATIC_URL + item.image;
            }else{
              item.image = superConst.HOME_BANNER_DEFAULT_IMAGE;
            }
          })
        }
        _this.setData({
          bannerList: temp
        })
      },
      fail: function () {
        
      }
    }
    request(requestHandler);
  },
  getProductList : function () {
    let _this = this;
    let requestHandler = {
      url: 'products?pageNum=' + _this.data.pageNum + '&pageSize=' + _this.data.pageSize + '&status=1',
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
  },
  onReachBottom: function () {
    let _this = this;
    if (!_this.data.loadOver) {
      _this.getProductList();
    }
  },
})