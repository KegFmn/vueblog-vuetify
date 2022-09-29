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
        meta: {
          title: 'Special Blog'
        }
      },
      {
        path: '/type/:typeId',
        name: 'Type',
        component: () => import('@/views/Blogs.vue'),
        meta: {
          title: 'Special Blog'
        }
      },
      {
        path: '/search/:keyword',
        name: 'Search',
        component: () => import('@/views/BlogSearch.vue'),
        meta: {
          title: 'Search Blog'
        }
      },
      {
        path: '/blog/add',
        name: 'BlogAdd',
        component: () => import('@/views/BlogEdit.vue'),
        meta: {
          //是否需要权限
          requireAuth: true,
          title: 'Add Blog'
        }
      },
      {
        path: '/blog/:blogId/edit',
        name: 'BlogEdit',
        component: () => import('@/views/BlogEdit.vue'),
        meta: {//是否需要权限
          requireAuth: true,
          title: 'Edit Blog'
        }
      },
      {
        path: '/blog/:blogId',
        name: 'BlogDetail',
        component: () => import('@/views/BlogDetail.vue'),
        meta: {
          title: 'Blog Detail'
        }
      },
      {
        path: '/blogGuest',
        name: 'BlogGuest',
        component: () => import('@/views/BlogGuest.vue'),
        meta: {
          title: 'Blog Guest'
        }
      },
      {
        path: '/blogLink',
        name: 'BlogLink',
        component: () => import('@/views/BlogLink.vue'),
        meta: {
          title: 'Blog Link'
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: 'Login Blog'
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
