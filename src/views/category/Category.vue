<template>
  <div class="wrap" ref="aaa">
    <ul>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:'Category',
  data(){
    return {
      scroll:null
    }
    
  },
  created(){
    // let bs = new BScroll('.wrap',{

    // })
  },
  mounted(){
    this.scroll = new BScroll(document.querySelector('.wrap'),{
        probType:3,
        pullUpLoad:true,
        click:true
    })
    this.scroll.on('scroll',(option) => {
      console.log(option)
    })
    this.scroll.on('pullingUp',() => {
      console.log('上拉加载')
    })
  }
}
</script>

<style>
  .wrap{
    height: 150px;
    background-color: red;
    overflow-y: scroll;
  }
</style>