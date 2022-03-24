import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/layout/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index, 
    redirect: '/blogs',
    children: [
      {
        path: '/blogs',
        name: 'Blogs',
        component: () => import('@/views/Blogs.vue'),
      },

      {
        path: '/type/:typeId',
        name: 'Type',
        component: () => import('@/views/Blogs.vue'),
      },

      {
        path: '/blog/add',
        name: 'BlogAdd',
        component: () => import('@/views/BlogEdit.vue'),
        meta: {//是否需要权限
          requireAuth: true
        }
      },

      {
        path: '/blog/:blogId',
        name: 'BlogDetail',
        component: () => import('@/views/BlogDetail.vue')
      },
      
      {
        path: '/blog/:blogId/edit',
        name: 'BlogEdit',
        component: () => import('@/views/BlogEdit.vue'),
        meta: {//是否需要权限
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
