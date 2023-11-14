import Cookies from 'js-cookie';

export default {
  computed: {
      // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
      isAlreadyRegistered() {
      const cookieValue = Cookies.get('connexion');
      if (cookieValue) {
        return true
      }
      return false
    },
  },
  methods: {
  // Cette fonction permet de déconnecter un utilisateur
    deconnexion() {
      Cookies.remove("connexion");
      // Redirigez l'utilisateur vers la page d'accueil
      window.location.href = "http://127.0.0.1:5173/";
    },      
  }
};
    
  