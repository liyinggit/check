//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')

    //  items: [
    //    { image: '../../image/1.jpg', id: '1', date: '2019-02-12', time: '12:01', project: '活动1'},
    //    { image: '../../image/1.jpg', id: '2', date: '2019-02-12', time: '12:01', project: '活动2'},
    //    { image: '../../image/1.jpg', id: '3', date: '2019-02-12', time: '12:01', project: '活动3'},
    //    { image: '../../image/1.jpg', id: '4', date: '2019-02-12', time: '12:01', project: '活动4'}
    // ],
    list:[
      { activityName: '', address: '', time: '', date: '',image:'' }
    ],
    isEmpty:true
  },

/**
 * 点击活动，进入打卡
 */
  showDetail: function (e) {
    var that = this;
    let id = e.currentTarget.dataset.id;
    var key = "2";
    var data = id;
    // wx.setStorageSync(key, data);   //保存到本地
    wx.navigateTo({
      url: '/pages/check/check'
    });
  },

/**
 * 获取活动列表
 */
  getInfoList:function(){
    var that = this;

    wx.request({
      url: 'http://localhost:8081/activity/getInfoList',

      success: function (res) {
        console.log(res.data)//打印到控制台
        // console.log(that.data);
        if (res.data.length !== 0) {
          that.setData({
            list: res.data,
            isEmpty: false
          })
          console.log(that.data);

        }
      }
    })

  },

  onLoad: function () {
   this.getInfoList();
  },



})
