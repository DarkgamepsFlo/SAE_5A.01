<script setup>
import MainPage from './components/MainPage.vue'
import HeaderContent from './components/HeaderContent.vue'
import FooterContent from './components/FooterContent.vue'
import MenuDeroulantGauche from './components/MenuDeroulantGauche.vue'
import MenuDeroulantDroit from './components/MenuDeroulantDroit.vue'
</script>

<template>
  <HeaderContent @toggle-menu-gauche="toggleMenuGauche" @toggle-menu-droit="toggleMenuDroit" />

  <div class="menu-container">
    <MenuDeroulantGauche v-if="isMenuGaucheVisible" />
    <MenuDeroulantDroit v-if="isMenuDroitVisible" />
  </div>
    
  <MainPage />

  <FooterContent />
</template>

<script>
  export default {
    data() {
      return {
        // message: "",
        isMenuGaucheVisible: false,
        isMenuDroitVisible: false
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
      }
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