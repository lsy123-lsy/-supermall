<template>
  <div id="home">
    <nav-bar class="home-bar"><div slot="middle">购物街</div></nav-bar>

    <tab-control class="tab-control" :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="topTabControl"
        v-show="isTabFixed"></tab-control>

    <scroll class="content" ref="scroll" 
      :probe-type="3" 
      @scroll="contentScroll" 
      :pull-up-load="true"
      @pullingUp="loadMore">
      <home-swiper :banners="banners"
        @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommmend-view :recommends="recommends"></home-recommmend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavTab'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommmendView from './childComps/HomeRecommmendView'
import FeatureView from './childComps/FeatureView'


import {getHomeMultidata,getHomeGoods} from '@/network/home'
import {debounce} from '@/common/utils'
import {itemListenerMixin,backTopMixin} from '@/common/mixin'


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommmendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      cuurentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed: false,
      saveY: 0,
      homeImgListerner: null
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.cuurentType].list
    }
  },

  destroyed() {
    console.log("destroyed")
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,1)  // x:0,1是延迟
    console.log("activated")
  },
  deactivated() {
    console.log("deactivated")

    // 1. 保存离开时的Y坐标
    this.saveY = this.$refs.scroll.getScrollY()

    // 2. 取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  // 创建之后开始进行网络请求
  created(){
    // 1.请求多个数据,指methods中的函数
    this.getHomeMultidata(),
    // 2. 请求商品数据
    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')
  },

  mounted(){
      // 1.监听图片加载完毕,利用防抖
      // 组件一旦创建完成，并且挂在监听事件总线里的itemImageLoad（图片加载完成事件）然后刷新scrollHeight高度
      // const refresh = debounce(this.$refs.scroll.refresh,500)

      // // 对监听事件进行保存
      // this.itemImgListener = () => {
      //   newRefresh(20,30,'abc')
      // }
      // this.$bus.$on('itemImgLoad',this.itemImgListener)

  },
  methods:{
    /*
      事件监听的有关方法
    */
    /*
      事件监听 */
      tabClick(index){
        console.log(index)
        switch (index) {
          case 0:
            this.cuurentType = 'pop'
            break
          case 1:
            this.cuurentType = 'new'
            break
          case 2:
            this.cuurentType = 'sell'
            break
        }

        // 让两个tabcontrol的cuurentindex保持一致
        this.$refs.topTabControl.currentIndex = index
        this.$refs.tabControl.currentIndex = index
      },
      // 被抽取到混入里
      // backClick(){
      //   // x,y,毫秒
      //   // 相当于this.$refs.scroll.message
      //   this.$refs.scroll.scrollTo(0,0,500)
      // },
      contentScroll(position){
        // console.log(position)
        // 1.backTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        // 2.决定tabControl是否产生吸顶效果
        this.isTabFixed = (-position.y) >this.tabOffsetTop
      },
      loadMore(){
        console.log('上拉加载更多')
        this.getHomeGoods(this.cuurentType)
      },
      swiperImageLoad(){
        // 2.获取tabcontrol的offsettop
        // this.$refs.tabControl拿到的为组件不是元素，所有的组件都有属性$el,获得组件下的元素
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
        console.log(this.$refs.tabControl.$el.offsetTop)
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      },
    /*
      网络请求 */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        console.log(res)
        // 存储数据
        this.banners = res.data.banner.list,
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then( res => {
        console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 完成了下来加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
  
}
</script>
<!-- scoped作用域 -->
<style scoped>
#home{
  /* padding-top: 44px; */
  padding-bottom: 49px;
  height: 100vh;
  position: relative;
}
  .home-bar{
    background-color: var(--color-tint);
    color: white;
    /* 固定navbar */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control{
    /* sticky有两个属性，当满足条件时会变为fixed，但有时候不兼容 */
    /* position: sticky; */
    top: 44px;
    z-index: 8;
  }
  .content{
    height: calc(100vh - 93px);
    overflow: hidden;
  }
  /* .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */
</style>