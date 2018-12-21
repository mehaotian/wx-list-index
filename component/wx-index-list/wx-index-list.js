// component/wx-index-list/wx-index-list.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        /**
         * 城市数据
         */
        data: {
            type: Object,
            value: {},
            observer: function(newVal, oldVal) {
                this.resetRight(newVal);
            }
        },
        /**
         * 配置项
         */
        config: {
            type: Object,
            value: {
                horizontal: true, // 第一个选项是否横排显示（一般第一个数据选项为 热门城市，常用城市之类 ，开启看需求）
                animation: true, // 过渡动画是否开启
                search: true, // 是否开启搜索
                searchHeight: 45, // 搜索条高度
                suctionTop: true // 是否开启标题吸顶
            }
        },
        /**
         * 是否定位我的位置
         */
        myCity: {
            type: Boolean,
            value: false,
        },
        // 用于外部组件搜索使用
        search: {
            type: String,
            value: "",
            observer: function(newVal, oldVal) {
                console.log(newVal)
                this.value = newVal;
                this.searchMt();
            }
        }
    },

    data: {
        list: [],
        rightArr: [], // 右侧字母展示
        jumpNum: '', //跳转到那个字母
        myCityName: '请选择', // 默认我的城市
        topGroup: [], // 内容高度数据
        pos: {
            isTop: false,
            y: 0,
            oldIndex: -1
        },
        listIndex: 0,
        moveDistance: 0
    },
    ready() {
        // let data = this.data.data;
        // this.resetRight(data);
        // if (this.data.myCity) {
        //   this.getCity()
        // }
    },
    methods: {
        /**
         * 数据重新渲染
         */
        resetRight(data) {
            let rightArr = []
            if (this.data.myCity) {
                this.data.data.unshift({
                    title: '我的定位',
                    type: 'me',
                    item: [{
                        name: '点击获取我的位置',
                        key: '我的定位'
                    }]
                })
            }
            for (let i in data) {
                rightArr.push(data[i].title.substr(0, 1));
            }
            this.setData({
                list: data,
                rightArr
            }, () => {
                if (data.length != 0) {
                    this.queryMultipleNodes();
                }
            })
        },
        // getCity() {
        //   wx.getLocation({
        //     type: 'wgs84',
        //     success: function (res) {
        //       this.latitude = res.latitude;
        //       this.longitude = res.longitude;
        //       // console.log(res)
        //     }
        //   })
        // },
        /**
         * 右侧字母点击事件
         */
        jumpMt(e) {
            let jumpNum = e.currentTarget.dataset.id;
            this.setData({
                jumpNum
            });
        },
        /**
         * 列表点击事件
         */
        detailMt(e) {
            let detail = e.currentTarget.dataset.detail;
            let myEventOption = {
                bubbles: false, //事件是否冒泡
                composed: false, //事件是否可以穿越组件边界
                capturePhase: false //事件是否拥有捕获阶段
            } // 触发事件的选项
            this.triggerEvent('detail', detail, myEventOption)

        },
        // 获取搜索输入内容
        input(e) {
            this.value = e.detail.value;
        },
        // 基础搜索功能
        searchMt() {
            this._search();
        },
        /**
         * 搜索相关逻辑实现
         */
        _search() {
            let data = this.data.data;
            let newData = [];
            for (let i = 0; i < data.length; i++) {
                let itemArr = [];
                for (let j = 0; j < data[i].item.length; j++) {
                    if (data[i].item[j].name.indexOf(this.value) > -1) {
                        let itemJson = {};
                        for (let k in data[i].item[j]) {
                            itemJson[k] = data[i].item[j][k];
                        }
                        itemArr.push(itemJson);
                    }
                }
                if (itemArr.length === 0) {
                    continue;
                }
                newData.push({
                    title: data[i].title,
                    type: data[i].type ? data[i].type : "",
                    item: itemArr
                })
            }
            this.resetRight(newData);
        },
        // 城市定位
        locationMt() {
            // TODO 暂时没有实现 定位自己的城市，需要引入第三方api
        },
        /**
         * 监听滚动
         */
        scroll(e) {
            let top = e.detail.scrollTop
            let index = this.currentIndex(top)
            let list = this.data.topGroup
            let distance = top - list[this.data.listIndex]
            let num = -(list[this.data.listIndex + 1] - top - 40)
            // 渲染滚动索引
            if (index !== this.data.listIndex) {
                // console.log(index)
                this.setData({
                    // 'pos.oldIndex': index,
                    listIndex: index,
                    moveDistance: 40,
                })
                // 如果监听到 index 的变化 ，一定要return ，否则吸顶会先变化文字后运动，会闪烁
                return
            }
            if (num < 0) num = 0
            if (num !== this.data.moveDistance) {
                this.setData({
                    moveDistance: num,
                })
            }
        },
        /**
         * 获取当前滚动索引
         */
        currentIndex(y) {
            let listHeight = this.data.topGroup
            for (let i = 0; i < listHeight.length; i++) {
                let height1 = listHeight[i]
                let height2 = listHeight[i + 1]
                if (!height2 || (y >= height1 && y < height2)) {
                    return i
                }
            }
            return 0
        },
        /**
         * 获取节点信息
         */
        queryMultipleNodes() {
          let self = this 
            const query = wx.createSelectorQuery().in(this);
            query.selectAll('.fixed-title-hock').boundingClientRect((res) => {
                res.forEach(function(rect) {
                    rect.top // 节点的上边界坐标
                })
            }).exec((e) => {
                let arr = []
                e[0].forEach((rect) => {
                    let num = 0
                    if (rect.top !== 0) {
                      num = rect.top - (self.data.config.search ? self.data.config.searchHeight : 0)
                    }
                    arr.push(num)
                })
                this.setData({
                    topGroup: arr
                })
            })
        }

    }
})