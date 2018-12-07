// pages/demo/demo.js
let City = require('../../utils/allcity.js');

Page({

  data: {
    city:[]
  },
  onLoad(){
    // wx.showLoading({
    //   title: '加载数据中...',
    // })
    // 模拟服务器请求异步加载数据
    // setTimeout(()=>{
      this.setData({
        city: City
      })
    //   wx.hideLoading()
    // },2000)

  },
  bindtap(e){
    console.log(e.detail)
  },
  input(e){
    this.value = e.detail.value
  },
  searchMt(){
    // 当没有输入的时候，默认inputvalue 为 空字符串，因为组件 只能接受 string类型的 数据 
    if(!this.value){
      this.value = '';
    }
    this.setData({
      value:this.value
    })
  }
  
})