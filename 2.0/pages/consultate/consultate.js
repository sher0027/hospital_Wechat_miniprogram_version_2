// pages/consulate/consulate.js
import http from '../../utils/api'; // 引入api接口管理文件

Page({

  /**
   * 页面的初始数据
   */
  data: {
    depart: 0,
    departmentName: '',
  },

  addRecord: function (e) {
    wx.navigateTo({
      url: '/pages/addRecord/addRecord',
    })
  },

  recordList: function (e) {
    wx.navigateTo({
      url: '/pages/recordList/recordList',
    })
  },

  collapse: function (e) {
    if (this.data.isCollapse)
      this.setData({
        isCollapse: false
      })
    else
      this.setData({
        isCollapse: true
      })
  },

  changeDepartment: function (e) {
    var idx = e.currentTarget.dataset.index;
    var that = this;
    if (idx > -1) {
      that.setData({
        depart: that.data.departmentList[idx].id,
        departmentName: that.data.departmentList[idx].departmentName,
        isCollapse: false
      }, () => {
        // console.log(that.data.depart)
        http.recordMatch({
          data: {
            depart: that.data.depart
          },
          success: (res) => {
            console.log(res.data.data);
            that.setData({
              'recordList': res.data.data.list,
            })
          }
        })
      })
    } else {
      that.setData({
        depart: 0,
        isCollapse: false
      },()=>{
        http.recordList({
          data: {},
          success: (res) => {
            console.log(res.data.data.list);
            this.setData({
              'recordList': res.data.data.list,
            })
          }
        })
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
    console.log(this.data.depart)
    http.recordList({
      data: {},
      success: (res) => {
        console.log(res.data.data.list);
        this.setData({
          'recordList': res.data.data.list,
        })
      }
    })
    http.recordDepartment({
      data: {},
      success: (res) => {
        console.log(res.data.data);
        this.setData({
          'departmentList': res.data.data,
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