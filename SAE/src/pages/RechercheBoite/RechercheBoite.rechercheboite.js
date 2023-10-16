import ProfilBoite from "../../components/ProfilBoite/ProfilBoite.profilboite.vue";
import RecupererInformationUser from "../../services/RecupererInformationUser";
import axios from 'axios';
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
    search: function(event){//Recherche par numéro, nombre de pièces, année
      const inputValue = event.target.value;
      if (!isNaN(inputValue)) {
        const where = {
          where: parseInt(inputValue), // Convertir en nombre
        };
        console.log(where);
        axios
          .post('http://localhost:3000/boite/search', where)
          .then(response => {
            this.items = response.data;
            console.log(response);
          })
          .catch(error => {
            console.error("Il y a une erreur :", error);
          });
      } else {
        // Sinon, effectuez la recherche par nom de boite ou licence.
        const where = {
          where: inputValue.toLowerCase() + "%",
        };
        axios
          .post('http://localhost:3000/boite/search', where)
          .then(response => {
            this.items = response.data;
            console.log(response);
          })
          .catch(error => {
            console.error("Il y a une erreur :", error);
          });
      }
  },
    async getInformation(){
      const infoUser = await RecupererInformationUser.getToken();
      this.collection_id = infoUser.info.collection_id;
    },
    async getCollection(){
      const where = {
        where: this.collection_id
      }
      console.log(where.where);
      axios
      .post('http://localhost:3000/users/collection', where)
      .then(response =>{
        this.collection_uti = response.data;
        console.log(this.collection_uti);
      })
      .catch(error =>{
        console.error("Il y a une erreur :", error);
      });
    },
  },
  async mounted() {
    axios
      .post('http://localhost:3000/boite/searchAllBoite')
      .then(response =>{          
        this.items = response.data;
        console.log(this.items);
      })
      .catch(error =>{
        console.error("Il y a une erreur :", error);
      });
      await this.getInformation();
      await this.getCollection();
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