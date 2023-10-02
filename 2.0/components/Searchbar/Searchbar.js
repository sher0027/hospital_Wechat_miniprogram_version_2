import http from '../../utils/api'; // 引入api接口管理文件


// components/Searchbar/Searchbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: Number,
      value: "490"
    },
    teamList: {
      type: Array,
      value: []
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
    search: function (e) {
      let info = e.detail.value;
      console.log(info);
      if (info) {
        http.search({
          data: {
            pattern: info
          },
          success: (res) => {
            console.log(res.data.data)
            // var teamList = [];
            // res.data.data.forEach(function (v) {
            //   teamList.push(v.team);
            // });
            // console.log(teamList)
            this.setData({
              'teamList': res.data.data
            })
            console.log(this.data.teamList)
          }
        })
      } else {
        this.setData({
          'teamList': []
        })
      }
    },
  }
})