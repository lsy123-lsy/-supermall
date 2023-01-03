export default {
  addCart(Context,payload){
    return new Promise((resolve,reject) => {
      // 1. 查找之前数组中是否有该商品
      let oldProduct = Context.state.cartList.find(item => item.iid === payload.iid)

      // 2. 判断lodProduct
      if(oldProduct){
        Context.commit('addCounter',oldProduct)
        resolve('当前的商品数量+1')
      }else {
        payload.count = 1
        Context.commit('addToCart',payload)
        resolve('添加的新的商品')
      }
    })
  }
  
}