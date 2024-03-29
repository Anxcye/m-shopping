import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Layout from '@/views/layout'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import Login from '@/views/login'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

const ProDetail = () => import('@/views/proDetail')
const Pay = () => import('@/views/pay')
const MyOrder = () => import('@/views/myOrder')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/searchlist',
      component: SearchList
    },
    {
      path: '/prodetail/:id',
      component: ProDetail
    },
    {
      path: '/pay',
      component: Pay
    },
    {
      path: '/myorder',
      component: MyOrder
    }
  ]
})

const authUrl = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  const token = store.state.user.userInfo.token
  if (!authUrl.includes(to.path)) {
    next()
    return
  }

  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
