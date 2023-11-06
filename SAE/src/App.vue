<script setup>
import MainPage from './pages/MainPage/MainPage.manepage.vue'
import HeaderContent from './components/HeaderContent/HeaderContent.headercontent.vue'
import FooterContent from './components/FooterContent/FooterContent.footercontent.vue'
import MenuDeroulantGauche from './components/MenuGauche/MenuGauche.menugauche.vue'
import MenuDeroulantDroit from './components/MenuDroit/MenuDroit.menudroit.vue'
import Banniere from './components/Banniere/Banniere.banniere.vue'

// import MainPage from './components/MainPage.vue'
// import HeaderContent from './components/HeaderContent.vue'
// import FooterContent from './components/FooterContent.vue'
// import MenuDeroulantGauche from './components/MenuDeroulantGauche.vue'
// import MenuDeroulantDroit from './components/MenuDeroulantDroit.vue'
</script>

<template>
  <HeaderContent @toggle-menu-gauche="toggleMenuGauche" @toggle-menu-droit="toggleMenuDroit" />

  <!-- Cette partie permet uniquement de lister l'ensemble des cookies -->
  <!-- <button @click="listAllCookies">Lister tous les cookies</button>
    <div v-if="cookieList.length">
      <h2>Liste de tous les cookies :</h2>
      <ul>
        <li v-for="cookie in cookieList" :key="cookie.name">
          <strong>{{ cookie.name }}:</strong> {{ cookie.value }}
          <button @click="deleteCookie(cookie.name)">Supprimer</button>
        </li>
      </ul>
    </div> -->

  <div class="menu-container">
    <MenuDeroulantGauche v-if="isMenuGaucheVisible" />
    <MenuDeroulantDroit v-if="isMenuDroitVisible" />
  </div>
    
  <MainPage />

  <FooterContent />
  <Banniere />
</template>

<script>
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      isMenuGaucheVisible: false,
      isMenuDroitVisible: false,
      cookieList: [],
    };
  },
  methods: {
      // updateMessage(newMessage) {
      //   // Mettez à jour la propriété message avec le nouveau message
      //   this.message = newMessage;
      // },
    toggleMenuGauche() {
        // Inversez la valeur de isMenuVisible pour afficher ou masquer MenuDeroulant
        this.isMenuGaucheVisible = !this.isMenuGaucheVisible;
    },
    toggleMenuDroit() {
        // Inversez la valeur de isMenuVisible pour afficher ou masquer MenuDeroulant
        this.isMenuDroitVisible = !this.isMenuDroitVisible;
    },
      // Cette fonction permet juste de regarder l'ensemble des cookies, elle permet de tester, elle ne va pas rester définitive
    listAllCookies() {
        // Réinitialiser la liste des cookies
        this.cookieList = [];

        // Récupérer la liste de tous les cookies présents
        const allCookies = Cookies.get();
        for (const cookieName in allCookies) {
          if (Object.prototype.hasOwnProperty.call(allCookies, cookieName)) {
            const cookieValue = allCookies[cookieName];
            // Ajouter le nom et la valeur du cookie à la liste cookieList si nécessaire
            this.cookieList.push({ name: cookieName, value: cookieValue });
          }
        }
    },
    deleteCookie(cookieName) {
      // Supprimer le cookie spécifique par son nom
      Cookies.remove(cookieName);
      // Mettre à jour la liste des cookies après la suppression
      this.listAllCookies();
    },
  }
};

</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.menu-container {
  display: flex;
}

/* Styliser les menus déroulants individuellement si nécessaire */
.menu-container > * {
  margin-right: 10px; /* Espace entre les menus déroulants */
}

/* Styliser les menus déroulants individuellement si nécessaire */


/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>