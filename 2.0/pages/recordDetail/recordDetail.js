// pages/recordDetail/recordDetail.js
import http from '../../utils/api'; // 引入api接口管理文件
let eventChannel;

Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  preview: function (e) {
    // console.log(e.currentTarget.id);
    console.log(e.currentTarget.dataset.index);
    let url = this.data.recordDetail.pictures[e.currentTarget.dataset.index]
    wx.previewImage({
      // current: '', // 当前显示图片的 http 链接
      urls: [url] // 需要预览的图片 http 链接列表
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    // console.log(that.data.detail)
    eventChannel = this.getOpenerEventChannel();
    eventChannel.on("getParam", function (data) {
      console.log(data.data); //传递过来的参数
      that.setData({
        'rid': data.data,
      }, () => {
        console.log(that.data.rid)
        let rid = that.data.rid;
        http.recordDetail({
          data: {
            rid: rid
          },
          success: (res) => {
            console.log(rid)
            console.log(res.data.data)
            that.setData({
              'recordDetail': res.data.data,
            })
          }
        })
      })
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