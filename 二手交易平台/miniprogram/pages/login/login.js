const app = getApp()
Page({


  data: {
    avatarUrl: '',
    userInfo: {}

  },
  next: function() {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo
        })
      }

    })
    
  },
  next1: function() {
    wx.switchTab({
      url: '../buy/buy',
    })


  }


})