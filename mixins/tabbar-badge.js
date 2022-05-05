import {mapGetters} from 'vuex'

export default{
  computed:{
    ...mapGetters('m_cart',['total'])
  },
  onshow(){
    this.setBadge()
  },
  methods:{
    setBadge(){
      uni.setTabBarBadge({
        index:2,
        text:this.total+''
      })
    }
  }
}