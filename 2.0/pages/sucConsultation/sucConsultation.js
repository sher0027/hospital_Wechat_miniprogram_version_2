// pages/sucConsulation/sucConsulation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  back: function (options) {
    const pages = getCurrentPages();    //获取当前页面信息栈
    const prevPage = pages[pages.length - 3];    //获取上两个页面信息
    console.log(prevPage.route)
    if (prevPage.route == "pages/home/home") {
      wx.switchTab({
        url: '/pages/home/home',
      })
    }else{
      wx.navigateBack({
        delta: 2,
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