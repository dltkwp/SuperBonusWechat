const WxParse = require('../../wxParse/wxParse.js')
const _ = require('../../utils/lodash.core');
const request = require('../../utils/request');
const modal = require('../../utils/modal');
const superConst = require("../../utils/super-const");
const message = require('../../utils/message');

Page({
  data: {
    areaList: [],
    areaShow: '区域',

    orderByList:[],
    orderBy: 'created',
    orderType: 'DESC',
    orderShowText: '智能排序',

    showArea: false,
    showOrderBy: false,
    area:'',

    loading: true,
    loadOver: false,
    pageNum: 1,
    pageSize: 10,
    areaList: [],
    taskList: []
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
    this.setData({
      pageNum: 1,
      orderByList: [{
        key: 'DESC',
        type:'created',
        value: '智能排序'
      }
      // ,{
      //   key: 'ASC',
      //   type:'price',
      //   value: '提成金额升序'
      // }, {
      //     key: 'DESC', 
      //     type: 'price',
      //     value: '提成金额降序'
      // }
      ]
    })
    this.getAreaList();
    this.getList();
  },
  onReachBottom: function () {
    if (!this.data.loadOver) {
      this.setData({
        loadOver: false
      })
      this.getList()
    }
  },
  onSearch: function (e) {
    this.setData({
      queryKey: e.detail.value,
      pageNo: 1
    })
    this.getList(true)
  },
  clickOrderBy: function (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      pageNo: 1,
      showOrderBy: false,
      orderBy: this.data.orderByList[index].type,
      orderType: this.data.orderByList[index].key,
      orderShowText: this.data.orderByList[index].value
    })
    this.getList(true)
  },
  clickArea: function (e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      pageNo: 1,
      showArea: false,
      area: this.data.areaList[index].key,
      areaShow: this.data.areaList[index].key == '' ? '区域' : this.data.areaList[index].key
    })
    this.getList()
  },
  choiceItem: function (event) {
    let type = event.currentTarget.dataset.item
    switch (type) {
      case '1':
        this.setData({
          showArea: true,
          showOrderBy: false
        })
        break
      case '2':
        this.setData({
          showArea: false,
          showOrderBy: true
        })
        break
    }
  },
  hideAllChioce: function () {
    this.setData({
      showArea: false,
      showOrderBy: false
    });
  },
  getAreaList: function () {
    let _this = this;
    // _this.setData({
    //   areaList: [
    //     { key: '', name: '全部' }]
    // });
    // return false;

    let requestHandler = {
      isLoading: true,
      url: 'projects/areas',
      method: 'GET',
      params: {},
      success: function (data) {
        try {
          let arr = [{key:'',name:'全部'}];
          _.forEach(data,function(item){
            arr.push({ key: item, name: item });
          });
          _this.setData({
            areaList: arr
          });
        } catch (e) {
          console.error(e);
        }
      },
      fail: function () {}
    }
    request(requestHandler);
  },
  getList: function () {
    let _this = this;
    let param = [];
    param.push('pageNum=' + _this.data.pageNum);
    param.push('pageSize=' + _this.data.pageSize);

    if (_this.data.area){
      param.push('areas=' + _this.data.area);
    }

    if (_this.data.orderBy!='created'){
      param.push('orderBy=' + _this.data.orderBy);
      param.push('orderType=' + _this.data.orderType);
    }


    let requestHandler = {
      isLoading: true,
      url: 'projects?' + param.join('&'),
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
          if (_taskList.length ==0 && _this.data.pageNum ==1){
            _this.setData({
              pageNum: 1,
              taskList: _taskList
            });
          } else if (_taskList.length > 0){
            _this.setData({
              pageNum: _this.data.pageNum + 1,
              taskList: _taskList
            });
          }
          
        } catch (e) {
          console.error(e);
        }
      },
      fail: function () {}
    }
    request(requestHandler);
  }
})