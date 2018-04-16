let regex = require('../../utils/regex');
let message = require('../../utils/message');
let request = require('../../utils/request');
let timer = null;

Page({
  data: {
    mobile: '',
    smsCode: '',
    isActiveSms: false,
    totalInterval: 60,
    smsTip: '获取验证码',
    interval: 1000,
  },
  onLoad: function (options) {
    let _this = this;
  },
  onShow: function () {
    let _this = this;


    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })


  },
  login: function (e) {
    let _this = this;
    let form = e.detail.value;
    let mobile = form.mobile;
    let smsCode = form.smsCode;
    if (!regex.mobile(mobile)) {
      message.warn('手机号格式不正确.');
      return false;
    }
    if (smsCode == '') {
      message.warn('短信验证码不可为空');
      return false;
    }
  },
  send: function (e) {
    let _this = this;
    if (!regex.mobile(_this.data.mobile)) {
      message.warn('手机号格式不正确.');
      return false;
    }
    _this.sendSms();
  },
  sendSms: function () {
    let _this = this;
    let requestHandle = {
      url: 'sms/send',
      params: {
        phone: _this.data.mobile
      },
      method: 'POST',
      success: function (data) {
        message.success('发送短信成功');
        _this.createTimer();
      },
      fail: function () {}
    };
    request(requestHandle);
  },
  mobileInput: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  smsCodeInput: function (e) {
    this.setData({
      smsCode: e.detail.value
    })
  },
  createTimer: function () {
    let _this = this;
    if (!timer) {
      timer = setInterval(function () {
        let curCnt = _this.data.totalInterval - 1;
        if (_this.data.totalInterval != 0) {
          _this.setData({
            isActive: true,
            totalInterval: curCnt,
            smsTip: curCnt + 's后获取',
          })
        } else {
          _this.setData({
            isActive: false,
            smsTip: '获取验证码',
            totalInterval: 60
          })
          if (timer) {
            window.clearInterval(timer);
            timer = null;
          }
        }
      }, _this.data.interval);
    }
  }

})