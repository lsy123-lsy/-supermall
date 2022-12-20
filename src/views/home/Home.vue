<template>
  <div id="home">
    <nav-bar class="home-bar"><div slot="middle">购物街</div></nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" 
      @scroll="contentScroll" :pull-up-load="true">
      <home-swiper :banners="banners"></home-swiper>
      <home-recommmend-view :recommends="recommends"></home-recommmend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行','新款','精选']"
        @tabClick="tabClick"></tab-control>
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
      isShowBackTop:false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.cuurentType].list
    }
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
  methods:{
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
      },
      backClick(){
        // x,y,毫秒
        // 相当于this.$refs.scroll.message
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        console.log(position)
        this.isShowBackTop = (-position.y) > 1000
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
      })
    }
  }
  
}
</script>
<!-- scoped作用域 -->
<style scoped>
#home{
  padding-top: 44px;
  padding-bottom: 49px;
}
  .home-bar{
    background-color: var(--color-tint);
    color: white;
    /* 固定navbar */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    /* sticky有两个属性，当满足条件时会变为fixed，但有时候不兼容 */
    position: sticky;
    top: 44px;
    z-index: 8;
  }
  .content{
    height: calc(100vh - 93px);
    overflow: hidden;
  }
</style>