
import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Category = () => import('../views/category/Category.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Detail = () => import('../views/detail/Detail.vue')

// 1. 挂载
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path:'/home',
    component:Home,
    // 设置导航栏是否显示
    meta:{
      footShow:true
    }
  },
  {
    path:'/cart',
    component:Cart,
    meta:{
      footShow:true
    }
  },
  {
    path:'/category',
    component:Category,
    meta:{
      footShow:true
    }
  },
  {
    path:'/profile',
    component:Profile,
    meta:{
      footShow:true
    }
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]
const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL
})
export default router