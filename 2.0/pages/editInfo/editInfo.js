// pages/editInfo/editInfo.js
import http from '../../utils/api'; // 引入api接口管理文件

Page({

  /**
   * 页面的初始数据
   */
  data: {
    patientGender: '',
    currentValue: "",
    Gender: [{
        value: "男",
        name: "男",
        checked: false
      },
      {
        value: "女",
        name: "女",
        checked: false
      }
    ],
  },

  changeBirthday(e) {
    const birthday = new Date(e.detail.value);
    this.setData({
      'patientBirthday': birthday.getFullYear() + "-" + (birthday.getMonth() + 1).toString().padStart(2,'0') + "-" + birthday.getDate().toString().padStart(2,'0')
    })
    // console.log(this.data.patientBirthday)
  },

  changeRegion(e) {
    // console.log(e.detail.value)
    this.setData({
      'patientRegion': e.detail.value[0] + "-" + e.detail.value[1] + "-" + e.detail.value[2]
    })
  },

  changeGender: function (e) {
    const items = this.data.Gender
    // console.log(items.length)
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
      // console.log(items[i].checked)
    }
    this.setData({
      'patientGender': e.detail.value,
      'currentValue': e.detail.value,
    })
    console.log(this.data.currentValue)
  },

  editInfo: function (e) {
    let info = e.detail.value;
    console.log(info);
    //判断提交数据是否合理
    if (e.detail.value.patientNickname.length == 0) {
      wx.showToast({
        title: '请输入昵称',
        icon: 'error',
        duration: 2000,
      })
    } else if (e.detail.value.patientRealname.length == 0) {
      wx.showToast({
        title: '请输入真实姓名',
        icon: 'error',
        duration: 2000,
      })
    } else if (e.detail.value.patientGender.length == 0) {
      wx.showToast({
        title: '请选择性别',
        icon: 'error',
        duration: 2000,
      })
    } else if (e.detail.value.patientBirthday.length == 0) {
      wx.showToast({
        title: '请选择出生日期',
        icon: 'error',
        duration: 2000,
      })
    } else if (this.data.patientRegion.length == 0) {
      wx.showToast({
        title: '请选择地区',
        icon: 'error',
        duration: 2000,
      })
    } else if (e.detail.value.patientPhone.length != 11) {
      wx.showToast({
        title: '请输入正确号码',
        icon: 'error',
        duration: 2000,
      })
    } else {
      http.editInfo({
        data: {
          nickname: e.detail.value.patientNickname,
          realname: e.detail.value.patientRealname,
          gender: e.detail.value.patientGender,
          birthday: e.detail.value.patientBirthday,
          location: this.data.patientRegion,
          tel: e.detail.value.patientPhone
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
    http.userinfo({
      data:{},
      success: (res) => {
        console.log(res.data.data)
        that.setData({
          'patientNickname': res.data.data.patientNickname,
          'patientRealname': res.data.data.patientRealname,
          'patientGender': res.data.data.patientGender,
          'patientBirthday': res.data.data.patientBirthday,
          'patientRegion': res.data.data.patientLocation,
          'patientPhone': res.data.data.patientTel
        })
        if(res.data.data.patientGender){//选中
          var i = res.data.data.patientGender == '男' ? 0 : 1;
          that.data.Gender[i].checked="true"
          that.setData({
            Gender: that.data.Gender
          })
        }
        else{
        }
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