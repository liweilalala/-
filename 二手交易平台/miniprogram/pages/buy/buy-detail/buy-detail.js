var app=getApp();
Page({
  data: {
    queryResult: '',
  },
  onShareAppMessage: function(){
    return{
      title:'二手交易平台',
      path:'/pages/buy/buy-detail/buy-detail'
    }
  },
  onLoad: function (options) {
    var that = this;
    wx.showNavigationBarLoading();
    const db = wx.cloud.database()
    db.collection('goodData').where({
      _id: options.userid
    }).get({
      success: res => {
        var queryResult = res.data
        that.setData({
          queryResult: res.data,
        })
        wx.hideNavigationBarLoading();
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
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