export default{
  namespaced:true,
  
  state:()=>({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart:JSON.parse(uni.getStorageSync('cart')||'[]')
  }),
  
  mutations:{
    addToCart(state,goods){
      const findResult=state.cart.find(x=>x.goods_id===goods.goods_id)
      
      if(!findResult){
        state.cart.push(goods)
      }
      else{
        findResult.goods_count++
      }
      this.commit('m_cart/saveToStorage')
    },
      saveToStorage(state){
        
        uni.setStorageSync('cart',state.JSON.stringify(cart))
      },
      //更新购物车中的商品勾选状态
      updateGoodsState(state,goods){
        const findResult=state.cart.find(x=>x.goods_id===goods.goods_id)
        
        if(findResult){
          findResult.goods_state=goods.goods_state
          
          this.commit('m_cart/saveToStorage')
        }
      },
      //更新商品的数量
      updateGoodsCount(state,goods){
        const findResult=state.cart.find(x=>x.goods_id===goods.goods_id)
        
        if(findResult){
          findResult.goods_count=goods.goods_count
          
          this.commit('m_cart/saveToStorage')
        }
      },
      //根据ID删除对应商品
      removeGoodsById(state,goods_id){
        state.cart=state.cart.filter(x=>x.goods_id!==goods_id)
        this.commit('m_cart/saveToStorage')
      }
  },
  
  getters:{
    total(state){
      let c=0
      state.cart.forEach(x=>c+=x.goods_count)
      return c
    }
  }
}