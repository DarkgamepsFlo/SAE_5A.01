import Cookies from 'js-cookie';

export default {
  data() {
      return {
          isContentVisible: true // Ce sera plus tard le cookie permettant de savoir si l'utilisateur est connecté ou non, pour l'instant je le change manuellement
      };
  },
  computed: {
      // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
      isAlreadyRegistered() {
      // Vérifiez si le cookie "connexion" existe et a la valeur "Y"
      const cookieValue = Cookies.get('connexion');
      if (cookieValue) {
        return true
      }
      return false
    },
  },
  methods: {
  // Cette fonction permet juste de regarder l'ensemble des cookies, elle permet de tester, elle ne va pas rester définitive
    deconnexion() {
      Cookies.remove("connexion");
      // Redirigez l'utilisateur vers la page d'accueil
      window.location.href = "http://127.0.0.1:5173/";
    },      
  }
};
    
  