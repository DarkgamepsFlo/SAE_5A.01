import ProfilUtilisateur from '../../components/ProfilUtilisateur/ProfilUtilisateur.profilutilisateur.vue';
import axios from 'axios';

export default {
  components: {
    ProfilUtilisateur,
  },
  methods: {
    search: function(event){
      const where = {
        where: event.target.value + "%",
      }
      console.log("test1");
      axios
        .post('http://localhost:3000/users/findUser', where)
        .then(response =>{
          
          console.log(response);

          if(response.data.success === true){
            
            console.log("qfdfjhbgdfkjgbdhkh");
          }
        })
        .catch(error => {
          console.error("Il y a une erreur :", error);
        });
  },
}}

