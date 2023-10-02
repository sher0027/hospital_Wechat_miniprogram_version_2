// pages/orderList/orderList.js
import http from '../../utils/api'; // 引入api接口管理文件
let eventChannel;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusList: [{
        name: "全部",
        sid: "0",
        checked: false
      },
      {
        name: "待接诊",
        sid: "2",
        checked: false
      },
      {
        name: "已回复",
        sid: "3",
        checked: false
      },
      {
        name: "已取消",
        sid: "4",
        checked: false
      }
    ],
    isShow: true
  },

  change_status: function (e) {
    let index = e.currentTarget.dataset.index
    let statuslist = this.data.statusList
    for (let i = 0, len = statuslist.length; i < len; ++i) {
      statuslist[i].checked = false
    }
    statuslist[index].checked = true
    this.setData({
      'statusList': statuslist, //这里只改变了checked值
      'sid': statuslist[index].sid
    })
    if (this.data.sid == 0) {
      http.orderList({
        data: {},
        success: (res) => {
          console.log(res.data.data);
          this.setData({
            'orderList': res.data.data,
          })
        }
      })
    } else {
      http.orderMatch({
        data: {
          'type': this.data.sid,
        },
        success: (res) => {
          // console.log(res.data.data)
          this.setData({
            'orderList': res.data.data,
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    eventChannel = this.getOpenerEventChannel();
    eventChannel.on("getParam", function (data) {
      console.log(data.data); //传递过来的参数
      if (data.data) {
        that.setData({
          'sid': data.data,
        }, () => {
          console.log(that.data.isShow)
          let sid = that.data.sid;
          if (sid) {
            http.orderMatch({
              data: {
                'type': sid,
              },
              success: (res) => {
                let index = sid - 1
                let check = "statusList[" + index + "].checked"
                that.setData({
                  [check]: true,
                  'orderList': res.data.data,
                })
              }
            })
          }
        })
      } else {
        http.orderList({
          data: {},
          success: (res) => {
            console.log(res.data.data);
            that.setData({
              'statusList[0].checked': true,
              'orderList': res.data.data,
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})