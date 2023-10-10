import ProfilBoite from "../../components/ProfilBoite/ProfilBoite.profilboite.vue";
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
    components: {
        ProfilBoite,
    },
  data() {
    return{
    items: [],
    
  }},
  methods: {
    search: function(event){
      if (typeof event.target.value === "number") {
        const where = {
            where: event.target.value,
        }
        axios
          .post('http://localhost:3000/boite/search', where)
          .then(response =>{          
            this.items = response.data;
            console.log(response);
          })
          .catch(error =>{
            console.error("Il y a une erreur :", error);
          });
      } else {
        const where = {
            where: event.target.value.toLowerCase() + "%",
        }
        axios
          .post('http://localhost:3000/boite/search', where)
          .then(response =>{          
            this.items = response.data;
            console.log(response);
          })
          .catch(error =>{
            console.error("Il y a une erreur :", error);
          });
      }
      console.log("test1");
  },},
  mounted() {
    axios
      .post('http://localhost:3000/boite/searchAllBoite')
      .then(response =>{          
        this.items = response.data;
        console.log(this.items);
      })
      .catch(error =>{
        console.error("Il y a une erreur :", error);
      });
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