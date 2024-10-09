import Vue from 'vue'
import Router from 'vue-router'

import UserIndex from '@/components/User/index'
import UserEdit from '@/components/User/EditUser'
import UserCreate from '@/components/User/CreateUser'
import UserShow from '@/components/User/ShowUser'
import Login from '@/components/Login'

import CommentIndex from '@/components/Comments/index' 

import lfcIndex from '@/components/lfc/index'
import lfcCreate from '@/components/lfc/Createlfc'
import lfcShow from '@/components/lfc/Showlfc'
import lfcEdit from '@/components/lfc/Editlfc'

import Upload from '@/components/Util/Upload'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/lfc',
      name: 'lfc',
      component: lfcIndex
    },
    {
      path: '/lfc/create',
      name: 'lfc-create',
      component: lfcCreate
    },
    {
      path: '/lfc/edit/:lfcId',
      name: 'lfc-edit',
      component: lfcEdit
    },
    {
      path: '/lfc/:lfcId',
      name: 'lfc',
      component: lfcShow
    },
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    
  ]
})
