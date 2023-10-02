// components/OrderList/OrderList.js
import http from '../../utils/api'; // 引入api接口管理文件

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderList: {
      type: Array,
      value: "[]"
    },
    sid: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    preview: function (e) {
      console.log(e.currentTarget.id);
      console.log(e.currentTarget.dataset.index);
      http.orderDetail({
        data: {
          oid: e.currentTarget.id
        },
        success: (res)=>{
          console.log(res.data.data)
          let url = res.data.data.orderPics[e.currentTarget.dataset.index]
          wx.previewImage({
            // current: '', // 当前显示图片的 http 链接
            urls: [url] // 需要预览的图片 http 链接列表
          })
        }
      })
    },


    orderDetail: function (e) {
      var idx = e.currentTarget.dataset.index;
      var that = this;
      wx.navigateTo({
        url: '/pages/orderDetail/orderDetail',
        success: function (res) {
          res.eventChannel.emit('getParam', {
            data: that.data.orderList[idx].oid,
          })
        }
      })
    },

    orderDelete: function (e) {
      var that = this;
      // console.log(e.currentTarget.id)
      let oid = e.currentTarget.id
      wx.showModal({
        title: '提示',
        content: '确定删除该订单？',
        cancelColor: '#008000',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            // console.log(oid)
            http.deleteOrder({
              data: {
                oid: oid
              },
              success: (res) => {
                if (that.data.sid) {
                  http.orderMatch({
                    data: {
                      'type': that.data.sid,
                    },
                    success: (res) => {
                      that.setData({
                        'orderList': res.data.data,
                      })
                    }
                  })
                } else {
                  http.orderList({
                    data: {},
                    success: (res) => {
                      console.log(res.data.data);
                      that.setData({
                        'orderList': res.data.data,
                      })
                    }
                  })
                }
                wx.showToast({ //显示消息提示框
                  icon: "success",
                  title: '删除成功！',
                  duration: 1500,
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

    orderCancel: function (e) {
      var that = this;
      let oid = e.currentTarget.id
      wx.showModal({
        title: '提示',
        content: '确定取消该订单？',
        cancelColor: '#008000',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            http.cancelOrder({
              data: {
                oid: oid
              },
              success: (res) => {
                if (that.data.sid) {
                  http.orderMatch({
                    data: {
                      'type': that.data.sid,
                    },
                    success: (res) => {
                      that.setData({
                        'orderList': res.data.data,
                      })
                    }
                  })
                } else {
                  http.orderList({
                    data: {},
                    success: (res) => {
                      console.log(res.data.data);
                      that.setData({
                        'orderList': res.data.data,
                      })
                    }
                  })
                }
                wx.showToast({ //显示消息提示框
                  icon: "success",
                  title: '取消成功！',
                  duration: 1500,
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

    orderResubmit: function (e) {
      var that = this;
      let oid = e.currentTarget.id
      wx.showModal({
        title: '提示',
        content: '重新提交该订单？',
        confirmColor: '#008000',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            http.resubmitOrder({
              data: {
                oid: oid
              },
              success: (res) => {
                if (that.data.sid) {
                  http.orderMatch({
                    data: {
                      'type': that.data.sid,
                    },
                    success: (res) => {
                      that.setData({
                        'orderList': res.data.data,
                      })
                    }
                  })
                } else {
                  http.orderList({
                    data: {},
                    success: (res) => {
                      console.log(res.data.data);
                      that.setData({
                        'orderList': res.data.data,
                      })
                    }
                  })
                }
                wx.showToast({ //显示消息提示框
                  icon: "success",
                  title: '提交成功！',
                  duration: 1500,
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
  }
})