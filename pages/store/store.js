// pages/store/store.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     animationData: {},
     dataitemlength:'',
     Endheight:'',
     firstheight:'',
     secondHeight:'',
     Endheighttop:'',
     windowWidth:'',
     order:[
      {
        title:"减",
        describe:'满50减20;满120减40'
      },
      {
        title:"首",
        describe:'满50减20;满120减40'
      },
      {
        title:"折",
        describe:'满50减20;满120减40'
      }],
      ordercp:[
      {
        title:"减",
        describe:'满50减20;满120减40'
      },
      {
        title:"首",
        describe:'满50减20;满120减40'
      },
      {
        title:"折",
        describe:'满50减20;满120减40'
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        let that=this;
        var p1 = new Promise((resolve, reject) => {
          that.getFirstHeight(resolve);
        });
        var p2 = new Promise((resolve, reject) => {
          that.getSecondHeight(resolve);
        });
        Promise.all([p1, p2]).then(values => {
            wx.getSystemInfo({
                success: function (res) {
                  console.log(res.windowWidth)
                  that.setData({
                    Endheight:(res.windowHeight - that.data.firstheight - that.data.secondHeight-50)+"px",
                    Endheighttop:(that.data.firstheight + that.data.secondHeight-3.5)+"px",
                    windowWidth:(res.windowWidth-100)+"px"
                  })
                }
            })
        });
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
    var animation = wx.createAnimation({
        duration: 2000,
        timingFunction: 'ease',

    });
    var sum=0;
    setInterval(function() {
        sum+=40;
        console.log(sum)
        animation.translateY(-sum).step();
          this.setData({
            order:this.data.order.concat(this.data.ordercp)
          });
        this.setData({
          animationData:animation.export()
        })
    }.bind(this), 5000)

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

  },
  // 触摸开始事件
  touchStart:function(e){
    console.log("touchStart")
    console.log(e);
  },
  // 触摸移动事件
  touchMove:function(e){
    console.log("touchMove");
    console.log(e);
  },
   // 触摸结束事件
  touchEnd:function(e){
    console.log("touchEnd");
    console.log(e)
  },
  getFirstHeight(resolve){
      var query = wx.createSelectorQuery();
      query.select('#header-store').boundingClientRect();
      let that=this;
      query.exec(function (res) {
        console.log(res[0].height+"已经得到1");
          that.setData({
            firstheight:res[0].height
          })
          resolve();
      })
  },
  getSecondHeight(resolve){
      var query = wx.createSelectorQuery();
      query.select('#headerbar').boundingClientRect();
      let that=this;
      query.exec(function (res) {
        console.log(res[0].height+"已经得到2");
          that.setData({
            secondHeight:res[0].height
          })
          resolve();
      })
  }
})