// pages/myActivityDetail/myActivityDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: '',
    checkInUserList: '',
    num: 0,
   
  },

/**
 * 查找此活动所有的打卡人员
 */
  getCheckInUser: function () {

    var that = this;
    var storageData;
    storageData = wx.getStorageSync("1");
    console.log(storageData + "4444");
    wx.request({
      url: 'http://localhost:8081/activity/getCheckInUserByActivityId',
      data: {
        id: storageData
      },
      success: function (res) {
        console.log("打卡人员:" + JSON.stringify(res.data))//打印到控制台
        if (res.data.length !== 0) {
          that.setData({
            checkInUserList: res.data,
            num:res.data.length
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var storageData;
    storageData = wx.getStorageSync("1");
    console.log(storageData + "4444");
    wx.request({
      url: 'http://localhost:8081/activity/getInfoById',
      data: {
        id: storageData
      },
      success: function (res) {
        that.setData({
          activity: res.data
        })
        console.log(that.data.activity);
      }
    });
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
    this.getCheckInUser();
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