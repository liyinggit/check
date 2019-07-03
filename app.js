//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("res.code:"+res.code)


        //正式开发时只能从服务端发送请求
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            // 小程序的appid
            'appid': 'wx32eb62ad68ffb9fd',
            // 小程序的secret
            'secret': '4a739cb9ca314252a95d3f40092cbc92',
            // wx.login()返回的登录凭证
            'js_code': res.code,
            // 固定值,不需要改变
            'grant_type': 'authorization_code'
          },
          success: res => {
            // 返回的 openid
            console.log("openid:"+res.data.openid);
            // 返回的会话密钥
            console.log("session_key:"+res.data.session_key);
            // 注意：上面两个字段值必定会返回，unionid 则只会在满足一定条件下返回，不是必定会返回的值
            console.log("unionid:"+res.data.unionid);

            this.globalData.openId = res.data.openid;
            this.globalData.session_key = res.data.session_key;
          }

        })

      },
      fail:res => {
        toast.show({content:'微信登录失败'});
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }

              console.log("launch:"+JSON.stringify(res.userInfo));

            }
          })
        }

       
      }
    })
  },
  globalData: {
    userInfo: null,
    openId:null,
    session_key:null
  }
})