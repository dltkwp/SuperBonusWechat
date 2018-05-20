const WxParse = require('../../wxParse/wxParse.js')
const _ = require('../../utils/lodash.core');
const request = require('../../utils/request');
const modal = require('../../utils/modal');
const superConst = require("../../utils/super-const");
const message = require('../../utils/message');
var app = getApp()

Page({
  data: { 
    currentTab:0,
    loading: true,
    loadOver: false,
    pageNum: 1,
    pageSize: 10,
    taskList: []
  },
  onLoad: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });

    _this.setData({
      pageNum: 1
    });
    _this.getList();
    
  },
  gotoDetail: function (e) {
    var _this = this;
    _this.setData({ currentTab: e.detail.current });
  },
  swichNav: function (e) {
    var _this = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      _this.setData({
        currentTab: e.target.dataset.current
      })
    }
    _this.setData({
      pageNum:1
    });
    _this.getList();
  },
  getList: function () {
    let _this = this;

    let url = 'users/project/release';
    if (_this.data.currentTab == 1){
      url = 'users/project/undertake';
    }

    let requestHandler = {
      isLoading: true,
      url: url + '?pageNum=' + _this.data.pageNum + '&pageSize=' + _this.data.pageSize,
      method: 'GET',
      params: {},
      success: function (data) {
        try {
          // 处理下图片
          let _taskList = [];
          _.forEach(data.list, function (item) {
            if (item.images) {
              let arr = item.images.split(',');
              item.imageUrl = superConst.IMAGE_STATIC_URL + arr[0];
            }
            _taskList.push(item);
          });
          if (_this.data.pageNum > 1) {
            _taskList = _this.data.taskList.concat(data.list);
          }
          if (data.list.length < _this.data.pageSize) {
            _this.setData({ loadOver: true })

          }else{
            _this.setData({
              pageNum: _this.data.pageNum + 1,
            });
          }
          _this.setData({
            taskList: _taskList
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
      _this.getList();
    }
  },
})  