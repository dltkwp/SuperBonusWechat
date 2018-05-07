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
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  gotoDetail: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  swichNav: function (e) {
    console.log(e,3453453453);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  getList: function () {
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

          }
          _this.setData({
            pageNum: _this.data.pageNum + 1,
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