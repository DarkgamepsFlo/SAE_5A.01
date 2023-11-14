// import système de route
import { createRouter, createWebHistory } from 'vue-router'

// import l'ensemble des pages
import FirstPage from '../pages/FirstPage/FirstPage.firstpage.vue'
import Accueil from '../pages/Accueil/Accueil.accueil.vue'
import Inscription from '../pages/Inscription/Inscription.inscription.vue'
import Connexion from '../pages/Connexion/Connexion.connexion.vue'
import Password from '../pages/Password/Password.password.vue'
import MentionLegale from '../pages/MentionLegale/MentionLegale.mentionlegale.vue'
import Politique from '../pages/Politique/Politique.politique.vue'
import Cookies from '../pages/Cookies/Cookies.cookies.vue'
import RechercherUtilisateur from '../pages/RechercheUtilisateur/RechercheUtilisateur.rechercheutilisateur.vue'
import Error from "../pages/Error/Error.error.vue"
import Contact from '../pages/Contact/Contact.contact.vue'
import RechercheBoite from '../pages/RechercheBoite/RechercheBoite.rechercheboite.vue'
import Profil from '../pages/Profil/Profil.profil.vue'
import MaWishlist from '../pages/MaWishlist/MaWishlist.mawishlist.vue'
import AjoutBoite from '../pages/AjoutBoite/AjoutBoite.ajoutboite.vue'
import ProfilPublic from '../pages/ProfilPublic/ProfilPublic.profilpublic.vue'
import Boite from '../pages/Boite/Boite.boite.vue'
import MaCollection from '../pages/MaCollection/MaCollection.macollection.vue'
import ModifBoite from '../pages/ModifBoite/ModifBoite.modifboite.vue'

import TestCookie from '../components/TestCookie.vue'

// Permet de gérer l'ensemble des pages du site
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: FirstPage
    },
    {
      path: '/accueil',
      component: Accueil
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
      component: MentionLegale
    },
    {
      path: '/politique',
      component: Politique
    },
    {
      path: '/cookies',
      component: Cookies
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
      component: MaCollection
    },
    {
      path: '/wishlist',
      component: MaWishlist
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
    {
      path: '/user/:id_uti',
      name: 'user',
      component: ProfilPublic,
      props: true
    },
    {
      path: '/boite/:id_boite',
      name: 'boite',
      component: Boite,
      props: true
    },
    {
      path: '/modifboite/:id_boite',
      name: 'modifboite',
      component: ModifBoite,
      props: true
    },
    

    // page de test
    {
      path: '/cookie',
      component: TestCookie
    },
  ]
})

export default router