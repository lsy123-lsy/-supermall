<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'blue'
    }
  },
  data(){
    return {
      // isActive:true,
    }
  },
  computed:{
    isActive(){
      // 比较
      return this.$route.path.includes(this.path)
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      if(this.$route.path != this.path)
        this.$router.replace(this.path)
      console.log("路径："+this.path)
    }
  }
}
</script>

<style>

</style>