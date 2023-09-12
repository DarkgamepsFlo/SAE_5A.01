import { createRouter, createWebHistory } from 'vue-router'

import HelloWorld from '../components/HelloWorld.vue'
import About from '../components/About.vue'
import Error from '../components/Error.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/:catchAll(.*)', // Cette route attrape toutes les routes inexistantes
      component: Error
    },
  ]
})

export default router