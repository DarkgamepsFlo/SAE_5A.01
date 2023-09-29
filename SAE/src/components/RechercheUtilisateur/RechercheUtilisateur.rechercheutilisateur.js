import ProfilUtilisateur from '../ProfilUtilisateur/ProfilUtilisateur.profilutilisateur.vue';
import axios from 'axios';

export default {
  components: {
    ProfilUtilisateur,
  },
  methods: {
    search: function(event){
      const where = {
        where: "Xelven",
      }
      console.log("test1");
      axios
        .post('http://localhost:3000/users/findUser', where)
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
