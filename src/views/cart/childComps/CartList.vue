<template>
  <div class="cart-list">
    <!-- <li v-for="(item,index) in cartList" :key="index"
      :itemInfo="item">
      {{ item }}
    </li> -->
    <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
  </div>
</template>

<script>
import CartListItem from './CartListItem';
import Scroll from '@/components/common/scroll/Scroll'
import { mapGetters } from 'vuex';

export default {
  name:'CartList',
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(['cartList'])
  }
}
</script>

<style scoped>
  
</style>