import { createRouter, createWebHistory } from 'vue-router'

// import Accueil from '../components/HelloWorld.vue'
// import Error from '../components/Error.vue'
// import About from '../components/About.vue'
// import FirstPage from '../components/FirstPage.vue'
// import Inscription from '../components/Inscription.vue'
// import Connexion from '../components/Connexion.vue'
// import Password from '../components/Password.vue'
// import Politique from '../components/Politique.vue'
// import Contact from '../components/Contact.vue'
// import RechercherUtilisateur from '../components/RechercheUtilisateur.vue'
// import RechercheBoite from '../components/RechercheBoite.vue'
// import Collection from '../components/Collection.vue'
// import Profil from '../components/Profil.vue'
// import WichList from '../components/WichList.vue'
// import AjoutBoite from '../components/AjoutBoite.vue'

import Accueil from '../pages/Accueil/Accueil.accueil.vue'
import MentionLegale from '../pages/MentionLegale/MentionLegale.mentionlegale.vue'
import Error from "../pages/Error/Error.error.vue"
import FirstPage from '../pages/FirstPage/FirstPage.firstpage.vue'
import Inscription from '../pages/Inscription/Inscription.inscription.vue'
import Connexion from '../pages/Connexion/Connexion.connexion.vue'
import Password from '../pages/Password/Password.password.vue'
import Politique from '../pages/Politique/Politique.politique.vue'
import Cookies from '../pages/Cookies/Cookies.cookies.vue'
import Contact from '../pages/Contact/Contact.contact.vue'
import RechercherUtilisateur from '../pages/RechercheUtilisateur/RechercheUtilisateur.rechercheutilisateur.vue'
import RechercheBoite from '../pages/RechercheBoite/RechercheBoite.rechercheboite.vue'
import Profil from '../pages/Profil/Profil.profil.vue'
import MaWishlist from '../pages/MaWishlist/MaWishlist.mawishlist.vue'
import AjoutBoite from '../components/AjoutBoite/AjoutBoite.ajoutboite.vue'
import ProfilPublic from '../pages/ProfilPublic/ProfilPublic.profilpublic.vue'
import Boite from '../pages/Boite/Boite.boite.vue'
import MaCollection from '../pages/MaCollection/MaCollection.macollection.vue'
import ModifBoite from '../components/ModifBoite/ModifBoite.modifboite.vue'

import TestCookie from '../components/TestCookie.vue'
import TestBDD from '../components/TestBDD.vue'
import TestUploadFile from '../components/TestUploadFile.vue'

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
    {
      path: '/bddTest',
      component: TestBDD
    },
    {
      path: '/fileTest',
      component: TestUploadFile
    }
  ]
})

export default router