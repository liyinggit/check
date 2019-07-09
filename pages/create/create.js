// pages/create/create.js
var app = getApp() //获取app.js中的全局变量

var date = new Date();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['广州市海珠区新港中路', '地址二', '地址三', '地址四'], //地址选择
    startDate: '2019-09-01', //活动开始日期
    endDate: '2019-09-01', //活动结束日期

    startTime: '12:01', //活动开始时间
    endTime: '13:00', //活动结束时间
    address: ["四川省", "广元市", "苍溪县"], //省市区
    addressDetail: "", //详细地址
    username: "",
    telephone: "",
    description: "", //活动描述


  },

  /**
   * 地址选择
   */
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var info = e.detail.value;
    this.setData({
      address: e.detail.value
    });

    console.log(info[0] + info[1] + info[2]);
  },
  /**
   * 开始日期选择
   */
  bindStartDateChange: function(e) {
    this.setData({
      startDate: e.detail.value
    });
  },
  /**
   * 开始时间选择
   */
  bindStartTimeChange: function(e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  /**
   * 结束日期选择
   */
  bindEndDateChange: function(e) {
    this.setData({
      endDate: e.detail.value
    });
  },
  /**
   * 结束时间选择
   */
  bindEndTimeChange: function(e) {
    this.setData({
      endTime: e.detail.value
    })
  },

  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var e = e.detail.value;
    var that = this;
    if (e.activityName == "") {
      wx.showModal({
        title: '提示',
        content: '请输入活动名称',
        success: function(res) {
          if (res.confirm) {
            console.log('弹框后点取消')
          } else {
            console.log('弹框后点取消')
          }
        }
      })
    }


    if (e.activityName != "") {

      wx.request({
        // url: 'http://localhost:8082/activity/saveInfo',
        url:'http://abc.sendroids.com/activity/saveInfo',
        data: {
          activityName: e.activityName, //活动名称
          address: e.address[0] + e.address[1] + e.address[2] + e.addressDetail, //活动地址
          description: e.description, //活动描述
          startTime: e.startDate + ' ' + e.startTime, //活动开始时间
          endTime: e.endDate + ' ' + e.endTime, //活动结束时间
          image: '../../image/1.jpg',
          openId: app.globalData.openId
        },
        success: function(res) {
          console.log("返回结果：" + JSON.stringify(res.data)) //打印到控制台
          var message = res.data;
          if (message.info === "success") {

            wx.switchTab({ //这种方式才能跳转到tabbar页面
              url: '/pages/index/index',
            })
            var toastText = '活动创建成功';
            wx.showToast({
              title: toastText,
              icon: '',
              duration: 2000
            });
          }

        }
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


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