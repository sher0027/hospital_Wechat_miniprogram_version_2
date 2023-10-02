// pages/addMessage/addMessage.js
import http from '../../utils/api'; // 引入api接口管理文件

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgList: [],
    CurrentNum: 0,
  },

  texts: function (e) {
    // 获取输入框的内容
    var value = e.detail.value.trim();;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    console.log(value)
    this.setData({
      CurrentNum: len //当前字数 
    });
    if (this.data.CurrentNum == 200) {
      wx.showToast({
        icon: 'error',
        title: '最多输入200字！',
      })
    } else {}
  },

  addMessage: function(e){
      let info = e.detail.value;
      console.log(info);
      //判断提交数据是否合理
      if (e.detail.value.messageDesc.length == 0) {
        wx.showToast({
          title: '请描述您的问题',
          icon: 'error',
          duration: 2000,
        })
      } else if (e.detail.value.phoneNum.length != 11) {
        wx.showToast({
          title: '请输入正确号码',
          icon: 'error',
          duration: 2000,
        })
      } else if (this.data.ImgList.length == 0) {
        wx.showToast({
          title: '请上传图片',
          icon: 'error',
          duration: 2000,
        })
      } else {
        http.addMessage({
          data: {
            message: e.detail.value.messageDesc,
            phone: e.detail.value.phoneNum,
            photo: this.data.ImgList
          },
          success: (res) => {
            console.log(res.data.data)
            if (res.data.data) {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 1000,
                success: (res) => {
                  setTimeout(function () {
                   wx.navigateBack()
                  }, 500)
                }
              })
            } else {
              wx.showToast({
                title: '提交失败',
                icon: 'error',
                duration: 2000,
              })
            }
          }
        })
    }
  },

  upload: function () { //打开图库，选择图片
    var that = this
    if (that.data.ImgList.length == 9) {
      wx.showToast({
        icon: 'error',
        title: '图片最多9张！',
      })
    } else {
      wx.chooseImage({
        count: 9 - that.data.ImgList.length, //限制图片数
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          // 获取文件路径
          console.log(res)
          for(var i=0;i<res.tempFiles.length;i++){
            var file = res.tempFiles[i];
            console.log(file)
            console.log(res.tempFilePaths[i])
            const filepath = res.tempFilePaths[i]
            that.setData({
              'imgFileLocalPath': res.tempFilePaths[i],
            })
            http.getId({
              data: {},
              success: (res) => {
                // console.log(res.data.data)
                let url = res.data.data
                // console.log(filepath)
                var fs = wx.getFileSystemManager()
                var suffix = filepath.split('.')[1];
                var type;
                switch (suffix) {
                  case 'jpg':
                    type = 'image/jpeg'
                    break;
                  case 'jpeg':
                    type = 'image/jpeg'
                    break;
                  case 'gif':
                    type = 'image/gif'
                    break;
                  case 'png':
                    type = 'image/png'
                    break;
                  default:
                    type = 'null'
                }
                console.log(url)
                // console.log(fs.readFileSync(filepath))
                wx.request({
                  method: 'PUT',
                  url: url,
                  header: {
                    "content-type": type,
                  },
                  data: fs.readFileSync(filepath),
                  success: function (res) {
                    console.log(res)
                    let index = url.indexOf('?')
                    let Img = url.substring(0, index)
                    let Imglist = that.data.ImgList
                    console.log(Img)
                    Imglist.push(Img)
                    that.setData({
                      'ImgList': Imglist
                    })
                    // console.log(that.data.ImgList)
                  },
                })
              }
            })
          }
        }
      })
    }
  },

  ImageDelete: function (e) {
    var that = this;
    let index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '删除？',
      cancelColor: '#008000',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          let Imglist = that.data.ImgList;
          // console.log(Imglist)
          Imglist.splice(index, 1)
          that.setData({
            'ImgList': Imglist,
          }, () => {
            // console.log(that.data.ImgList)
            wx.showToast({ //显示消息提示框
              icon: "success",
              title: '删除成功！',
              duration: 1500,
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that = this;
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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})