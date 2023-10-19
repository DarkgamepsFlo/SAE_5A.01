import Cookies from 'js-cookie';
import BoiteService from "../../services/BoiteService";

export default {
    props: ['id_boite'],
    data(){
        return{
            boite: []
        }
    },
    methods: {},
    async mounted(){
      try {
        const where = {
          where: this.id_boite
        }

        const response = await BoiteService.getFicheBoite(where)

        if (response) {
          this.boite = response;
        }
      } catch (e) {
        console.error("Il y a une erreur :", e);
      }
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
      }
    },
}