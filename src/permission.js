import router from './router'

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'Special Blog'
  }
  // 判断该路由是否需要登录权限
  if (to.matched.some(record => record.meta.requireAuth)) { 
    const token = localStorage.getItem("token")
    // 判断当前的token是否存在 ； 登录存入的token
    if (token) { 
      if (to.path !== '/login') {
        next()
      }
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})