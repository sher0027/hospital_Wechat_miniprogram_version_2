// components/DoctorCard/DoctorCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    doctorList: {
      type: Array,
      value: "[]"
    },
    width: {
      type: Number,
      value: "696"
    },
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
    doctorDetail: function (e) {
      // console.log(e)
      var idx = e.currentTarget.dataset.index;
      var that = this;
      console.log(that.data.doctorList);
      var pages = getCurrentPages()
      var currentPage = pages[pages.length - 1]
      // console.log(currentPage.route)
      if (currentPage.route == "pages/doctorTeam/doctorTeam") {
        wx.navigateTo({
          url: '/pages/doctorDetail/doctorDetail',
          success: function (res) {
            res.eventChannel.emit('getParam', {
              data: that.data.doctorList[idx].id
            })
          }
        })
      } else {
        wx.navigateTo({
          url: '/pages/doctorTeam/doctorTeam?tid='+that.data.doctorList[idx].teamId,
          // success: function (res) {
          //   res.eventChannel.emit('getParam', {
          //     data: that.data.doctorList[idx].teamId
          //   })
          // }
        })
      }
    },
  }
})