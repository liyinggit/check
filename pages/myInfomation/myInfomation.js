// pages/myInfomation/myInfomation.js
var app = getApp() //获取app.js中的全局变量
Page({

  data: {
    thumb: '',
    username: '',
    hasAddress: false,
    address: {},
    curIndex: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list: [{
      activityName: '',
      address: '',
      time: '',
      date: '',
      image: ''
    }],
    isEmpty: true,
    userInfoList: [{
      username: '',
      telephone: '',
      checkTime: '',
      activityId: ''
    }],
    ischeck: false
  },


  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },

  /**
   * 点击活动，进入活动详情界面
   */
  showDetail: function(e) {
    console.log("详情：" + JSON.stringify(e));
    var that = this;
    let id = e.currentTarget.dataset.id;
    var key = "1";
    var data = id;
    wx.setStorageSync(key, data); //保存到本地
    wx.navigateTo({
      url: '../myActivityDetail/myActivityDetail'
    });
  },

  /**
   * 获取数据库中自己创建的活动
   */
  getMyActivity: function() {

    var that = this;

    wx.request({
      // url: 'http://localhost:8081/activity/getActivitiesByOpenId',
      url: 'http://abc.sendroids.com/activity/getActivitiesByOpenId',
      data: {
        openId: app.globalData.openId
      },
      success: function(res) {
        console.log("创建的活动:" + JSON.stringify(res.data)) //打印到控制台
        if (res.data.length !== 0) {
          that.setData({
            list: res.data,
            isEmpty: false
          })
        }
      }
    })

  },

  /**
   * 获取打卡记录
   */
  getClockIn: function() {
    var that = this;

    wx.request({
      // url: 'http://localhost:8081/activity/getCheckInsByOpenId',
      url: 'http://abc.sendroids.com/activity/getCheckInsByOpenId',
      data: {
        openId: app.globalData.openId
      },
      success: function(res) {
        console.log("打卡记录:" + JSON.stringify(res.data)) //打印到控制台
        if (res.data.length !== 0) {
          that.setData({
            userInfoList: res.data
          })
        }
      }
    })
  },

  getUser: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              console.log("用户信息:"+res)
              this.setData({
                thumb: res.userInfo.avatarUrl,
                username: res.userInfo.nickName
              })

              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

    this.getUser();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getMyActivity();
    this.getClockIn();
    this.getUser();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})