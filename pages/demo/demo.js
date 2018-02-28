// pages/demo/demo.js
let City = require('../../utils/allcity.js');

Page({

  data: {
    city:City
  },

  bindtap(e){
    console.log(e.detail)
  }
  
})