import Cookies from 'js-cookie';

export default {
  data() {
    return {
      acceptCookies: false, // Initialisation à l'état non cochée
    };
  },
  methods: {
    checkAcceptCookies() {
      // La valeur de acceptCookies est maintenant mise à jour en fonction de l'état du checkbox
      console.log("Accept Cookies:", this.acceptCookies);
      if (this.acceptCookies){
        Cookies.set("acceptCookie", true, { expires: 1/24 });
      } else {
        Cookies.set("acceptCookie", false, { expires: 1/24 });
      }
      // Vous pouvez maintenant utiliser this.acceptCookies dans votre code pour vérifier si la case est cochée ou non.
    },
  },
};
