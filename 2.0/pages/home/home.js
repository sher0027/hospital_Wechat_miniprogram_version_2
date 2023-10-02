// pages/home/home.js
import http from '../../utils/api'; // 引入api接口管理文件
var app = getApp();
let eventChannel;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollW: 0,
    Team: "",
    team: "",
  },

  doctorTeam: function (options) {
    var that = this;
    if (that.data.followList.length == 0) {
      wx.showToast({
        icon: 'error',
        title: '请先关注医生！',
      })
    } else {
      wx.navigateTo({
        url: '/pages/doctorTeam/doctorTeam?tid='+that.data.Team
        // success: function (res) {
        //   res.eventChannel.emit('getParam', {
        //     data: that.data.Team
        //   })
        // }
      })
    }
  },


  addConsultation: function (options) {
    var that = this
    if (that.data.followList.length == 0) {
      wx.showToast({
        icon: 'error',
        title: '请先关注医生！',
      })
    } else {
      wx.navigateTo({
        url: '/pages/addConsultation/addConsultation',
        success: function (res) {
          res.eventChannel.emit('getParam', {
            data: that.data.Team
          })
        }
      })
    }
  },

  hint: function (options) {
    var that = this
    wx.navigateTo({
      url: '/pages/hint/hint',
      success: function (res) {
        res.eventChannel.emit('getParam', {
          data: that.data.Team
        })
        http.readHint({
          data: {},
          success:(res)=>{
            console.log(res.data.data)
          }
        })
      }
    })
  },

  slideScroll: function (e) {
    // console.log(e)
    //获取滚动距离
    let left = e.detail.scrollLeft;
    // let width = e.detail.scrollWidth;
    //将滚动距离（位移）动态添给进度条的left
    this.setData({
      scrollW: left
    })
  },

  change_department: function (e) {
    let index = e.currentTarget.dataset.index
    let followlist = this.data.followList
    for (let i = 0, len = followlist.length; i < len; ++i) {
      followlist[i].checked = false
    }
    followlist[index].checked = true
    wx.setStorageSync('Index', index);
    this.setData({
      'followList': followlist, //这里只改变了checked值
      'Team': followlist[index].tid
    })
    http.doctorTeam({
      data: {
        'tid': this.data.Team,
      },
      success: (res) => {
        // console.log(res.data.data)
        this.setData({
          'doctorTeam': res.data.data,
        })
      }
    })
  },

  change_subdepartment: function (e) {
    let index = e.currentTarget.dataset.index
    let departmentlist = this.data.departmentList
    for (let i = 0, len = departmentlist.length; i < len; ++i) {
      departmentlist[i].checked = false
    }
    departmentlist[index].checked = true
    wx.setStorageSync('index', index);
    this.setData({
      'departmentList': departmentlist, //这里只改变了checked值
      'team': departmentlist[index].departid
    })
    http.doctorList({
      data: {
        'department': this.data.team,
      },
      success: (res) => {
        // console.log(res.data)
        this.setData({
          'doctorList': res.data.data.list,
        })
      }
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('Index', 0);
    wx.setStorageSync('index', 0);
    var that = this;
    app.Login().then(res => {
      console.log("promise回调后的数据：");
      console.log(res)
      if (res == 200) {
        http.hintNotice({
          data: {},
          success: (res) => {
            console.log(res.data.data)
            that.setData({
              'HintNew': res.data.data,
            })
          }
        })
        http.followList({
          data: {},
          success: (res) => {
            // console.log(res.data.data)
            that.setData({
                'followList': res.data.data,
              }),
              that.setData({
                'followList[0].checked': true,
                'Team': res.data.data[0].tid
              }, () => {
                http.doctorTeam({
                  data: {
                    'tid': that.data.Team,
                  },
                  success: (res) => {
                    // console.log(res.data.data)
                    that.setData({
                      'doctorTeam': res.data.data,
                    })
                  }
                })
              })
          }
        })
        http.departmentRecommend({
          data: {},
          success: (res) => {
            console.log(res.data.data);
            that.setData({
              'departmentList': res.data.data
            })
            that.setData({
              'departmentList[0].checked': true,
              'team': res.data.data[0].departid
            }, () => {
              http.doctorList({
                data: {
                  'department': that.data.team,
                },
                success: (res) => {
                  console.log(res.data.data.list);
                  that.setData({
                    'doctorList': res.data.data.list,
                  })
                }
              })
            })
          }
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
    var that = this;
    http.hintNotice({
      data: {},
      success: (res) => {
        console.log(res.data.data)
        that.setData({
          'HintNew': res.data.data,
        })
      }
    })
    http.followList({
      data: {},
      success: (res) => {
        // console.log(res.data.data)
        let Check = "followList[" + wx.getStorageSync('Index') + "].checked"
        that.setData({
            'followList': res.data.data,
          }),
          that.setData({
            [Check]: true,
            'Team': res.data.data[wx.getStorageSync('Index')].tid
          }, () => {
            http.doctorTeam({
              data: {
                'tid': that.data.Team,
              },
              success: (res) => {
                // console.log(res.data.data)
                that.setData({
                  'doctorTeam': res.data.data,
                })
              }
            })
          })
      }
    })
    http.departmentRecommend({
      data: {},
      success: (res) => {
        // console.log(res.data.data);
        let check = "departmentList[" + wx.getStorageSync('index') + "].checked"
        that.setData({
          'departmentList': res.data.data
        })
        that.setData({
          [check]: true,
          'team': res.data.data[wx.getStorageSync('index')].departid
        }, () => {
          // console.log(that.data.team)
          http.doctorList({
            data: {
              'department': that.data.team,
            },
            success: (res) => {
              // console.log(res.data.data);
              that.setData({
                'doctorList': res.data.data.list,
              })
            }
          })
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