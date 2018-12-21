

### 写在前面
> 之前写的那个小程序索引列表bug确实很多 。这次直接用的小程序自定义组件(component),总之还是官方的比较好用啊，虽然还是有些瑕疵，起码体验上是比以前的模板方式好太多了，引用也是很方便。
>
>更多细节请查看[小程序自定义组件官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/custom-component/) 



使用前请先[下载代码](https://github.com/mehaotian/wx-list-index) 

**首项排列对比**

![wx1.png](http://upload-images.jianshu.io/upload_images/4472817-5f0d07dfbe56f359.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/200)

![wx2.png](http://upload-images.jianshu.io/upload_images/4472817-4640f799663e02fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/200)


**是否开启过渡动画对比**
![正常模式2.gif](http://upload-images.jianshu.io/upload_images/4472817-26878f21cfef4227.gif?imageMogr2/auto-orient/strip)

![有过渡动画1.gif](http://upload-images.jianshu.io/upload_images/4472817-85866da150c133e1.gif?imageMogr2/auto-orient/strip)


**搜索效果**
![搜索效果.gif](http://upload-images.jianshu.io/upload_images/4472817-7249a95d901f3bd9.gif?imageMogr2/auto-orient/strip)


### 目录说明
component 文件夹下 `` wx-index-list `` 是组件目录，有四个文件
```
component
  -- wx-index-list
    -- wx-index-list.js   // 组件逻辑js文件，所需属性值这里是外部传入
    -- wx-index-list.json // 组件json文件，注册该文件夹下一组文件 为 自定义组件
    -- wx-index-list.wxml // 自定义组件的内部WXML结构
    -- wx-index-list.wxss // 样式只应用于这个自定义组件

```

### 引用组件

小程序的自定义组件引用很简单，使用已注册的自定义组件前，首先要在页面的 json 文件中进行引用声明。此时需要提供每个自定义组件的标签名和对应的自定义组件文件路径：

1. 配置json
```js
// demo.json

// 自定义组件引用方式
{
  "usingComponents": {
    "component-tag-name": "path/to/the/custom/component"
  }
}

// 本组件使用，复制下面代码到相应json文件下
{
  ...
  "usingComponents": {
    "list-html": "/component/wx-index-list/wx-index-list"
  }
  ...
}

```

2. wxml使用

正确配置json后，在页面的 wxml 中就可以像使用基础组件一样使用自定义组件。节点名即自定义组件的标签名，节点属性即传递给组件的属性值。

```html
<!-- 
  1.需要给组件提供一个父元素并指定高度,组件高度由父元素控制。否则将出现问题
  2.如果需要下拉刷新 ，请不要使用本组件
-->
<view class='wrapper'> 
  <list-html></list-html>
</view> 

```
3. 属性说明

目前组件接收 两个参数，一个事件

#### 属性
*  `` data [object]``  组件需要的数据，这里是个json对象
*  `` my-city [string] `` 是否开启我的定位 ，默认为不开启 ，需要传入城市名称。不写或者空，为不开启
*  `` config [object]``  配置项
   -     horizontal:   默认值 true, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
   -     animation: 默认值 true, // 过渡动画是否开启
   -     search: 默认值 true, // 是否开启搜索
   -     searchHeight: 默认值 45 // 搜索条高度 ，建议不要修改别的高度
   -     suctionTop:默认值 true // 是否开启标题吸顶

#### 事件
*  `` binddetail `` 列表点击事件，返回相关值


#### 属性事件使用

```html
<!-- pages/demo/demo.wxml -->
<view class='wrapper'> 
  <list-html data="{{city}}" my-city="北京" binddetail="binddetail" config="{{config}}"></list-html>
</view> 

```



```js

// pages/demo/demo.js

// 导入数据，可以ajax获取
let City = require('../../utils/allcity.js');

Page({

  data: {
    city:City,
    config: {
            horizontal: false, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
            animation: false, // 过渡动画是否开启
            search: false, // 是否开启搜索
            searchHeight: 45, // 搜索条高度
            suctionTop: false // 是否开启标题吸顶
        }
  },
  onLoad() {
      wx.showLoading({
          title: '加载数据中...',
        })
        // 模拟服务器请求异步加载数据
          setTimeout(()=>{
               this.setData({
                city: CityÏ
               })
              wx.hideLoading()
          },2000)
   },
  binddetail(e){
    console.log(e.detail)
    // 返回 例 :{name: "北京", key: "B", test: "testValue"}
  }
  
})

```

4. 数据格式

当前默认的数据来自组件内 allcity.js 模拟数据，

```js

// /utils/allcity.js
[{
  title:"热门城市",
    item: [
    {
      "name": "北京",
      "key": "热门",
      // 这里可以添加自定义字段
    },{
      "name": "上海",
      "key": "热门",
      // 这里可以添加自定义字段      
    }]
},{
  title:"B",
    item: [
    {
      "name": "北京",
      "key": "B",
      // 这里可以添加自定义字段
    },{
      "name": "保定",
      "key": "B",
      // 这里可以添加自定义字段
      
    }]
}]

```
> 如果需要修改数据格式，需要去修改组件 相应的wxml 和 js 。如果没有特殊要求，请按照以上数据格式使用。


***

本来城市索引列表也不是很难写的一个功能，这里写出来是为了给大家图省事，如有需要我会继续更新。如果有什么问题可以留言给我，我看到会给大家回复。 我建了一个 qq 群  ：166188735 ，感兴趣的同学可以加一下 ，可以一起讨论小程序，共同进步啊！然后就不要加私人微信了，突然发现加的人多了也有点苦恼啊 【手动笑脸】


# 更新日志
##v1.0.1 (2018-12-21更新)
 ##### 1. 添加左右联动 
 ##### 2. 添加标题吸顶











































