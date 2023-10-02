// components/RecordList/RecordList.js
import http from '../../utils/api'; // 引入api接口管理文件

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recordList: {
      type: Array,
      value: "[]"
    },
    width: {
      type: Number,
      value: "490"
    },
    Deletable: {
      type: Boolean,
      value: false
    },
    did: {
      type: Number,
      value: 0
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
    preview: function (e) {
      console.log(e.currentTarget.id);
      console.log(e.currentTarget.dataset.index);
      http.recordDetail({
        data: {
          rid: e.currentTarget.id
        },
        success: (res)=>{
          console.log(res.data.data)
          let url = res.data.data.pictures[e.currentTarget.dataset.index]
          wx.previewImage({
            // current: '', // 当前显示图片的 http 链接
            urls: [url] // 需要预览的图片 http 链接列表
          })
        }
      })
    },

    recordDetail: function (e) {
      // console.log(e)
      var idx = e.currentTarget.dataset.index;
      var that = this;
      wx.navigateTo({
        url: '/pages/recordDetail/recordDetail',
        success: function (res) {
          res.eventChannel.emit('getParam', {
            data: that.data.recordList[idx].id
          })
        }
      })
    },
  
    recordDelete: function (e) {
      var that = this;
      console.log(that.data.did)
      // console.log(e.currentTarget.id)
      let rid = e.currentTarget.id
      wx.showModal({
        title: '提示',
        content: '确定删除该病历？',
        cancelColor: '#008000',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            // console.log(oid)
            http.deleteRecord({
              data: {
                rid: rid
              },
              success: (res) => {
                if(that.data.did){
                  http.recordMatch({
                    data: {
                      depart: that.data.did
                    },
                    success: (res) => {
                      console.log(res.data.data);
                      that.setData({
                        'recordList': res.data.data.list,
                      })
                    }
                  })
                }else{
                  http.recordList({
                    data: {},
                    success: (res) => {
                      console.log(res.data.data.list);
                      that.setData({
                        'recordList': res.data.data.list,
                      })
                    }
                  })
                }
                wx.showToast({ //显示消息提示框
                  icon: "success",
                  title: '删除成功！',
                  duration: 1500,
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

  },
})