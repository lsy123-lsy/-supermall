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
    },
    pullUpLoad:{
      type :Boolean,
      default:false
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
      // 跟踪滚动栏位置
      probeType:this.probeType,
      // 上拉加载更多
      pullUpLoad:this.pullUpLoad
    })
    // this.scroll.scrollTo(0,0)
    // 监听滚动位置
    this.scroll.on('scroll',(position) => {
      // console.log(position)
      this.$emit('scroll',position)
    })
    this.scroll.refresh()
    // 监听上拉事件
    this.scroll.on('pullingUp',() => {
      console.log("上拉加载更多")
      this.$emit("pullingUp")
    })
  },
  methods:{
    scrollTo(x,y,time = 300){
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
    },
    // 下拉加载后显示
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style>

</style>