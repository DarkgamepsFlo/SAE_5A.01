import ProfilUtilisateur from '../../components/ProfilUtilisateur/ProfilUtilisateur.profilutilisateur.vue';
import axios from 'axios';

export default {
  components: {
    ProfilUtilisateur,
  },
  data() {
    return{
    items: [],
    inputValue: '',
    
  }},
  methods: {
    search: function(event){
      this.inputValue = event.target.value;
      const where = {
        where: event.target.value + "%",
      }
      console.log("test1");
      axios
        .post('http://localhost:3000/users/findUser', where)
        .then(response =>{          
          this.items = response.data;
          console.log(response);
        })
        .catch(error =>{
          console.error("Il y a une erreur :", error);
        });
  },},
  mounted() {
    axios
      .post('http://localhost:3000/users/searchAllUsers')
      .then(response =>{          
        this.items = response.data;
        console.log(this.items);
      })
      .catch(error =>{
        console.error("Il y a une erreur :", error);
      });
   }
}

