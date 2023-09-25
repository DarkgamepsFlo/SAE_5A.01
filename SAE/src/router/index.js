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
import RechercherUtilisateur from '../components/RechercheUtilisateur.vue'
import RechercheBoite from '../components/RechercheBoite.vue'
import Collection from '../components/Collection.vue'
import Profil from '../components/Profil.vue'
import WichList from '../components/WichList.vue'
import AjoutBoite from '../components/AjoutBoite.vue'

import TestCookie from '../components/TestCookie.vue'
import TestBDD from '../components/TestBDD.vue'

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
      component: RechercherUtilisateur
    },
    {
      path: '/rechercheLego',
      component: RechercheBoite
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
      path: '/ajoutBoite',
      component: AjoutBoite
    },
    {
      path: '/:catchAll(.*)', // Cette route attrape toutes les routes inexistantes
      component: Error
    },
    

    // page de test
    {
      path: '/cookie',
      component: TestCookie
    },
    {
      path: '/bddTest',
      component: TestBDD
    },
  ]
})

export default router