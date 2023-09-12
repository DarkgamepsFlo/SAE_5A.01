import { createRouter, createWebHistory } from 'vue-router'

import HelloWorld from '../components/HelloWorld.vue'
import About from '../components/About.vue'
import Error from '../components/Error.vue'
import FirstPage from '../components/FirstPage.vue'
import Inscription from '../components/Inscription.vue'
import Connexion from '../components/Connexion.vue'
import Password from '../components/Password.vue'
import Politique from '../components/Politique.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: FirstPage
    },
    {
      path: '/accueil',
      component: HelloWorld
    },
    {
      path: '/inscription',
      component: Inscription
    },
    {
      path: '/connexion',
      component: Connexion
    },
    {
      path: '/mdp',
      component: Password
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/politique',
      component: Politique
    },
    {
      path: '/:catchAll(.*)', // Cette route attrape toutes les routes inexistantes
      component: Error
    },
  ]
})

export default router