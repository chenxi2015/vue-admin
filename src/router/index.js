import Vue from 'vue'
import Router from 'vue-router'
// import Sidenav from '@/components/layout/Sidenav'
// import Home from '@/components/layout/Home'
// import SchoolIndex from '@/components/school/Index'
// import DashboardIndex from '@/components/dashboard/Index'
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
          path: '/schoolindex',
          component: resolve => require(['../components/school/Index.vue'], resolve)
        },
        {
          path: '/schoolshifts',
          component: resolve => require(['../components/school/Shifts.vue'], resolve)
        },
        {
          path: '/coachindex',
          component: resolve => require(['../components/coach/Index.vue'], resolve)
        },
        {
          path: '/coachtimeset',
          component: resolve => require(['../components/coach/Timeset.vue'], resolve)
        }
      ]
    },
    // {
    //   path: '/dashboard/index',
    //   name: 'DashboardIndex',
    //   component: DashboardIndex
    // },
    // {
    //   path: '/school/index',
    //   name: 'SchoolIndex',
    //   component: SchoolIndex
    // },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin
    }

  ]
})
