import ProfilBoite from "../../components/ProfilBoite/ProfilBoite.profilboite.vue";
import BoiteService from "../../services/BoiteService";
import CollectionService from "../../services/CollectionService";
import RechercheBoiteService from "../../services/RechercheBoiteService";
import RecupererInformationUser from "../../services/RecupererInformationUser";
import Cookies from 'js-cookie';

export default {
    components: {
      ProfilBoite,
    },
  data() {
    return{
      items: [],
      collection_id: 0,
      collection_uti: []    
  }},
  methods: {
    search: async function(event){//Recherche par numéro, nombre de pièces, année
      try{
        const inputValue = event.target.value;
        if (!isNaN(inputValue)) {
          const where = {
            where: parseInt(inputValue), // Convertir en nombre
          };
          
          const response = await RechercheBoiteService.search(where);

          if (response) {
            this.items = response;
          }

        } else {
          // Sinon, effectuez la recherche par nom de boite ou licence.
          const where = {
            where: inputValue.toLowerCase() + "%",
          };

          const response = await RechercheBoiteService.search(where);

          if (response) {
            this.items = response;
          }
        }
      } catch (e) {
        console.error("Il y a une erreur :", e);
      }
      
  },
    async getInformation(){
      const infoUser = await RecupererInformationUser.getToken();
      this.collection_id = infoUser.info.collection_id;
    },
    async getCollection(){

      try {
        const where = {
        where: this.collection_id
        }

        const response = await CollectionService.getCollection(where)

        if (response) {
          this.collection_uti = response;
        }
      } catch (e) {
        console.error("Il y a une erreur :", e);
      }
    },
  },
  async mounted() {
    try {

      const response = await BoiteService.getAllBoite();
      
      if(response) {
        this.items = response;
      }

      await this.getInformation();
      await this.getCollection();

    } catch (e) {
      console.error("Il y a une erreur : ", e);
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
};