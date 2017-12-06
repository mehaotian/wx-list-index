const CITY = require('./allcity_bak.js');
const TITLE_HEIGHT = 37;
let isNum = ''
/**
 * 创建列表原型
 */
function CityIndexList(self) {
  this.self = self;
  // 初始化事件方法、属性
  this.init(CITY || []);
};

// 绑定原型
let cityIndexList = CityIndexList.prototype;


/** 
 * 向外暴露接口
 * 设置一些用户自订事件
 */
//  派发修改数据接口方法
cityIndexList.setting = function (callback) {
  let that = this;
  let objJson = {
    // 向外暴露的重置数据接口
    data(data) {
      // console.log(data);
      if (data) {
        that.init(data);
      }
    }
  }
  if (callback) {
    callback(objJson)
  }
}
// 派发点击事件方法
cityIndexList.tap = function (callback) {
  let that = this;
  that.self.LIST_JUMP_PAGE = function (e, ) {
    if (callback) {
      callback(e)
    }

  }

}

/**
 *  初始化事件方法、属性
 */
cityIndexList.init = function (CITY) {
  let self = this.self;
  let that = this;
  // 数据绑定
  // 城市
  this.api = CITY;
  self.setData({
    index: 0,
    'CITYINDEXLIST': {
      list: CITY,
      tab: this.methods.getListTab(CITY),
      scrollTopId: 're',
      scrollTopName: 0
    }
  }, function () {
    // 获取dom高度
    that.methods.queryMultipleNodes(function (res) {
      that.list_height_arr = res;
    })
    // 字母列表高度
    wx.createSelectorQuery().selectAll('.list-tab').boundingClientRect(function (rects) {
      rects.forEach(function (rect) {
        rect.top     // 节点的上边界坐标 
      })
    }).exec(function (res) {

      that._bottom = res[0][0].bottom;
      that._top = res[0][0].top;
      that._height = res[0][0].height;

    })



  })


  // 监听滚动事件
  self.scroll = function (e) {
    let scrollY = e.detail.scrollTop;
    let listHeight = that.list_height_arr;
    // console.log(scrollY)
    // 在中间位置
    for (let i = 0; i < listHeight.length - 1; i++) {
      let height1 = listHeight[i];
      let height2 = listHeight[i + 1];
      if (scrollY >= height1 && scrollY < height2) {
        // 判断不重复赋值 相同数据只执行一次
        if (that.currentIndex !== i) {
          // console.log(i)
          self.setData({
            index: i,
            'CITYINDEXLIST.currentIndex': i
          });

          that.currentIndex = i;
        }

        that.methods.diff(height2 - scrollY, self);
        return;
      }
    }
    // console.log("zuihou" + (listHeight.length - 1))
    that.currentIndex = listHeight.length - 1;
    self.setData({
      index: listHeight.length - 1
    });

  };

  // 设置滚动 
  self.setWords = function (e) {

    self.setData({
      'CITYINDEXLIST.scrollTopId': e.target.id,
      'CITYINDEXLIST.scrollTopName': e.target.id
    });

  };
  self.getWords = function (e) {
    const y = e.touches[0].clientY;
    let num = "";
    if (y > (that._top + 5) && y < (that._bottom - 5)) {
      let index = parseInt((y - (that._top + 5)) / 22);

      if (isNum != index) {
        console.log("index" + index)
        // console.log(isNum);
        isNum = index;
        self.setData({
          index: index,
          'CITYINDEXLIST.scrollTopId': "index" + index,
        });
      }
    };
  }

};


/**
 *  自定义方法
 */
cityIndexList.methods = {
  // 获取右侧列表数据
  getListTab(CITY) {
    if (CITY.length === 0 || CITY === "") {
      return;
    }
    var arr = [];
    for (let i in CITY) {
      if (CITY[i].title) {
        arr.push(CITY[i].title.substr(0, 1))
      }
    }
    return arr;
  },
  // 获取元素
  queryMultipleNodes(fn) {
    var arr = []

    wx.createSelectorQuery().selectAll('.idxlist-item-hock').boundingClientRect(function (rects) {
      rects.forEach(function (rect) {
        rect.top     // 节点的上边界坐标 
      })
    }).exec(function (res) {
      for (let i = 0; i < res[0].length; i++) {
        arr.push(res[0][i].top)
      }
      if (fn) {
        fn(arr)
      }
    })

  },

  /**
   *  TODO 动画 (还有问题)
   */
  diff(newVal, self) {
    let oldVal = 0;
    let fixedTop = newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0;

    if (oldVal == fixedTop) {
      self.setData({
        'CITYINDEXLIST.translate3dY': `translate3d(0,${fixedTop}px,0)`
      });
      return;
    }
    oldVal = fixedTop;

    // console.log(fixedTop)
    self.setData({
      'CITYINDEXLIST.translate3dY': `translate3d(0,${fixedTop}px,0)`
    });
  }

}

module.exports = CityIndexList;