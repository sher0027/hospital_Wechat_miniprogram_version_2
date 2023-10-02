module.exports = {
  http(url, method, params) {
    let token = wx.getStorageSync('token') // 获取token，自行获取token
    let data = {token}
    if (params.data) { // 在这里判断一下data是否存在，params表示前端需要传递的数据，params是一个对象，有三组键值对，data：表示请求要发送的数据，success：成功的回调，fail：失败的回调，这三个字段可缺可无，其余字段会忽略
      for (let key in params.data) { // 在这里判断传过来的参数值为null，就删除这个属性
        if (params.data[key] == null || params.data[key] == 'null') {
          delete params.data[key]
        }
      }
      data = { ...params.data }
      // data = { ...data, ...params.data }

    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      // url: 'http://127.0.0.1:4523/mock/829477' + url, 
      url: 'https://www.medwaykey.com/to/super-doctor/prd/api' + url,
       //拼接上前缀,此接口域名是开放接口，可访问
      method: method == 'POST' ? 'POST' : (method == 'GET' ? 'GET' : (method == 'PUT' ? 'PUT' : 'DELETE')), // 判断请求类型
      data,
      header: {
        'content-type': method == 'PUT' ?'application/json': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        wx.hideLoading();
        params.success && params.success(res)
      },
      fail(err) {
        wx.hideLoading();
        params.fail && params.fail(err)
      }
    })
  }
}
// function CreateHeader(url, complete) {
//   var header = {
//     'content-type': 'application/json'
//   }
//   if (exceptionAddrArr.indexOf(url) == -1) {  //排除请求的地址不需要token的地址
//     wx.getStorage({
//       key: tokenKey,
//       success: function (res) {
//         header.Authorization = 'Bearer ' + res.data;
//       },
//       fail: function (error) {
//         console.log(error);
//       },
//       complete: function () {
//         complete && typeof complete === 'Function' ? complete(header) : null;
//       }
//     });
//   } else {
//     complete && typeof complete === 'Function' ? complete(header) : null;
//   }
// }