// components/CaseList/CaseList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    caseList: {
      type: Array,
      value: "[]"
    },
    width: {
      type: Number,
      value: "632"
    },
    length: {
      type: Number,
      value: 65535
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // caseList: [{
    //     name: "医生",
    //     expert: "5",
    //     avatar: "/images/banner.png",
    //   },
    //   {
    //     name: "医生医生医生",
    //     expert: "555555555555555555555555555555566666666",
    //     avatar: "/images/banner.png",
    //   },
    //   {
    //     name: "医生",
    //     expert: "5",
    //     avatar: "/images/banner.png",
    //   },
    //   {
    //     name: "医生",
    //     expert: "5",
    //     avatar: "/images/banner.png",
    //   },
    //   {
    //     name: "医生",
    //     expert: "5",
    //     avatar: "/images/banner.png",
    //   },
    // ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    caseDetail: function (e) {
      // console.log(e)
      var idx = e.currentTarget.dataset.index;
      var that = this;
      wx.navigateTo({
        url: '/pages/caseDetail/caseDetail',
        success: function (res) {
          res.eventChannel.emit('getParam', {
            data: that.data.caseList[idx].id
          })
        }
      })
    },
  }
})