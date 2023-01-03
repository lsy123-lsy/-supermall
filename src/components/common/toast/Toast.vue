<template>
  <div class="toast">
    <div v-show="show">{{message}}</div>
  </div>
</template>

<script>
export default {
  name:'Toast',
  // props: {
  //   message: {
  //     type: String,
  //     default: ''
  //   },
  //   show: {
  //     type: Boolean,
  //     default: false
  //   }
  // }
  data() {
    return {
      message:'',
      isShow: false
    }
  },
  methods: {
    show(message='默认文字',duration=2000) {
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      },duration)
    }
  }
}
</script>

<style scoped>
  .toast{
    position: fixed;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
    color: #fff;
    background-color: rgba(0, 0, 0, .8);
    z-index: 999;
  }
</style>