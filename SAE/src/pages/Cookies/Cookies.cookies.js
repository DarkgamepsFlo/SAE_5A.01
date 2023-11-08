import Cookies from 'js-cookie';

export default {
  data() {
    return {
      acceptCookies: false, // Initialisation à l'état non cochée
    };
  },
  created() {
    // Vérifiez la présence du cookie lors de la création du composant
    const cookieValue = Cookies.get('acceptCookie');
    if (cookieValue !== undefined) {
      this.acceptCookies = cookieValue;
    }
  },
  methods: {
    checkAcceptCookies() {
      // La valeur de acceptCookies est maintenant mise à jour en fonction de l'état du checkbox
      if (this.acceptCookies){
        this.acceptCookies = false;
      } else {
        this.acceptCookies = true;
      }
      console.log("Accept Cookies:", this.acceptCookies);
      if (this.acceptCookies){
        Cookies.set("acceptCookie", true, { expires: 1/24 });
      } else {
        Cookies.set("acceptCookie", false, { expires: 1/24 });
      }
      // Vous pouvez maintenant utiliser this.acceptCookies dans votre code pour vérifier si la case est cochée ou non.
    },
    pageContact(){
      window.location.href = "http://127.0.0.1:5173/contact";
    },
    pageConfid(){
      window.location.href = "http://127.0.0.1:5173/politique";
    },
  },
};
