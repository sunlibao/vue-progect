import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import login from '../components/web/login/login.vue'
import myIndex from '../components/MyIndex.vue'
import Home from '../components/web/home/Home.vue'
import Error404 from '../components/web/error/Error404.vue'
import User from  '../components/web/home/system/user/User.vue'
import Menu from  '../components/web/home/system/menu/Menu.vue'
import Role from  '../components/web/home/system/role/Role.vue'
import Permission from  '../components/web/home/system/permission/Permission2.vue'
import Kpi from  '../components/web/home/epm/kpi/Kpi.vue'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component:login
    },
    {
      path: '/home',
      name: 'myIndex',
      component:myIndex,
      children:[
        {
          path: '',
          component:Home
        },{
          path:'system/user',
          component:User
        },{
          path:'system/menu',
          component:Menu
        },{
          path:'system/role',
          component:Role
        },{
          path:'system/permission',
          component:Permission
        },{
          path:'epm/kpi',
          component:Kpi
        }
      ]

    },
    { path: '*', redirect: '/404', hidden: true },
    { path: '/404',component:Error404, hidden: true }
  ]
})



