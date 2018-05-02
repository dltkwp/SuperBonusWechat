let moment = require('./moment.min');
let superConst = require('./super-const');
let message = require('./message');

/**
 * http request 封装
 * @param {请求对象} requestHandler 
 * {
 *    url: '请求地址',
 *    params: '请求参数'，
 *    method: '请求method, 可以不传递，默认为: POST',
 *    isLoading: '是否显示加载等待效果',
 *    success: fn (成功回调处理),
 *    fail: fn (失败回调处理)
 * }
 * content-type 默认为 'application/json';
 */
const request = function (requestHandler) {

  requestHandler.isLoading = requestHandler.isLoading || false;
  requestHandler.isLoading && wx.showLoading({ title: '加载中...' });

  let storage = wx.getStorageSync(superConst.SUPER_TOKEN_KEY)
  const header = {}
  if(storage){
    header.token = storage.token//  登录token 
  }
  // 设置默认的 method => POST
  requestHandler.method = requestHandler.method || superConst.REQUEST_DEFAULT_METHOD;
  superConst.IS_DEBUG && console.log(superConst.API_BASE_URL + requestHandler.url + '  [start]');

  wx.request({
    url: superConst.API_BASE_URL + requestHandler.url,
    method: requestHandler.method,      // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: header,                     // 设置请求的 header
    data: requestHandler.params,
    success: function (res) {
      const statusCode = res.statusCode;
      // http 请求 code 的处理  说明情况下是返回成功
      if (statusCode < 500) {
        switch (statusCode) {
          case 401: { // 未登录授权自动跳转
            wx.redirectTo({ url: '../register/register' });
            console.error('未登录授权');
          } break;
          default: {
            //-- 拦截后端返回的结果
            let data = res.data;
            if (data.code && data.code>0){
                message.error(data.msg);
            }else{
              requestHandler.success && requestHandler.success(data);
            }
            
          }
        }
      } else {
        requestHandler.fail && requestHandler.fail();
      }
    },
    fail: function () {
      requestHandler.fail && requestHandler.fail();
    },
    complete: function () {
      requestHandler.isLoading && wx.hideLoading();
      superConst.IS_DEBUG && console.log(superConst.API_BASE_URL + requestHandler.url + '  [end]');
    }
  })
}


module.exports = request;
