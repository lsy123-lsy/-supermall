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
    // 是否显示位置
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    },
    click: {
      type:Boolean,
      default:true
    }
  },

  data(){
    return {
      scroll:null
    }
  },
  mounted(){
    // 1. 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      // 跟踪滚动栏位置
      probeType:this.probeType,
      // 上拉加载更多
      pullUpLoad:this.pullUpLoad
    })
    // this.scroll.scrollTo(0,0)
    // 2. 监听滚动位置
    if(this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll',(position) => {
        // console.log(position)
        this.$emit('scroll',position)
      })
    }
    this.scroll.refresh()
    // 3. 监听上拉事件
    if(this.pullUpLoad){
      this.scroll.on('pullingUp',(position) => {
        console.log("上拉加载更多")
        this.$emit("pullingUp")
      })
    }
    
  },
  methods:{
    scrollTo(x,y,time = 300){
      // 逻辑与，先判断scroll对象是否创建完成
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
    },
    // 下拉加载后显示
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      // this.scroll有值就返回y坐标，没有值就返回0
      return this.scroll ? this.scroll.y : 0
      return this.scroll.y
    }
  }
}
</script>

<style>

</style>