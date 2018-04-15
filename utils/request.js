let moment = require('./moment.min');
let superConst = require('./super-const');

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

  refreshToken();

  requestHandler.isLoading = requestHandler.isLoading || false;
  requestHandler.isLoading && wx.showLoading({ title: '加载中...' });

  const header = {
    Authorization: wx.getStorageSync(superConst.SUPER_TOKEN_KEY).token, //  登录token 
  };
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

          } break;
          default: {
            requestHandler.success && requestHandler.success(res.data);
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

/**
 * 刷新登录token过期时间
 * 主要是判定是否有memberId，只有在是会员的情况下才进行刷新token
 */
const refreshToken = function () {
  let auth = wx.getStorageSync(superConst.SUPER_TOKEN_KEY);
  if(auth && auth.memberId){
    request({
      url:'',
      method:'',
      success:function(){
        
      }
    })
  }
}

module.exports = request;