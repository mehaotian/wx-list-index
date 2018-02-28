// pages/demo/demo.js
let City = require('../../utils/allcity.js');

Page({

  data: {
    city:City
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