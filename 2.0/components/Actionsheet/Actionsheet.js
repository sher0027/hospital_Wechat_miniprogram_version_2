// components/Actionsheet/Actionsheet.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isCollapse: {
      type: Boolean,
      value: true
    },
    actionList: {
      type: Array,
      value: ['分享给朋友', '分享二维码']
    },
    shareURL: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: ['操作1', '操作2']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    collapse: function () {
      this.setData({
        'isCollapse': true,
        'shareURL': ''
      })
      // wx.showTabBar()
    },

    share: function (e) {
      this.triggerEvent('share', e.currentTarget.dataset.index);
    },
  }
})