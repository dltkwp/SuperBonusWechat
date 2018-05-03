const WxParse = require('../../wxParse/wxParse.js')
const _ = require('../../utils/lodash.core');
const request = require('../../utils/request');
const modal = require('../../utils/modal');
const message = require('../../utils/message');
const superConst = require("../../utils/super-const");
const moment  = require("../../utils/moment.min.js");
const app = getApp()

Page({
  data: {
    id:'',
    images:[],
    detail:{}
  },
  onLoad: function (options) {
    let _this = this;
    _this.setData({
      id: options.id
    });
    _this.getDetail();
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  submit: function () {
    let _this = this;
    let storage = wx.getStorageSync(superConst.SUPER_TOKEN_KEY);
    if (storage && storage.userId) {
      let requestHandler = {
        isLoading: true,
        url: 'projects/' + _this.data.id + '/users/' + storage.userId,
        method: 'POST',
        params: {},
        success: function (data) {
          message.success('操作成功');
        },
        fail: function () { }
      }
      request(requestHandler);
    }
  },
  getDetail: function () {
    let _this = this;
    let requestHandler = {
      isLoading: true,
      url: 'projects/' + _this.data.id,
      method: 'GET',
      params: {},
      success: function (data) {
        try {
          let arr = [];
          if (data.images) {
               let imagesArr = data.images.split(',');
               _.forEach(imagesArr,function(item){
                arr.push(superConst.IMAGE_STATIC_URL + item);                
              })
          }   
          data.startDateStr = moment(data.startDate).format('YYYY/MM/DD');
          data.endDateStr = moment(data.endDateStr).format('YYYY/MM/DD');

          WxParse.wxParse('article', 'html', data.description, _this, 5)

          _this.setData({
            images: arr,
            detail:  data
          });
        } catch (e) {
          console.error(e);
        }
      },
      fail: function () {}
    }
    request(requestHandler);
  }
})