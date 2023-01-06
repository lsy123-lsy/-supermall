<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad">
      </a>
      </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper'
export default {
  name: "HomeSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  data() {
    return {
      isLoad:false
    }
  },
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    },
    methods: {
      imageLoad(){
        console.log(isLoad)
        console.log('资源加载完毕')
        // 会发出四次事件，所以设置一下只发出一次
        if(!this.isLoad)
          console.log("轮播图加载完成")
          this.$emit('swiperImageLoad')
          this.isLoad = true
      }
    }
  }
}
</script>

<style>

</style>