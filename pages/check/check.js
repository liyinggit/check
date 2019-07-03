// pages/check/check.js
var util = require('../../utils/util.js');
var app = getApp()   //获取app.js中的全局变量
Page({

  /**
   * 页面的初始数据
   */
  data: {
      info:'',
    checkTime:util.formatTime(new Date()),
      username: "" //用户昵称
  },


  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var e = e.detail.value;
    var id = wx.getStorageSync("2");
    var that = this;
    if (e.username == "" || e.telephone == "") {
      wx.showModal({
        title: '提示',
        content: '请输入打卡信息',
        success: function (res) {
          if (res.confirm) {
            console.log('弹框后点取消')
          } else {
            console.log('弹框后点取消')
          }
        }
      })
    }else{
      wx.request({
        url: 'http://localhost:8081/activity/saveUserInfo',
        data: {
          username: e.username,  //用户打卡信息 用户名称
          telephone: e.telephone,   //用户打卡信息  用户电话
          id: id, //活动id
          checkTime:e.checkTime   //打卡时间
        },
        success: function (res) {
          console.log(res.data) //打印到控制台
          var message = res.data;
          wx.switchTab({     //这种方式才能跳转到tabbar页面
            url: '/pages/index/index',
          })
          var toastText = '用户打卡成功';

          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var storageData;
    storageData = wx.getStorageSync("2");
    console.log(storageData + "333");
    wx.request({
      url: 'http://localhost:8081/activity/getInfoById',
      data: {
        id: storageData
      },
      success: function (res) {
        that.setData({
          info: res.data
        })
        console.log(that.data.info);
      }
    });

    this.setData({
      username: app.globalData.userInfo.nickName  
    })
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