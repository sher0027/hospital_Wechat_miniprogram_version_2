// pages/me/me.js
import http from '../../utils/api'; // 引入api接口管理文件
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    functionList: [
      // {
      //   name: "待接诊",
      //   index: "0000",
      //   img: "/images/fun1.png",
      // },
      {
        name: "待接诊",
        status: "2",
        img: "/images/fun2.png",
      },
      {
        name: "已回复",
        status: "3",
        img: "/images/fun3.png",
      },
      {
        name: "已取消",
        status: "4",
        img: "/images/fun4.png",
      },
    ],
    helpList: [{
        title: "医生入驻",
        hint: "我是医生，如何入驻",
        img: "/images/me_3.png",
        event: "switch"
      },
      {
        title: "联系客服",
        hint: "",
        img: "/images/me_4.png",
        event: "addMessage"
      },
      // {
      //   title: "关于",
      //   hint: "",
      //   img: "/images/me_5.png",
      //   event: "introduction"
      // }
    ]
  },

  // wxGetUserProfile: function () {
  //   return new Promise((resolve, reject) => {
  //     wx.getUserProfile({
  //       lang: 'zh_CN',
  //       desc: '用户登录',
  //       success: (res) => {
  //         // console.log('userProfile获取userInfo')
  //         // console.log(res);
  //         this.setData({
  //           // userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //         resolve(res)

  //         wx.showToast({ //显示消息提示框
  //           icon: "success",
  //           title: '欢迎使用',
  //           duration: 2000,
  //         })
  //       },
  //       // 失败回调
  //       fail: (err) => {
  //         reject(err)
  //         wx.showToast({ //显示消息提示框
  //           icon: "error",
  //           title: '小程序\n需要授权',
  //           duration: 1500,
  //           success: (res) => {
  //             setTimeout(function () {
  //               wx.navigateBack()
  //             }, 500)
  //           }
  //         })
  //       }
  //     })
  //   })
  // },

  // wxSilentLogin: function () {
  //   return new Promise((resolve, reject) => {
  //     wx.login({
  //       success: (res) => {
  //         console.log('login获取code')
  //         // console.log(res);
  //         resolve(res.code) // jsCode
  //       },
  //       fail(err) {
  //         reject(err)
  //       }
  //     })
  //   })
  // },

  // login: function (e) {
  //   var that = this;
  //   if (that.data.userInfo.picture == '/images/me_1.png') {
  //     let p1 = this.wxSilentLogin()
  //     let p2 = this.wxGetUserProfile()
  //     Promise.all([p1, p2]).then((res) => {
  //       console.log(res);
  //       let jsCode = res[0]
  //       wx.setStorageSync('iv', res[1].iv);
  //       wx.setStorageSync('encryptedData', res[1].encryptedData);
  //       // 请求服务器
  //       http.login({
  //         data: { //前端向后端发送的数据（后：前）
  //           jsCode: jsCode,
  //         },
  //         success: (res) => {
  //           // console.log(res);
  //           // // //登录成功将后端返回的token存储到本地缓存中
  //           // wx.setStorageSync('token', res.data.data);
  //           // console.log(wx.getStorageSync('token'));
  //           that.getavatar();
  //         }
  //       })
  //     }).catch((err) => {
  //       console.log(err)
  //     })
  //   }
  // },

  // getavatar() {
  //   console.log('你好')
  //   let iv = wx.getStorageSync('iv')
  //   let encryptedData = wx.getStorageSync('encryptedData')
  //   http.avatar({
  //     data: {
  //       iv: iv,
  //       encryptedData: encryptedData
  //     },
  //     success: (res) => {
  //       console.log(res.data);
  //       wx.removeStorageSync('iv');
  //       wx.removeStorageSync('encryptedData');
  //     }
  //   })
  //   http.userinfo({
  //     data: {},
  //     success: (res) => {
  //       console.log(res.data.data);
  //       if (res.data.data.picture) {
  //         this.setData({
  //           'userInfo.picture': res.data.data.picture,
  //         })
  //       } else {}
  //     }
  //   })
  // },


  doctorMine: function (options) {
    wx.navigateTo({
      url: '/pages/doctorMine/doctorMine',
    })
  },

  orderList: function (e) {
    var idx = e.currentTarget.dataset.index;
    console.log(idx)
    wx.navigateTo({
      url: '/pages/orderList/orderList',
      success: function (res) {
        res.eventChannel.emit('getParam', {
          data: idx + 2
        })
      }
    })
  },

  recordList: function (e) {
    wx.navigateTo({
      url: '/pages/recordList/recordList',
    })
  },

  editInfo: function (options) {
    wx.navigateTo({
      url: '/pages/editInfo/editInfo',
    })
  },

  switch: function (options) {
    wx.navigateToMiniProgram({
      appId: 'wx6a0d7f4ca64947b3',
      path: 'pages/login_phone/login_phone',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'trial',
      success(res) {
        // 打开成功
      }
    })
  },

  addMessage: function (options) {
    wx.navigateTo({
      url: '/pages/addMessage/addMessage',
    })
  },

  introduction: function (options) {
    wx.navigateTo({
      url: '/pages/introduction/introduction',
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
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    http.userinfo({
      data: {},
      success: (res) => {
        that.setData({
          'userInfo': res.data.data,
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