// pages/orderDetail/orderDetail.js
import http from '../../utils/api'; // 引入api接口管理文件
let eventChannel;

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  preview: function (e) {
    // console.log(e.currentTarget.id);
    console.log(e.currentTarget.dataset.index);
    let url = this.data.orderDetail.orderPics[e.currentTarget.dataset.index]
    wx.previewImage({
      // current: '', // 当前显示图片的 http 链接
      urls: [url] // 需要预览的图片 http 链接列表
    })

  },

  recordRelated: function (options) {
    var that = this;
    wx.navigateTo({
      url: '/pages/recordRelated/recordRelated',
      success: function (res) {
        res.eventChannel.emit('getParam', {
          data: that.data.oid
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
    // console.log(that.data.detail)
    eventChannel = this.getOpenerEventChannel();
    eventChannel.on("getParam", function (data) {
      console.log(data.data); //传递过来的参数
      that.setData({
        'oid': data.data,
      }, () => {
        console.log(that.data.oid)
        let oid = that.data.oid;
        http.orderDetail({
          data: {
            oid: oid
          },
          success: (res) => {
            console.log(oid)
            console.log(res.data.data)
            that.setData({
              'orderDetail': res.data.data,
            })
          }
        })
        http.recordRelated({
          data: {
            oid: oid
          },
          success: (res) => {
            console.log(oid)
            console.log(res.data.data)
            that.setData({
              'recordList': res.data.data,
            })
          }
        })
      })
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