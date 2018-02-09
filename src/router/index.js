import Vue from 'vue'
import Router from 'vue-router'
import AdminLogin from '@/components/admin/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: resolve => require(['../components/layout/Home.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../components/dashboard/Index.vue'], resolve)
        },
        {
          path: '/dashboardindex',
          component: resolve => require(['../components/dashboard/Index.vue'], resolve)
        },
        {
          path: '/workplace',
          component: resolve => require(['../components/dashboard/Workplace.vue'], resolve)
        },
        {
          path: '/listindex',
          component: resolve => require(['../components/list/Index.vue'], resolve)
        },
        {
          path: '/baseform',
          component: resolve => require(['../components/form/Base.vue'], resolve)
        },
        {
          path: '/stepform',
          component: resolve => require(['../components/form/Step.vue'], resolve)
        },
        {
          path: '/newslist',
          component: resolve => require(['../components/news/List.vue'], resolve)
        },
        {
          path: '/newsadd',
          component: resolve => require(['../components/news/Add.vue'], resolve)
        },
        {
          path: '/goodslist',
          component: resolve => require(['../components/goods/List.vue'], resolve)
        },
        {
          path: '/goodsadd',
          component: resolve => require(['../components/goods/Add.vue'], resolve)
        }
      ]
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin
    }

  ]
})
