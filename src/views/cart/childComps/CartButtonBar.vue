<template>
  <div class="botton-bar">
    
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton';

import {mapGetters} from 'vuex'
export default {
  name:'CarButtonBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      if(this.cartList.length === 0) return false
      // every  判断为假就返回fasle，且找到一个假后先停止查找
      return this.cartList.every(item => {
        // 未被选中的item.checked为false，返回false，说明未全选
        return item.checked
      })
    }
  },
  methods: {
    checkClick(){
      console.log('点击选中否')
      if(this.isSelectAll){  //全部选中
        this.cartList.forEach(item => item.checked = false)
      } else{  //有未选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    // 去计算点击事件
    calcClick(){
      // if(!this.isSelectAll){
      //   this.
      // }
    }
  }
}
</script>

<style scoped>
  .botton-bar{
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    margin-right: 10px;
    line-height: 20px;
    /* margin-top: 10px; */
    /* padding-bottom: 10px; */
  }
  .price{
    margin-left: 30px;
    flex: 1;
  }
  .calculate{
    width: 100px;
    text-align: center;
    background: red;
    color: #fff;
  }
</style>