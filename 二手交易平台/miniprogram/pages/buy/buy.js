
Page({

  /**
   * 页面的初始数据
   */
  data: {
    GoodsData: [],
    totalGoods:0

  },
  onShareAppMessage: function () {
    return {
      title: '二手交易平台',
      path: '/pages/buy/buy'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    const db = wx.cloud.database()
    db.collection('goodData').get({
      success: res => {
        this.setData({
          GoodsData: res.data,
        })
        wx.hideNavigationBarLoading();
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    //this.setData可以让view重绘
  },
  godetail: function (event) {
    wx.navigateTo({
      url: 'buy-detail/buy-detail?userid=' + event.currentTarget.dataset.userid
    })
  },




  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const db = wx.cloud.database()
    db.collection('goodData')
      .skip(this.data.totalGoods) // 跳过结果集中的前 10 条，从第 11 条开始返回
      .limit(20) // 限制返回数量为 10 条
      .get()
      .then(res => {
        if (res.data[0]) {
          this.setData({
            GoodsData: res.data,
          })
        }


      })
      .catch(err => {
      })

  },


  onHide: function () {

  },

  onUnload: function () {

  },


  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    const db = wx.cloud.database()
    db.collection('goodData')
      .skip(this.data.totalGoods)
      .limit(20) 
      .get()
      .then(res => {
        if (res.data[0]) {
          this.setData({
            GoodsData: res.data,
          })
        }
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh()
      })
      .catch(err => {
      })
  },
  pageup:function(){
    var that = this;
    if(that.data.totalGoods>=20){
      that.data.totalGoods -= 20;
      const db = wx.cloud.database()
      db.collection('goodData')
        .skip(that.data.totalGoods) // 跳过结果集中的前 10 条，从第 11 条开始返回
        .limit(20) // 限制返回数量为 10 条
        .get()
        .then(res => {
          if (res.data[0]) {
            this.setData({
              GoodsData: res.data,
            })
          }


        })
        .catch(err => {
        })
    }
  

  },

  pagenext:function(){ 
    var that = this;
    that.data.totalGoods += 20;
    const db = wx.cloud.database()
    db.collection('goodData')
      .skip(that.data.totalGoods) // 跳过结果集中的前 10 条，从第 11 条开始返回
      .limit(20) // 限制返回数量为 10 条
      .get()
      .then(res => {
        if (res.data[0]) {
          this.setData({
            GoodsData: res.data,
          })
        }


      })
      .catch(err => {
      })

    
  },

  onReachBottom: function () {

  }
})
