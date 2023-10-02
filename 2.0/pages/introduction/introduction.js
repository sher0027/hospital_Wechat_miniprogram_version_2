// pages/introduction/introduction.js
import http from '../../utils/api'; // 引入api接口管理文件

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareURL: ""
  },

  preserve: function (options) {
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.writePhotosAlbum']) {
          that.saveImg();
        } else if (res.authSetting['scope.writePhotosAlbum'] === undefined) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              that.saveImg();
            },
            fail() {
              that.authConfirm()
            }
          })
        } else {
          that.authConfirm()
        }
      }
    })
  },
  // 授权拒绝后，再次授权提示弹窗
  authConfirm() {
    let that = this
    console.log('授权')
    wx.showModal({
      content: '检测到您没打开保存图片权限，是否去设置打开？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({
            success(res) {
              if (res.authSetting['scope.writePhotosAlbum']) {
                that.saveImg();
              } else {
                wx.showToast({
                  title: '您没有授权，无法保存到相册',
                  icon: 'none'
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '您没有授权，无法保存到相册',
            icon: 'none'
          })
        }
      }
    });
  },
  // 图片保存到本地
  saveImg() {
    console.log('保存')
    wx.downloadFile({
      url: this.data.shareURL, //图片地址
      success: function (res) {
        wx.showLoading()
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            wx.hideLoading()
            console.log(res)
            wx.showModal({
              title: '提示',
              content: '保存成功！',
              showCancel: false,
            })
          },
          fail: function (err) {
            wx.hideLoading()
            console.log(err)
          }
        })
      }
      
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.options)
    http.sharePic({
      data: {
        teamId: this.options.teamId
      },
      success: (res) => {
        console.log(res.data.data)
        this.setData({
          'shareURL': res.data.data
        })
      }
    })
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