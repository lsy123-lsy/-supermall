<template>
  <tab-bar>
      <tab-bar-item path="/home" activeColor="pink">
        <img slot="item-icon" src="~assets/img/tabbar/home.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home-active.svg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="~assets/img/tabbar/sort.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/sort-active.svg" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img slot="item-icon" src="~assets/img/tabbar/car.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/car-active.svg" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="item-icon" src="~assets/img/tabbar/my.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/my-active.svg" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from '../../common/tabbar/TabBar'
import TabBarItem from '../../common/tabbar/TabBarItem'

export default {
  name:"MainTabBar",
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    height: 24px;
    width: 24px;
    margin-top: 3px;
    /* 图片和文字中间也有3px空间 */
    vertical-align: middle;
  }
</style>