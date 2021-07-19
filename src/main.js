/*
 * @Author: Yokee
 * @Date: 2021-07-13 17:00:21
 * @LastEditTime: 2021-07-14 11:06:09
 * @FilePath: \h5video\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'video.js/dist/video-js.css' // 引入样式


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
