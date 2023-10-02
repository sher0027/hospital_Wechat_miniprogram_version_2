// pages/hint/hint.js
import http from '../../utils/api'; // 引入api接口管理文件

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  sysHintDetail: function (options) {
    wx.navigateTo({
      url: '/pages/sysHintDetail/sysHintDetail',
    })
  },

  orderDetail: function (e) {
    // console.log(e)
    var idx = e.currentTarget.dataset.index;
    var that = this;
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail',
      success: function (res) {
        res.eventChannel.emit('getParam', {
          data: that.data.DoctorHint[idx].orderId,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that = this;
    http.SysHint({
      data: {},
      success: (res) => {
        console.log(res.data.data.list[0])
        that.setData({
          'SysHint': res.data.data.list[0],
        })
      }
    })
    http.DoctorHint({
      data: {},
      success: (res) => {
        console.log(res.data.data.list)
        that.setData({
          'DoctorHint': res.data.data.list,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})