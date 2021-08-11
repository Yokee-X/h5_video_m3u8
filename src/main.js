/*
 * @Author: Yokee
 * @Date: 2021-07-13 17:00:21
 * @LastEditTime: 2021-08-11 17:52:15
 * @FilePath: \h5video\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'amfe-flexible/index.js';

import {Input,Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'


// import 'video.js/dist/video-js.css' // 引入样式
Vue.prototype.$message = Message;
Vue.use(Input);
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
