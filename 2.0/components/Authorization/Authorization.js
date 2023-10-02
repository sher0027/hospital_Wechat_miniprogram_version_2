// components/Authorization/Authorization.js
import http from '../../utils/api'; // 引入api接口管理文件

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo: {
      type: Object,
      value: {
        patientRealname: '未注册',
        picture: '/images/me_1.png',
      }
    },
    hasUserInfo: {
      type: Boolean,
      value: false
    },
    canIUseGetUserProfile: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    wxGetUserProfile: function () {
      return new Promise((resolve, reject) => {
        wx.getUserProfile({
          lang: 'zh_CN',
          desc: '用户登录',
          success: (res) => {
            // console.log('userProfile获取userInfo')
            // console.log(res);
            this.setData({
              // userInfo: res.userInfo,
              hasUserInfo: true
            })
            resolve(res)

            wx.showToast({ //显示消息提示框
              icon: "success",
              title: '欢迎使用',
              duration: 2000,
            })
          },
          // 失败回调
          fail: (err) => {
            reject(err)
            wx.showToast({ //显示消息提示框
              icon: "error",
              title: '小程序\n需要授权',
              duration: 1500,
            })
          }
        })
      })
    },

    wxSilentLogin: function () {
      return new Promise((resolve, reject) => {
        wx.login({
          success: (res) => {
            console.log('login获取code')
            // console.log(res);
            resolve(res.code) // jsCode
          },
          fail(err) {
            reject(err)
          }
        })
      })
    },

    login: function (e) {
      var that = this;
      console.log(that.data.userInfo)
      if (!that.data.userInfo.picture) {
        let p1 = this.wxSilentLogin()
        let p2 = this.wxGetUserProfile()
        Promise.all([p1, p2]).then((res) => {
          console.log(res);
          let jsCode = res[0]
          wx.setStorageSync('iv', res[1].iv);
          wx.setStorageSync('encryptedData', res[1].encryptedData);
          // 请求服务器
          http.login({
            data: { //前端向后端发送的数据（后：前）
              jsCode: jsCode,
            },
            success: (res) => {
              // console.log(res);
              // // //登录成功将后端返回的token存储到本地缓存中
              // wx.setStorageSync('token', res.data.data);
              // console.log(wx.getStorageSync('token'));
              that.getavatar();
            }
          })
        }).catch((err) => {
          console.log(err)
        })
      }
    },

    getavatar() {
      console.log('你好')
      let iv = wx.getStorageSync('iv')
      let encryptedData = wx.getStorageSync('encryptedData')
      http.avatar({
        data: {
          iv: iv,
          encryptedData: encryptedData
        },
        success: (res) => {
          console.log(res.data);
          wx.removeStorageSync('iv');
          wx.removeStorageSync('encryptedData');
        }
      })
      http.userinfo({
        data: {},
        success: (res) => {
          console.log(res.data.data);
          this.setData({
            'userInfo': res.data.data,
          })
        }
      })
      var pages = getCurrentPages()
      var currentPage = pages[pages.length - 1]
      console.log(currentPage.route)
      if (currentPage.route == "pages/me/me") {
        wx.reLaunch({
          url: '/pages/me/me',
        })
      }
    },
  }
})