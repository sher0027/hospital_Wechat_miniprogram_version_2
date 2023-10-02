// pages/importRecord/importRecord.js
import http from '../../utils/api'; // 引入api接口管理文件

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordsId: []
  },

  ChooseRecord: function (e) {
    // console.log(e.detail.value)
    this.setData({
      recordsId: e.detail.value, //单个选中的值
    })
  },

  importRecord: function (options) {
    var that = this;
    // console.log(this.data.recordsId)
    if(this.data.recordsId.length > 0){
      http.recordImported({
        data: {
          records: that.data.recordsId
        },
        success: (res) => {
          console.log(res.data)
          if (res.data.status == 200) {
            wx.setStorageSync('temp', that.data.recordsId)
            wx.showToast({
              title: '导入成功',
              icon: 'success',
              duration: 2000,
              success: (res) => {
                setTimeout(function () {
                  wx.navigateBack()
                }, 500)
              }
            })
          } else {
            wx.showToast({
              title: '系统错误',
              icon: 'error',
              duration: 2000,
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '请选择记录',
        icon: 'error',
        duration: 2000,
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
    http.importRecord({
      data: {},
      success: (res) => {
        // console.log(res.data.data.list);
        this.setData({
          'recordList': res.data.data.list,
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