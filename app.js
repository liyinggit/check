//app.js
App({
  onLaunch: function() {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("res.code:" + res.code)

        //发送到后台，由后台发送请求获取openid等内容
        wx.request({
          url: 'http://localhost:8081/wx/user/login',
          data: {
            code: res.code
          },
          success: function(res) {
            console.log(res.data) //打印到控制台 
            that.globalData.openId = res.data.openid;
            // this.globalData.session_key = res.data.session_key;

            //获取用户信息
            // wx.getSetting({
            //   success:info => {
            //     if (info.authSetting['scope.userInfo']) {
            //       wx.getUserInfo({
            //         success: info => {
            //           console.log("res.sessionKey:" + res.data.sessionKey);
            //             wx.request({
            //               url: 'http://localhost:8081/wx/user/info',
            //               data:{
            //                 sessionKey: res.data.sessionKey,
            //                 signature: info.signature,
            //                 rawData: info.rawData,
            //                 encryptedData: info.encryptedData,
            //                 iv: info.iv
            //               },
            //               success:function(res){
            //                 console.log("用户信息："+JSON.stringify(res));
            //               }
            //             })
            //         }
            //       })
            //     }
            //   }
            // })


          }
        });

        // 获取用户信息
        // wx.getSetting({
        //   success: res => {
        //     if (res.authSetting['scope.userInfo']) {
        //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //       wx.getUserInfo({
        //         success: res => {
        //           // 可以将 res 发送给后台解码出 unionId
        //           this.globalData.userInfo = res.userInfo

        //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //           // 所以此处加入 callback 以防止这种情况
        //           if (this.userInfoReadyCallback) {
        //             this.userInfoReadyCallback(res)
        //           }
        //           console.log("launch:" + JSON.stringify(res));
        //         }
        //       })
        //     }
        //   }
        // })

      },
      fail: res => {
        toast.show({
          content: '微信登录失败'
        });
      }
    })

  },
  globalData: {
    userInfo: null,
    openId: null,
  
  }
})