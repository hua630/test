<template>
  <view>
    <!--商品列表的标题区域-->
    <view class="cart-title">
      <!--左侧图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!--右侧文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
  </view>
</template>

<script>
  
  export default {
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
.cart-title{
  height:40px;
  display:flex;
  align-items: center;
  padding-left:5px;
  border-bottom:1px solid #efefef;
  
  .cart-title-text{
    font-size: 14px;
    margin-left:10px;
  }
}

</style>
