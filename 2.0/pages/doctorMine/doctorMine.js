// pages/doctorMine/doctorMine.js
import http from '../../utils/api'; // 引入api接口管理文件

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  doctorTeam: function (e) {
    console.log(e.currentTarget.dataset)
    var idx = e.currentTarget.dataset.index;
    var that = this;
    if (e.currentTarget.id == 1) {
      wx.navigateTo({
        url: '/pages/doctorTeam/doctorTeam?tid=' + that.data.doctorHistory[idx].tid,
      })
    } else {
      wx.navigateTo({
        url: '/pages/doctorTeam/doctorTeam?tid=' + that.data.doctorMine[idx].tid,
      })
    }
  },

  followCancel: function (e) {
    var that = this;
    var tid = e.currentTarget.id;
    // console.log(tid)
    wx.showModal({
      title: '提示',
      content: '确定取消关注医生团队？',
      cancelColor: '#008000',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          http.followCancel({
            data: {
              tid: tid
            },
            success: (res) => {
              wx.showToast({ //显示消息提示框
                icon: "success",
                title: '取消成功！',
                duration: 1500,
                success: (res) => {
                  setTimeout(function () {
                    http.followALL({
                      data: {},
                      success: (res) => {
                        that.setData({
                          'doctorMine': res.data.data.present,
                          'doctorHistory': res.data.data.history
                        })
                      }
                    })
                  }, 500)
                }
              })

            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  followResubmit: function (e) {
    var that = this;
    var tid = e.currentTarget.id;
    http.follow({
      data: {
        tid: tid
      },
      success: (res) => {
        // console.log(res.data.data.hasFollowed)
        wx.showToast({ //显示消息提示框
          icon: "success",
          title: '关注成功！',
          duration: 1500,
          success: (res) => {
            setTimeout(function () {
              http.followALL({
                data: {},
                success: (res) => {
                  that.setData({
                    'doctorMine': res.data.data.present,
                    'doctorHistory': res.data.data.history
                  })
                }
              })
            }, 500)
          }
        })
      }
    })
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
    http.followALL({
      data: {},
      success: (res) => {
        console.log(res.data.data)
        that.setData({
          'doctorMine': res.data.data.present,
          'doctorHistory': res.data.data.history
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