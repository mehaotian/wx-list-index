---
     - 微信小程序
     - 城市列表选择
---



#### 引言：
> 之前写过一个小程序的索引列表，写完之后也没有继续去维护，最近有时间把它抽离成组件了，因为技术问题，有些未解决问题，特效全开的话，会比较卡，之后我会说到。

**基本效果如下**

#### 使用方法
> 先下载代码 github：[源码下载地址](https://github.com/mehaotian/wx-list-index)

从下载的demo目录下找到 wx-list-index 文件夹 放到自己项目的根目录下

![list3.png](http://upload-images.jianshu.io/upload_images/4472817-3447489fa2307479.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


###### 目录说明
1. wx-list-index* ---组件基本文件
2. List-index.js ---组件主js文件（主要逻辑都在这里，如果有修改修改这个文件）
3. config.wxs  ---组件配置文件，一看便知
4. allcity.js --- 模拟数据（可以替换自己的数据，之后有说明）

###### 使用说明
假设你的目录结构为
pages
--- index.wxml
--- index.wxss
--- index.js
--- index.json
wx-list-index
 --- 组件文件

**index.wxml文件如下：**
```html
<!-- 引入模板  -->
<import src="../../wx-list-index/wx-list-index.wxml"/> 
<view class='scroll-list'>
  <template is="indexList" data="{{CITYINDEXLIST,index}}"/>
</view> 
```
> template 中的data属性 传值 是固定字段，不要修改。 模板外面包裹一个 设定高度的元素。

**index.wxss文件如下：**
```css
/* 引入模板样式  */
@import "../../wx-list-index/wx-list-index.wxss"; 
```
> 引入样式，如果样式有修改，直接修改wx-list-index.wxss 文件即可

**index.js文件如下：（重点）**
```javascript
  // 引入组件js 文件
  const CityIndexList = require('../../wx-list-index/List-index.js')
Page({
...
onReady: function () {
   // 创建组件实例 
   new CityIndexList(this);
 }
...
})


```
> 这个时候基本上就可以正常显示了，默认的数据来自组件内 allcity.js 模拟数据，基本效果如下：

![list2.png](http://upload-images.jianshu.io/upload_images/4472817-c3b8fc70cb5440a0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


**给列表添加点击事件：**
```javascript
...

Page({
...
onReady: function () {
   // 创建组件实例 
   let listindex = new CityIndexList(this);
  // 点击事件
   listindex .tap(function (e) {
      console.log(e)
    })
 }
...
})

...


```

> .tap()方法接受一个匿名函数的参数 ，默认返回值 是 点击事件 ，跟微信小程序的点击事件是一样的，之后的所有点击操作都在tap方法返回的匿名函数里实现。


**给列表添加自定义数据：**
```javascript
...

Page({
...
onReady: function () {
   // 创建组件实例 
   let listindex = new CityIndexList(this);
  // 点击事件
   listindex .tap(function (e) {
      console.log(e)
    })

  // 数据格式 （严格），目前来说没做数据方面的校验，所以你只能按我的数据格式来返回数据
    
  // 重置数据
    listindex.setting(function (set) {
      wx.request({
        url: 'test.php', //仅为示例，并非真实的接口地址
         ...
        success: function(res) {
            set.data(res.data)
        }
     })
    
    })
 }
...
})

...


```

> .setting(set) 方法接受一个匿名函数的参数 ，默认返回值是一个json对象，目前只有一个方法可以有，之后有需要会添加别的方法。 在setting 可以写你的ajax 代码，最后将数据重构成我需要的格式，传入 set.data(arr) 中即可。


#### 配置数据说明

**数据格式**
```js
[ {
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
  }]
```
> 数据接受的参数是一个数组，每一项是一个 json对象 ，使用之前可以把数据改成 需要的格式（可能之后会会有修改）

**配置说明(组建目录下 config.wxs)**

 ```js
// 配置文件
module.exports = {
  scrollWithAnimation: false, // 是否开启滚动动画
  infeed: false, // 首条数据是否展开（false为列表 或者 true展开）注: 如果首条数据不是热门之类的，请设置为false
  /**
   * 以下功能有问题，请谨慎开启
   */
  isTop: false,// 是否开启顶部固定
  active: false, // 是否开启选中效果
};
```

> 说明一看就懂 ， 需要注意的是 顶部固定显示，和选中效果这里会比较卡，是因为数据量比较大造成的，setData 毕竟是一个异步的方法，如果哪位小伙伴有好的改进办法，麻烦告诉我一下。


![list1.png](http://upload-images.jianshu.io/upload_images/4472817-1e38f4894dffa891.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




---

#### 属性方法说明
###### 实例
 **new new CityIndexList(this)**
获取组件实例，参数为 this 。

###### 方法
1. **setting(function(set){})**
设置数据 ，set 是一个对象，用set的data方法添加数据  例： set.data([{titile:'A',item:[{name:'北京'，key:'A'}]}]) 
2. **tap(function(e){})**
列表点击事件 ，返回的事件对象与 小程序的点击事件一样。

###### 属性
1.**api**
返回当前索引列表的 数据 例： new new CityIndexList(this).api

暂时就这些。如有需要会更新

---

以上，基本结束，我会一直更新代码的，如果有错误欢迎指证。




















