import axios from "axios"
import Cookies from 'js-cookie';

export default {
    props: ['id_boite'],
    data(){
        return{
            boite: []
        }
    },
    methods: {},
    mounted(){
        const where = {
          where: this.id_boite
        }
        axios
        .post('http://localhost:3000/boite/ficheboite', where)
        .then(response =>{          
          this.boite = response.data;
          console.log(this.boite);
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
}