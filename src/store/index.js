import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1. 安装插件
Vue.use(Vuex)

// 2. 创建store对象
const store = new Vuex.Store({
  // 提醒修改store中的任何参数都要经过mutations
  state: {
    cartList: []
  },
  // 1. 方法一
  // mutations: {
  //   addCart(state,payload){
  //     // 1. 查找之前数组中是否有该商品
  //     let oldProduct = state.cartList.find( item => item.iid ===payload.iid)
  //     // 判断
  //     if(oldProduct){
  //       oldProduct.count += 1
  //     }else {
  //       // 添加了一个count属性
  //       payload.count = 1
  //       state.cartList.push(payload)
  //     }
  //     console.log(state.cartList)
  //   }
  // }
  mutations,
  actions,
  getters
})

// 3. 挂载Vue实例上
export default store