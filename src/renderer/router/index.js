import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '微信小程序反编译',
      component: require('@/views/index').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
