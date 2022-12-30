<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="middle">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <scroll class="content" :probe-type="3">
      <cart-list></cart-list>
    </scroll>
    <cart-button-bar></cart-button-bar>
    
    
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavTab.vue';
import CartList from './childComps/CartList'
import CartButtonBar from './childComps/CartButtonBar';

import Scroll from '@/components/common/scroll/Scroll';
import {mapGetters} from 'vuex'

export default {
  name:'Cart',
  components:{
    NavBar,
    CartList,
    CartButtonBar,
    Scroll
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength
    // }
    // 辅助函数mapgetter，注意导入位置
    ...mapGetters(['cartLength','cartList'])
  }
}
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    
  }
  .content{
    height: calc(100% - 93px - 40px);
    overflow: hidden;
  }
</style>