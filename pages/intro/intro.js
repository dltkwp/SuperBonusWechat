const _ = require('../../utils/lodash.core');
const request = require('../../utils/request');
const modal = require('../../utils/modal');
const superConst = require("../../utils/super-const");
const util = require("../../utils/util")
const app = getApp()

Page({
  data: {
    images: [],
    scrollData: {
      offetHeight: 15, // px
      height: 80, // px
      colunm: 3
    },
    showIndex: 0
  },
  onLoad: function (options) {
    let _this = this;
    _this.getIntroduce();
    _this.initImages();
  },
  onReady: function () {

  },
  onShow: function () {

  },
  initImages: function () {
      let _this = this;
      let imageUrl = superConst.IMAGE_STATIC_URL.replace('/product','');
      let len = 23;
      let imgArr = [];
      for(let i=0;i<len;i++){
        imgArr.push(imageUrl + "2018042201/" + i + '.jpeg');
      }
      _this.setData({
        images: imgArr
      })
  },
  scrollHide(e) {
    let data = [
      this.data.scrollData.offetHeight,
      e.detail.scrollTop,
      this.data.scrollData.height,
      this.data.scrollData.colunm
    ]

    let index = util.countIndex(...data)

    this.setData({
      showIndex: index
    })
  },
  getIntroduce: function () {  //  读取平台介绍

  }
})