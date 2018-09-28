import Vue from 'vue'
import Router from 'vue-router'
// import ImgDisplay from '@/components/ImgDisplay'
// import ItemListElement from '@/components/ItemListElement'
// import AuthPanel from '@/components/AuthPanel'
// import PhotoForm from '@/components/PhotoForm'
import Index from '@/components/Index'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Show from '@/components/Show'
import Edit from '@/components/Edit'
import New from '@/components/New'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/ImgDisplay',
    //   name: 'ImgDisplay',
    //   component: ImgDisplay
    // },
    // {
    //   path: '/ItemListElement',
    //   name: 'ItemListElement',
    //   component: ItemListElement
    // },
    // {
    //   path: '/AuthPanel',
    //   name: 'AuthPanel',
    //   component: AuthPanel
    // },
    // {
    //   path: '/PhotoForm',
    //   name: 'PhotoForm',
    //   component: PhotoForm
    // },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/photos/:id',
      name: 'Show',
      component: Show
    },
    {
      path: '/photos/edit/:id',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/photos/new',
      name: 'New',
      component: New
    }
  ]
})
