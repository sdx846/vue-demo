import Vue from 'vue'
import Vuex from 'vuex'
// Table, TableColumn,
// import { Button, Input, Pagination,Message, MessageBox } from 'element-ui';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VideoPlayer from 'vue-video-player'
// require('vue-video-player/node_modules/video.js/dist/video-js.css')
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')


import App from './App'
import router from './router'
// import store from './store/index'
import store from './store/store'
import './styles/index.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VideoPlayer);
// Vue.use(Button)
// Vue.use(Input)
// Vue.use(Pagination)
// Message.install = function (Vue, options) {
//   Vue.prototype.$message = Message
// }
// Vue.use(Message)
// Vue.prototype.$alert = MessageBox.alert
// Vue.use(Vuex);

// import NProgress from 'nprogress' // 进度条
// import 'nprogress/nprogress.css' //这个样式必须引入
// NProgress.inc(0.2);
// NProgress.configure({ easing: 'ease', speed: 800, showSpinner: false });

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (localStorage.getItem("user_token")) {  // 通过localStorage获取当前的token是否存在
      // NProgress.start();
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }else {
    // NProgress.start();
    next();
  }
});

router.afterEach(() => {
  // NProgress.done()
});

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});

// var res = Vue.compile('<div><span>{{ msg }}</span></div>')
// new Vue({
//   el: '#app',
//   data: {
//     msg: 'hello'
//   },
//   ss:'sss',
//   created() {
//     console.log(this.$options.ss);//获取自定义的属性
//   },
//   render: res.render,
//   staticRenderFns: res.staticRenderFns
// })

