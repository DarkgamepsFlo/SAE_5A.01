import { createRouter, createWebHistory } from 'vue-router'

import HelloWorld from '../components/HelloWorld.vue'
import About from '../components/About.vue'
import Error from '../components/Error.vue'
import FirstPage from '../components/FirstPage.vue'
import Inscription from '../components/Inscription.vue'
import Connexion from '../components/Connexion.vue'
import Password from '../components/Password.vue'
import Politique from '../components/Politique.vue'
import Contact from '../components/Contact.vue'
import SearchUser from '../components/SearchUser.vue'
import SearchSet from '../components/SearchSet.vue'
import Collection from '../components/Collection.vue'
import Profil from '../components/Profil.vue'
import WichList from '../components/WichList.vue'


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
      path: '/rechercheUser',
      component: SearchUser
    },
    {
      path: '/rechercheLego',
      component: SearchSet
    },
    {
      path: '/contact',
      component: Contact
    },
    {
      path: '/collection',
      component: Collection
    },
    {
      path: '/wichlist',
      component: WichList
    },
    {
      path: '/profil',
      component: Profil
    },
    {
      path: '/:catchAll(.*)', // Cette route attrape toutes les routes inexistantes
      component: Error
    },
  ]
})

export default router