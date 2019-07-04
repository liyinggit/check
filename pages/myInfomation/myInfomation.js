// pages/myInfomation/myInfomation.js
var app = getApp()   //获取app.js中的全局变量
Page({

  data: {
    thumb: '',
    username: '',
    hasAddress: false,
    address: {},
    curIndex: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list: [
      { activityName: '', address: '', time: '', date: '', image: '' }
    ],
    isEmpty: true,
    userInfoList:[
      { username: '', telephone: '', checkTime: '', activityId:''}
    ],
    selected: [
      {
        date: '2018-5-21'
      }, {
        date: '2018-5-22'
      }, {
        date: '2018-5-24'
      }, {
        date: '2018-5-25'
      }
    ],
    ischeck:false
  },
  /**
      * 日历是否被打开
      */
  bindselect(e) {
    console.log(e.detail.ischeck);
    this.setData({
      ischeck:e.detail.ischeck
    })
  },
  /**
   * 获取选择日期
   */
  bindgetdate(e) {
    let time = e.detail;
    console.log(time)

  },
  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },

/**
 * 获取数据库中自己创建的活动
 * 根据微信昵称获取自己创建的活动
 */
  getMyActivity:function(){
   
      var that = this;

      wx.request({
        url: 'http://localhost:8081/activity/getInfoByUsername',
        data: {
          username: app.globalData.userInfo.nickName
        },
        success: function (res) {
          console.log(res.data)//打印到控制台
          // console.log(that.data);
          if (res.data.length !== 0) {
            that.setData({
              list: res.data,
              isEmpty: false
            })
            console.log(that.data.list);
          }
        }
      })

  },

/**
 * 获取打卡记录
 */
  getClockIn:function(){
    var that = this;

    wx.request({
      url: 'http://localhost:8081/activity/getUserInfoByUsername',
      data: {
        username: app.globalData.userInfo.nickName
      },
      success: function (res) {
        console.log(res.data)//打印到控制台
        // console.log(that.data);
        if (res.data.length !== 0) {
          that.setData({
            userInfoList: res.data
          })
          console.log(that.data.userInfoList);
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    console.log("globalData" + JSON.stringify(app.globalData.userInfo))

    this.setData({
      thumb: app.globalData.userInfo.avatarUrl,
      username: app.globalData.userInfo.nickName
    })
  
    // this.getMyActivity();
    // this.getClockIn();
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
    // this.getMyActivity();
    // this.getClockIn();
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