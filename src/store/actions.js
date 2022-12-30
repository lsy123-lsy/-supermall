export default {
  addCart(Context,payload){
    // 1. 查找之前数组中是否有该商品
    let oldProduct = Context.state.cartList.find(item => item.iid === payload.iid)

    // 2. 判断lodProduct
    if(oldProduct){
      Context.commit('addCounter',oldProduct)
    }else {
      payload.count = 1
      Context.commit('addToCart',payload)
    }
  }
  
}