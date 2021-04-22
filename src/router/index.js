import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  // base:'/h5/test/',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: '登录',
      component: () => import('@/components/login/login')
    },
    {
      path: '/home',
      name: '首页',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('@/components/home/home'),
      children: [
        {
          path: '',
          name: '其他',
          meta: {
            requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
          },
          component: () => import('@/components/other')
        },
        {
          path: 'systemManage',
          name: '系统管理',
          meta: {
            requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
          },
          component: () => import('@/components/systemManage'),
          children: [
            {
              path: 'users',
              name: '管理1',
              component: () => import('@/components/systemManage/system01.vue')
            },
            {
              path: 'role',
              name: '管理2',
              component: () => import('@/components/systemManage/system02.vue')
            }
          ]
        },
        {
          path: 'other',
          name: '其他',
          meta: {
            requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
          },
          component: () => import('@/components/other'),
          children: [
            {
              path: 'cssAnimate',
              name: 'css动画',
              component: () => import('@/components/other/cssAnimate')
            },
            {
              path: 'video1',
              name: 'vue-video-player01',
              component: () => import('@/components/other/vue-video1')
            },
            {
              path: 'video2',
              name: 'vue-video-player02',
              component: () => import('@/components/other/vue-video2')
            },
            {
              path: 'video3',
              name: 'vue-video-player03',
              component: () => import('@/components/other/vue-video3')
            },
            {
              path: 'video4',
              name: 'vue-video-player04',
              component: () => import('@/components/other/vue-video4')
            },
            {
              path: 'video5',
              name: 'vue-video-player05',
              component: () => import('@/components/other/vue-video5')
            }
          ]
        },
        {
          path: 'production',
          name: '产品',
          meta: {
            requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
          },
          component: () => import('@/components/production'),
          children: [
            {
              path: 'echart1',
              name: 'echart01',
              component: () => import('@/components/production/echart01.vue')
            },
            {
              path: 'echart2',
              name: 'echart02-地图',
              component: () =>
                import('@/components/production/echart02-map.vue')
            },
            {
              path: 'echart3',
              name: 'echart03-地图',
              component: () =>
                import('@/components/production/echart03-map.vue')
            },
            {
              path: 'echart4',
              name: 'echart04-百度地图',
              component: () =>
                import('@/components/production/echart04-baiduMap.vue')
            },
            {
              path: 'echart5',
              name: 'echart05-百度地图2',
              component: () =>
                import('@/components/production/echart05-baiduMap2.vue')
            }
          ]
        }
      ]
    }
  ]
});
