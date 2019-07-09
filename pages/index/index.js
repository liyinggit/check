//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    list: [{
      activityName: '',
      address: '',
      startTime: '',
      endTime: '',
      image: '',
      description: ''
    }],
    isEmpty: true
  },

  /**
   * 点击活动，进入打卡
   */
  showDetail: function(e) {
    var that = this;
    let id = e.currentTarget.dataset.id;
    var key = "2";
    var data = id;
    wx.setStorageSync(key, data); //保存到本地
    wx.navigateTo({
      url: '/pages/check/check'
    });
  },

  /**
   * 获取活动列表
   */
  getInfoList: function() {
    var that = this;

    wx.request({
      // url: 'http://localhost:8081/activity/getInfoList',
      url: 'http://abc.sendroids.com/activity/getInfoList',

      success: function(res) {
        console.log("活动列表:"+JSON.stringify(res.data)) //打印到控制台
        // console.log(that.data);
        if (res.data.length !== 0) {
          that.setData({
            list: res.data,
            isEmpty: false
          })
        }


      }
    })

  },

  onLoad: function() {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getInfoList();
  },
})