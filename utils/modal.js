const _ = require('./lodash.core')
const showModal = function (showModalHandle){

    const cfg = {
       title:'温馨提示',
       content:'',
       showCancel:false,
       cancelText:'取消',
       cancelColor: '#000000',
       confirmText: '确定',
       confirmColor: '#000000',
       success: function(){},
       fail: function(){},
       complete: function (){}
    }
    Object.assign(cfg,showModalHandle);

    wx.showModal(cfg)
}

module.exports = showModal
