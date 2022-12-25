<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content">
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-params-info ref="params" :paramInfo="paramInfo"></detail-params-info>
        <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamsInfo from './childComps/DetailParamsInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import scroll from '@/components/common/scroll/Scroll'

import {getDetail,Goods,Shop,GoodsParam} from '@/network/detail'

export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        scroll,
        DetailGoodsInfo,
        DetailCommentInfo,
        DetailParamsInfo
    },
    data(){
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {}
        }
    },
    created() {
        console.log(this.$route.params)
        // 1. 保存存入的id
        this.iid = this.$route.params.iid
        console.log(this.iid)

        // 2. 根据iid请求详细数据
        getDetail(this.iid).then(res => {
            // 1. 获得顶部轮播图
            console.log(res)
            const data = res.result
            this.topImages = data.itemInfo.topImages
            console.log(this.topImages)

            // 2. 获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            console.log(this.goods)

            // 3. 获得店铺信息
            this.shop = new Shop(data.shopInfo)

            // 4. 保存商品的详细数据
            this.detailInfo = data.detailInfo
            console.log(this.detailInfo)

            // 5. 获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            console.log(this.paramInfo)

            // 6. 取出评论信息
            if(data.rate.cRate !== 0) {
                this.commentInfo = data.rate.list[0]
            }
            console.log(this.commentInfo)
            console.log(Object.keys(this.commentInfo).length !== 0)
        })
    },
    methods:{
        imageLoad(){
            // console.log(this.$refs.scroll)
            this.$refs.scroll.refresh()
        }
    }
}
</script>

<style scoped>
    .detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .content{
        height: calc(100% - 44px);
        overflow: hidden;
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
</style>