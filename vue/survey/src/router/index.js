import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/survey/:id'
    ,name: 'survey'
    ,component: () => import('../views/Survey')
  },
  {
    path: '/adm'
    ,name: 'adm'
    ,component: () => import('../views/Adm')
  },
  {
    path: '/surveylist'
    ,name: 'surveylist'
    ,component: () => import('../views/SurveyList')
    ,children: [
      {
         path: '/surveylist/surveyedit/:id'
        ,name: 'surveyedit'
        ,component: () => import('../views/SurveyEdit')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass : 'active',
  routes
})

export default router
