import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

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
        if (this.isAlreadyRegistered()){
          Swal.fire({
            title: 'Tu dois être déconnecté pour pouvoir modifier vos choix de cookies. Veux-tu de déconnecter ?',
            icon: 'error',
            showDenyButton: true,
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Oui',
            denyButtonText: `Non`,
            customClass: {
              container: 'custom-sweetalert-container',
              title: 'custom-sweetalert-title',
              content: 'custom-sweetalert-text',
            },
            background: 'var(--color-background)',
          }).then((result) => {
            if (result.isConfirmed) {
              Cookies.remove('acceptCookie');
              this.deconnexion();
            }
            else {
              window.location.href = '../cookies';
            }
          });
        } else {
          this.acceptCookies = false;
        }
      } else {
        this.acceptCookies = true;
      }
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
    // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
      isAlreadyRegistered() {
      // Vérifiez si le cookie "connexion" existe et a la valeur "Y"
      const cookieValue = Cookies.get('connexion');
      if (cookieValue) {
        return true
      }
      return false
    },
    deconnexion() {
      Cookies.remove("connexion");
      // Redirigez l'utilisateur vers la page d'accueil
      window.location.href = "http://127.0.0.1:5173/";
    },  
  },
};
