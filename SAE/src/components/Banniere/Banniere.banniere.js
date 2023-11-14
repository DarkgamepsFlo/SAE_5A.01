import Cookies from 'js-cookie';
  
export default {
  data() {
    return {
      isBannerVisible: true, // Présicer si la bannière est présente ou non
    };
  },
  created() {
    // On va vérifier si les cookies sont déjà acceptés/refusé ou non, si oui, pas besoin d'afficher la bannière
    const cookieValue = Cookies.get('acceptCookie');
    if (cookieValue !== undefined) {
      this.isBannerVisible = false;
    }
  },
  computed: {
    // On va afficher la bannière ou non
    isNotAcceptedRefused() {
      return this.isBannerVisible;
    },
  },
  methods: {
    // Permet d'accepter les cookies
    accepterCookies() {
      Cookies.set("acceptCookie", true, { expires: 1/24 });
      this.isBannerVisible = false;
    },
    // Permet de refuser les cookies
    refuserCookies() {
      Cookies.set("acceptCookie", false, { expires: 1/24 });
      this.isBannerVisible = false;
    },
    // Permet d'aller sur la page politique de confidentialité 
    allerPolitique(){
      window.location.href = "http://127.0.0.1:5173/politique";
    },
    // Permet d'aller sur la page politique des cookies
    gererCookies(){
      window.location.href = "http://127.0.0.1:5173/cookies";
    },
  },
};