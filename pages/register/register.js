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
    headImgUrl: '',
    nickname: '',
    sex: 1
  },
  onLoad: function (options) {
    let _this = this;
  },
  onShow: function () {
    let _this = this;
    wx.getUserInfo({
      success: function (res) {
        let userInfo = res.userInfo;
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country

        _this.setData({
          headImgUrl: avatarUrl,
          nickname: nickName,
          sex: gender
        })
      },
      fail: function () {
        wx.showModal({
          title: '警告',
          confirmText:'重新授权',
          cancelText: '不授权',
          content: '您点击了拒绝授权，将无法正常使用全部功能体验。点击重新授权,则可重新使用,点击不授权后还想使用小程序,需在微信[发现]-[小程序]-[删掉][超级悬赏],重新搜索授权登陆方可使用.',
          success: function(){
            wx.openSetting({
              success: function (res) {
                if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                  wx.getUserInfo({
                    success: function (res) {
                      let userInfo = res.userInfo;
                      var nickName = userInfo.nickName
                      var avatarUrl = userInfo.avatarUrl
                      var gender = userInfo.gender //性别 0：未知、1：男、2：女
                      var province = userInfo.province
                      var city = userInfo.city
                      var country = userInfo.country

                      _this.setData({
                        headImgUrl: avatarUrl,
                        nickname: nickName,
                        sex: gender
                      })
                  }})
                }
              }
            })
          }
        })
      }
    })

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
    let param = [];
    param.push('phone=' + _this.data.mobile);
    param.push('checkCode=' + _this.data.smsCode);

    if (_this.data.headImgUrl){
      param.push('headImage=' + _this.data.headImgUrl);
    }

    if (_this.data.nickname) {
      param.push('nickname=' + _this.data.nickname);
    }

    if (_this.data.sex) {
      param.push('sex=' + _this.data.sex);
    }

    let requestHandle = {
      url: 'sms/check?' + param.join('&'),
      method: 'POST',
      success: function (data) {
        message.success('注册成功');
        wx.switchTab({url: '../index/index'});
      },
      fail: function () {}
    };
    request(requestHandle);

  },
  send: function (e) {
    let _this = this;
    if (!regex.mobile(_this.data.mobile)) {
      message.warn('手机号格式不正确.');
      return false;
    }
    if (!_this.data.isActive) {
      _this.sendSms();
    }
  },
  sendSms: function () {
    let _this = this;
    let requestHandle = {
      url: 'sms/send?phone=' + _this.data.mobile,
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
            clearInterval(timer);
            timer = null;
          }
        }
      }, _this.data.interval);
    }
  }

})