<template>
  <div id="home">
    <nav-bar class="home-bar"><div slot="middle">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommmend-view :recommends="recommends"></home-recommmend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']"></tab-control>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavTab'
import TabControl from '@/components/content/tabControl/TabControl.vue'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommmendView from './childComps/HomeRecommmendView'
import FeatureView from './childComps/FeatureView'


import {getHomeMultidata} from '@/network/home'


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommmendView,
    FeatureView,
    TabControl
  },
  data(){
    return {
      banners:[],
      recommends:[],
    }
  },
  // 创建之后开始进行网络请求
  created(){
    // 1.请求多个数据
    getHomeMultidata().then(res => {
      console.log(res)
      // 存储数据
      this.banners = res.data.banner.list,
      this.recommends = res.data.recommend.list
    })
  }
  
}
</script>

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
</style>