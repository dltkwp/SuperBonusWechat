const _ = require('../../utils/lodash.core');
const request = require('../../utils/request');
const modal = require('../../utils/modal');
const message = require('../../utils/message');
const superConst = require("../../utils/super-const");
const util = require("../../utils/util");

const app = getApp()
let timer = null;

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
    pageSize: 10,

    marqueeList:[], // 首页的循环体 默认显示最新的5条 没有的话不显示
    marquee:{}, //  当前循环体是什么
    marqueeIndex:0, // 循环体索引
    maxMarqueeIndex: 0, // 最大的索引值，达到了就自动变更为 marqueeIndex=0
  },
  onLoad: function () {
    let _this = this;
    _this.setData({
      bannerList: [],
      productList: []
    });
    setTimeout(function () {
      _this.getAdvImages();
      _this.getProductList();
    }, 0)
  },
  onShow: function () {
    let _this = this;
    _this.getProjects();
  },
  publishSubmit: function () {
    let _this = this;
    util.isPayAccount('publish', function () {
      wx.redirectTo({url: '../release/release'});
    })
  },
  advItemClick: function (e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let _this = this;
    let cur = _this.data.bannerList[index];
    if (cur.href) {  
      switch (cur.type) {
        case 'product': { 
          wx.navigateTo({
            url: '../product/product?productId=' + cur.href
          });
        } break;
        case 'project': { 
          wx.navigateTo({
            url: '../task/task?id=' + cur.href
          });
        } break;
        case 'custom': {
          wx.navigateTo({
            url: '../page/page?id=' + cur.href
          });
        } break;
      }
    }
  },
  getAdvImages: function () {
    let _this = this;
    let requestHandler = {
      isLoading: true,
      url: 'advs',
      method: 'GET',
      params: {},
      success: function (data) {
        let temp = data;
        if (temp.length == 0) {
          temp.push({
            image: superConst.HOME_BANNER_DEFAULT_IMAGE
          });
        } else {
          _.forEach(data, function (item) {
              item.image = superConst.IMAGE_STATIC_URL + item.image;
          })
        }
        _this.setData({
          bannerList: temp
        })
      },
      fail: function () {}
    }
    request(requestHandler);
  },
  getProductList: function () {
    let _this = this;
    let requestHandler = {
      isLoading: true,
      url: 'products?pageNum=' + _this.data.pageNum + 
           '&pageSize=' + _this.data.pageSize + 
           '&status=1',
      method: 'GET',
      params: {},
      success: function (data) {
        try {
          // 处理下图片
          let _productList = [];
          _.forEach(data.list, function (item) {
            if (item.images) {
              let arr = item.images.split(',');
              item.imageUrl = superConst.IMAGE_STATIC_URL + arr[0];
            }
            _productList.push(item);
          });
          if (_this.data.pageNum > 1) {
            _productList = _this.data.productList.concat(data.list);
          }
          if (data.list.length < _this.data.pageSize) {
            _this.setData({ loadOver: true })

          }
          _this.setData({
            pageNum: _this.data.pageNum + 1,
            productList: _productList
          });
        } catch (e) {
          console.error(e);
        }
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
  getProjects: function () {
    let _this = this;

    let param = [];
    param.push('pageNum=1');
    param.push('pageSize=5');

    let requestHandler = {
      isLoading: true,
      url: 'projects?' + param.join('&'),
      method: 'GET',
      params: {},
      success: function (data) {
        _this.setData({
          marqueeList: data.list
        });
        if (timer){
          clearInterval(timer);
          timer = null;
        }
        if(data.list.length>0){
          _this.setData({
            marqueeIndex:0,
            marquee:data.list[0],
            maxMarqueeIndex:data.list.length
          });

          if(!timer && data.list.length >=2) {
            timer = setInterval(function(){
              console.log('input into .....');

              _this.setData({
                marqueeIndex: _this.data.marqueeIndex + 1
              })

              if (_this.data.marqueeIndex == _this.data.maxMarqueeIndex) {
                _this.setData({
                  marqueeIndex: 0,
                  marquee: _this.data.marqueeList[0]
                })
              } else {
                _this.setData({
                  marquee: _this.data.marqueeList[_this.data.marqueeIndex ]
                })
              }
            },5000);
          }
        }
      },
      fail: function () { }
    }
    request(requestHandler);
  },
  onShareAppMessage: function (res) {
    return {
      title: '超级悬赏',
      path: '/pages/index/index',
      success: function (res) { },
      fail: function (res) { }
    }
  }
})