// pages/addConsulation/addConsulation.js
import http from '../../utils/api'; // 引入api接口管理文件
var app = getApp();
let eventChannel;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [
      '/images/banner.png'
    ],
    flowList: [{
        name: "回复率",
        value: "",
      },
      {
        name: "服务人次",
        value: "",
      },
      {
        name: "月回复数",
        value: "",
      },
      {
        name: "同行推荐",
        value: "",
      }
    ],
    isCollapse: true,
  },

  addConsultation: function (options) {
    var that = this;
    if (this.data.hasFollowed) {
      wx.navigateTo({
        url: '/pages/addConsultation/addConsultation',
        success: function (res) {
          res.eventChannel.emit('getParam', {
            data: that.data.tid
          })
        }
      })
    } else {
      wx.showToast({
        title: '请先关注医生',
        icon: 'error',
        duration: 2000
      })
    }
  },

  caseList: function (options) {
    var that = this;
    wx.navigateTo({
      url: '/pages/caseList/caseList',
      success: function (res) {
        res.eventChannel.emit('getParam', {
          data: that.data.tid
        })
      }
    })
  },

  // introduction: function (options) {
  //   wx.navigateTo({
  //     url: '/pages/introduction/introduction',
  //   })
  // },

  webview: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.index)
    wx.navigateTo({
      url: '/pages/web-view/web-view',
      success: function (res) {
        // res.eventChannel.emit('getParam', {
        //   data: that.data.consulationList[e.currentTarget.dataset.index].mpUrl
        // })
      }
    })
  },

  followOperation: function (options) {
    var that = this;
    if (this.data.hasFollowed) {
      wx.showModal({
        title: '提示',
        content: '确定取消关注医生团队？',
        cancelColor: '#008000',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            http.followCancel({
              data: {
                tid: that.data.tid
              },
              success: (res) => {
                // console.log(res.data.data.hasFollowed)
                that.setData({
                  'hasFollowed': res.data.data.hasFollowed,
                }, () => {
                  wx.showToast({ //显示消息提示框
                    icon: "success",
                    title: '取消成功！',
                    duration: 1500,
                  })
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      http.follow({
        data: {
          tid: that.data.tid
        },
        success: (res) => {
          // console.log(res.data.data.hasFollowed)
          that.setData({
            'hasFollowed': res.data.data.hasFollowed,
          }, () => {
            wx.showToast({ //显示消息提示框
              icon: "success",
              title: '关注成功！',
              duration: 1500,
            })
          })
        }
      })
    }
  },

  share: function (options) {
    // wx.showActionSheet({
    //   itemList: ['分享给朋友', '分享二维码'],
    //   success (res) {
    //     console.log(res.tapIndex)
    //   },
    // })
    this.setData({
      'isCollapse': false,
    })
    console.log(this.data.isCollapse)
  },

  sharePath: function (e) {
    // console.log(e.detail)
    let sharePath = e.detail;
    // console.log(sharePath)
    if (sharePath) {
      wx.navigateTo({
        url: '/pages/introduction/introduction?teamId='+ this.data.tid,
      })
    } else {}
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    console.log(this.options)
    // console.log('解码', decodeURIComponent(options.scene))
    // console.log('直接获取', options.scene)
    let doctorTeamId = String(options.scene)
    if (this.options.hasOwnProperty('tid')) {
      doctorTeamId = String(options.tid)
    } else {}
    var that = this;
    app.Login().then(res => {
      console.log("promise回调后的数据：");
      console.log(res)
      if (res == 200) {
        that.setData({
          'tid': doctorTeamId
        }, () => {
          // console.log(that.data.tid)
          let tid = that.data.tid;
          if (wx.getUserProfile) {
            that.setData({
              canIUseGetUserProfile: true
            })
          }
          http.userinfo({
            data: {},
            success: (res) => {
              // console.log(res.data.data.picture);
              that.setData({
                'userInfo': res.data.data,
              })
            }
          })
          http.banners({ //滑动banner
            data: {
              tid: tid
            },
            success: (res) => {
              // console.log(res.data.data)
              if (res.data.data.length == 0) {
                console.log("默认banner")
              } else {
                that.setData({
                  'swiperList': res.data.data,
                })
              }
            }
          })
          http.flowList({ //统计数据
            data: {
              tid: tid
            },
            success: (res) => {
              let flowlist = that.data.flowList;
              // console.log(res.data.data)
              let values = Object.values(res.data.data);
              // console.log(values);
              for (let i = 0, len = flowlist.length; i < len; ++i) {
                flowlist[i].value = values[i]
              }
              that.setData({
                flowList: flowlist
              })
              // console.log(that.data.flowList)
            }
          })
          http.doctorTeam({ //医生团队
            data: {
              tid: tid
            },
            success: (res) => {
              console.log(res.data.data)
              that.setData({
                'doctorList': res.data.data,
              })
            }
          })
          http.infoList({
            data: {
              tid: tid
            },
            success: (res) => {
              console.log(res.data.data)
              that.setData({
                'infoList': res.data.data,
              })
            }
          })
          http.caseList({
            data: {
              tid: tid
            },
            success: (res) => {
              // console.log(res.data.data.list);
              that.setData({
                'caseList': res.data.data.list,
              })
            }
          })
          http.knowledgeList({
            data: {
              tid: tid
            },
            success: (res) => {
              // console.log(res.data.data.list);
              that.setData({
                'knowledgeList': res.data.data.list,
              })
            }
          })
          http.hasFollowed({
            data: {
              tid: tid
            },
            success: (res) => {
              // console.log(res.data.data);
              that.setData({
                'hasFollowed': res.data.data,
              })
            }
          })
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
    // var that = this;
    // eventChannel = this.getOpenerEventChannel();
    // eventChannel.on("getParam", function (data) {
    //   // console.log(data.data); //传递过来的参数
    //   that.setData({
    //     'tid': data.data,
    //   }, () => {
    //     // console.log(that.data.tid)
    //     let tid = that.data.tid;
    //     http.banners({ //滑动banner
    //       data: {
    //         tid: tid
    //       },
    //       success: (res) => {
    //         // console.log(res.data.data)
    //         if (res.data.data.length == 0) {
    //           console.log("默认banner")
    //         } else {
    //           that.setData({
    //             'swiperList': res.data.data,
    //           })
    //         }
    //       }
    //     })
    //     http.flowList({ //统计数据
    //       data: {
    //         tid: tid
    //       },
    //       success: (res) => {
    //         let flowlist = that.data.flowList;
    //         // console.log(res.data.data)
    //         let values = Object.values(res.data.data);
    //         // console.log(values);
    //         for (let i = 0, len = flowlist.length; i < len; ++i) {
    //           flowlist[i].value = values[i]
    //         }
    //         that.setData({
    //           flowList: flowlist
    //         })
    //         // console.log(that.data.flowList)
    //       }
    //     })
    //     http.doctorTeam({ //医生团队
    //       data: {
    //         tid: tid
    //       },
    //       success: (res) => {
    //         // console.log(res.data.data)
    //         that.setData({
    //           'doctorList': res.data.data,
    //         })
    //       }
    //     })
    //     http.infoList({
    //       data: {
    //         tid: tid
    //       },
    //       success: (res) => {
    //         // console.log(res.data.data)
    //         that.setData({
    //           'infoList': res.data.data,
    //         })
    //       }
    //     })
    //     http.caseList({
    //       data: {
    //         tid: tid
    //       },
    //       success: (res) => {
    //         // console.log(res.data.data.list);
    //         that.setData({
    //           'caseList': res.data.data.list,
    //         })
    //       }
    //     })
    //     http.knowledgeList({
    //       data: {
    //         tid: tid
    //       },
    //       success: (res) => {
    //         // console.log(res.data.data.list);
    //         that.setData({
    //           'knowledgeList': res.data.data.list,
    //         })
    //       }
    //     })
    //     http.hasFollowed({
    //       data: {
    //         tid: tid
    //       },
    //       success: (res) => {
    //         // console.log(res.data.data);
    //         that.setData({
    //           'hasFollowed': res.data.data,
    //         })
    //       }
    //     })
    //   })
    // })
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
  onShareAppMessage: function (options) {
    var that = this;
    console.log(that.data.tid)
    return {
      title: "推荐医生给你的好友",
      path: "/pages/doctorTeam/doctorTeam?tid=" + that.data.tid,
    }
  },
})