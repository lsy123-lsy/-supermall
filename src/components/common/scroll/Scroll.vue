<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:"Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    }
  },
  data(){
    return {
      scroll:null
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:3
    })
    this.scroll.scrollTo(0,0)
    // 监听滚动位置
    this.scroll.on('scroll',(position) => {
      // console.log(position)
      this.$emit('scroll',position)
    })
    // 监听上拉事件
    this.scroll.on('pullingUp',() => {
      console.log("上拉加载更多")
    })
  },
  methods:{
    scrollTo(x,y,time = 300){
      this.scroll.scrollTo(x,y,time)
    }
  }
}
</script>

<style>

</style>