// pages/dome/dome.js
let City = require('../../utils/allcity.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:City
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  bindtap(e){
    console.log(e.detail)
  }
  
})