import ProfilUtilisateur from '../ProfilUtilisateur/ProfilUtilisateur.profilutilisateur.vue';
import axios from 'axios';

export default {
  components: {
    ProfilUtilisateur,
  },
  methods: {
    search: function(event){
      axios
        .post('/findUser', event.target.value)
        .then(response =>{
          if(response.data.success === true){
            console.log(response);
          }
        })
        .catch(error => {
          console.error("Il y a une erreur :", error);
        });
  },
}}
