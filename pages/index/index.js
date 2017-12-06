const CityIndexList = require('../../wx-list-index/wx-list-index.js')

Page({
  data: {

  },
  onReady: function () {


    var city = new CityIndexList(this);


    // 数据格式 （严格）
    let arr = [
      {
        title: "⭐",
        item: [
          {
            name: "123",
            key: "A"
          }
        ]

      },
      {
        title: "A",
        item: [
          {
            name: "234",
            key: "B"
          }
        ]

      }
    ]
    // 重置数据
    city.setting(function (set) {
      // set.data(arr); 
    })
    // 点击事件
    city.tap(function (e) {
      console.log(e)
    })

    console.log(city.api)


  }


})
