<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
        <!-- 为 my-goods 组件动态绑定 goods 属性的值 -->
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //请求参数对象
        queryObj:{
          query:'',
          cid:'',
          pagenum:1,
          pagesize:10
        },
        goodsList:[],
        total:0,
        //节流阀
        isloading:false
      };
    },
    onLoad(options){
      this.queryObj.query=options.query||''
      this.queryObj.cid=options.cid||''
      
      this.getGoodsList()
    },
    methods:{
     // 获取商品列表数据的方法
     async getGoodsList(cb) {
       this.isloading = true
       const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
       this.isloading = false
        // 只要数据请求完毕，就立即按需调用 cb 回调函数
         cb && cb()
         
       if (res.meta.status !== 200) return uni.$showMsg()
       this.goodsList = [...this.goodsList, ...res.message.goods]
       this.total = res.message.total
     }
    },
    onReachBottom(){
      if(this.queryObj.pagenum*this.queryObj.pagesize>= this.total) return uni.$showMsg('数据加载完毕')
      
      if(this.isloading) return
      
      //让页码值自增+1
      this.queryObj.pagenum+=1
      this.getGoodsList()
    },
    // 下拉刷新的事件
    onPullDownRefresh() {
      // 1. 重置关键数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []
    
      // 2. 重新发起请求
      this.getGoodsList(() => uni.stopPullDownRefresh())
    },
    // 点击跳转到商品详情页面
    gotoDetail(goods) {
      uni.navigateTo({
        url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
      })
    }
  }
</script>

<style lang="scss">

</style>