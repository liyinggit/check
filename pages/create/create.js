// pages/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['广州市海珠区新港中路', '地址二', '地址三', '地址四'], //地址选择
    date: '2019-09-01', //日期选择
    index: 0,
    time: '12:01', //时间选择
    address: ""
  },



  /**
   * 地址选择
   */
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 日期选择
   */
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 时间选择
   */
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
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

    if (e.address == 0) {
      this.setData({
        address: "广州市海珠区新港中路"
      })
    }


    if (e.activityName != "") {

      wx.request({
        url: 'http://localhost:8081/activity/saveInfo',
        data: {
          activityName: e.activityName, //活动名称
          address: this.data.address, //活动地址
          date: e.date, //活动日期
          time: e.time, //活动时间
          image: '../../image/1.jpg'
        },
        success: function(res) {
          console.log(res.data) //打印到控制台
          var message = res.data;
          wx.navigateTo({
            url: '/pages/index/index',
          })
          var toastText = '活动创建成功';
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