// pages/upload/upload.js
import http from '../../utils/api'; // 引入api接口管理文件
let eventChannel;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgList: [],
    CurrentNum: 0,
    // recordYear: '',
    // recordMonth: '',
    recordTime: '',
    show: false,
    minDate: new Date().getTime() - (181 * 1000 * 60 * 60 * 24),
    maxDate: new Date().getTime(),
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

  changeDepartment(e) {
    var idx = e.detail.value;
    this.setData({
      'recordDepartment': this.data.departmentList[idx].departname,
      'recordDepartid': this.data.departmentList[idx].departid
    })
    // console.log(this.data.patientDepartment)
  },

  // changeYear(e) {
  //   var that = this;
  //   that.setData({
  //     'recordYear': e.detail.value
  //   })
  //   if (that.data.recordYear == '' || that.data.recordMonth == '') {} else {
  //     var day = new Date(that.data.recordYear, that.data.recordMonth, 0);
  //     var daylist = [];
  //     // console.log(day.getDate());
  //     for (var i = 1; i < day.getDate(); i++) {
  //       daylist.push(i < 10 ? ('0' + i + '日') : i + '日');
  //     }
  //     that.setData({
  //       'dayList': daylist
  //     })
  //   }
  // },

  // changeMonth(e) {
  //   var that = this;
  //   that.setData({
  //     'recordMonth': that.data.monthList[e.detail.value].slice(0, 2)
  //   })
  //   if (that.data.recordYear == '' || that.data.recordMonth == '') {} else {
  //     var day = new Date(that.data.recordYear, that.data.recordMonth, 0);
  //     var daylist = [];
  //     // console.log(day.getDate());
  //     for (var i = 1; i < day.getDate(); i++) {
  //       daylist.push(i < 10 ? ('0' + i + '日') : i + '日');
  //     }
  //     that.setData({
  //       'dayList': daylist
  //     })
  //   }
  // },

  // getDay: function (options) {
  //   var that = this;
  //   if (that.data.recordYear == '' || that.data.recordMonth == '') {
  //     wx.showToast({
  //       title: '请先选择年月',
  //       icon: 'error'
  //     })
  //   } else {
  //   }
  // },

  // changeDay(e) {
  //   var that = this;
  //   that.setData({
  //     'recordDay': that.data.dayList[e.detail.value].slice(0, 2)
  //   })
  // },
  /**
   * 日历
   */
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2,'0')}-${(date.getDate()).toString().padStart(2,'0')}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      recordTime: this.formatDate(event.detail),
    });
  },
  /**
   * 提交表单
   */
  addRecord: function (e) {
    // http.userinfo({
    //   data: {},
    //   success: (res) => {
    //     // console.log(res.data.data);
    //     if (!res.data.data.picture) {
    //       wx.showModal({
    //         title: '温馨提示',
    //         content: '授权才可注册',
    //         success(res) {
    //           if (res.confirm) {
    //             console.log('用户点击确定')
    //             wx.switchTab({
    //               url: '/pages/me/me'
    //             })
    //           } else if (res.cancel) {
    //             console.log('用户点击取消')
    //           }
    //         }
    //       })
    //     } else {
          let info = e.detail.value;
          console.log(info);
          // let recordTime = this.data.recordYear + "-" + this.data.recordMonth + "-" + this.data.recordDay
          // console.log(recordTime)
          //判断提交数据是否合理
          if (e.detail.value.recordHospital.length == 0) {
            wx.showToast({
              title: '请输入就诊医院',
              icon: 'error',
              duration: 2000,
            })
          } else if (e.detail.value.recordDepartment.length == 0) {
            wx.showToast({
              title: '请选择就诊科室',
              icon: 'error',
              duration: 2000,
            })
          } else if (this.data.recordTime.length != 10) {
            wx.showToast({
              title: '请选择就诊时间',
              icon: 'error',
              duration: 2000,
            })
          } else if (e.detail.value.recordText.length == 0) {
            wx.showToast({
              title: '请输入门诊结果',
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
            http.addRecord({
              data: {
                hospital: e.detail.value.recordHospital,
                department: this.data.recordDepartid,
                time: this.data.recordTime,
                text: e.detail.value.recordText,
                picture: this.data.ImgList
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
                        wx.navigateTo({
                          url: '/pages/sucRecord/sucRecord',
                        })
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
    //     }
    //   }
    // })
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
          for (var i = 0; i < res.tempFiles.length; i++) {
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
  onLoad: function (options) {
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
    http.departmentList({
      data: {},
      success: (res) => {
        // console.log(res.data.data);
        that.setData({
          'departmentList': res.data.data
        })
      }
    })
    // const monthlist = []
    // for (var i = 1; i < 13; i++) {
    //   monthlist.push(i < 10 ? ('0' + i + '月') : i + '月')
    // }
    // that.setData({
    //   'monthList': monthlist,
    // })
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