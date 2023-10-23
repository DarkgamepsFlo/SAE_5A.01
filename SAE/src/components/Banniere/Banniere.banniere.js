import Cookies from 'js-cookie';
  
  export default {
    data() {
      return {
        isBannerVisible: true,
      };
    },
    created() {
      // Vérifiez la présence du cookie lors de la création du composant
      const cookieValue = Cookies.get('acceptCookie');
      if (cookieValue !== undefined) {
        this.isBannerVisible = false;
      }
    },
    computed: {
      isNotAcceptedRefused() {
        return this.isBannerVisible;
      },
    },
    methods: {
      accepterCookies() {
        Cookies.set("acceptCookie", true, { expires: 1/24 });
        this.isBannerVisible = false; // Mettez à jour isBannerVisible lorsque le cookie est accepté
      },
      refuserCookies() {
        Cookies.set("acceptCookie", false, { expires: 1/24 });
        this.isBannerVisible = false; // Mettez à jour isBannerVisible lorsque le cookie est accepté
      },
      allerPolitique(){
        window.location.href = "http://127.0.0.1:5173/politique";
      },
      gererCookies(){
        window.location.href = "http://127.0.0.1:5173/cookies";
      },
    },
  };