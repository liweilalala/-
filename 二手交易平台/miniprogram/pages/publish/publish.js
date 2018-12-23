const app = getApp()
Page({
  data: {
    openid: '',
    tempFilePaths: null,
    imagepath: '',
    describe: null,
    title: null,
    price: null,
    adress: null,
    a: "",
    b: "",
    c: false,
    d: "",
    e: "",
    dovison:true,
  },

  formSubmit1: function(e) {
    var that = this;
    that.data.title = e.detail.value.title;
    console.log(e.detail.value.title);
    if (!that.data.title) {
      wx.showToast({
        icon: 'none',
        title: '请输入商品名',
      })
    } else {
      that.setData({
        title: that.data.title
      })
    }
  },
  formSubmit2: function (e) {
    var that = this;
    wx.showLoading({
      title: '上传中',
    })
    that.setData({
      describe: e.detail.value.describe,
      price: e.detail.value.price,
      adress: e.detail.value.adress,
    })
    // 上传图片
    const filePath = that.data.tempFilePaths[0]
    const cloudPath = that.data.title + filePath.match(/\.[^.]+?$/)[0]
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        console.log('[上传文件] 成功：', res)

        that.setData({
          imagepath: res.fileID
        })
console.log(imagepath)

      },
      fail: e => {
        console.error('[上传文件] 失败：', e)
        wx.showToast({
          icon: 'none',
          title: '上传失败',
        })
      },
      complete: () => {
    
        if (!wx.cloud) {
          console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
          wx.cloud.init({
            traceUser: true,
          })
        }

        //初始化数据库
        const db = wx.cloud.database()
        //向数据库添加一条记录
        db.collection('goodData').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            head: app.globalData.userInfo.avatarUrl,
            name: app.globalData.userInfo.nickName,
            title: that.data.title,
            image: that.data.imagepath,
            describe: that.data.describe,
            price: that.data.price,
            adress: that.data.adress,
          },
          success: function (res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(that.data.imagepath)
          }
        })


        that.setData({
          a: "",
          b: "",
          d: "",
          e: "",
          tempFilePaths: "",
          title: ""
        })
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '发布成功',
        })
      }
    })
   
   
    
      
  },
  switchChange(e) {
    this.setData({
      dovison:e.detail.value
      })
  },
  onLoad: function(options) {


  },
  doUpload: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          tempFilePaths: res.tempFilePaths,
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },


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