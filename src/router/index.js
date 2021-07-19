/*
 * @Author: Yokee
 * @Date: 2021-07-14 10:13:19
 * @LastEditTime: 2021-07-14 10:14:59
 * @FilePath: \h5video\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
]

const router = new VueRouter({
  routes
})

export default router