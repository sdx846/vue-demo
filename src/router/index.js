import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', redirect: '/login'
    },
    {
      path: '/login', name: '登录', component: () => import('@/components/login/login')
    },
    {
      path: '/home',
      name: '首页',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('@/components/home/home'),
      children: [
        {
          path: '',
          name: '其他',
          meta: {
            requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: () => import('@/components/other'),
        },
        {
          path: 'systemManage',
          name: '系统管理',
          meta: {
            requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: () => import('@/components/systemManage'),
          children: [
            {path: 'users', name: '管理1', component: () => import('@/components/systemManage/system01.vue')},
            {path: 'role', name: '管理2', component: () => import('@/components/systemManage/system02.vue')}
          ]
        },
        {
          path: 'other',
          name: '其他',
          meta: {
            requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
          },
          component: () => import('@/components/other'),
          children: [
            {path: 'cssAnimate', name: 'css动画', component: () => import('@/components/other/cssAnimate')},
          ]
        },
      ]
    },
  ]
})
