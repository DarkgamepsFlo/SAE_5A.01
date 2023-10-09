import axios from "axios";

export default {
  props: ['id_uti'],
  data(){
    return{
      user: [],
      collection: [],
      ifPublic: false,
    }
  },
  methods: {},
  mounted(){
    //Première requête pour récupérer les données lié à l'utilisateur
    const where = {
      where: this.id_uti
    }
    axios
    .post('http://localhost:3000/users/profiluser', where)
    .then(response =>{          
      this.user = response.data;
      console.log(this.user);
      this.ifPublic = this.user.some(item => item.public);
    })
    .catch(error =>{
      console.error("Il y a une erreur :", error);
    });

    //Deuxième requête pour récupérer lié à sa collection
    axios
    .post('http://localhost:3000/users/profilcollection', where)
    .then(response =>{          
      this.collection = response.data;
      console.log(this.collection);
    })
    .catch(error =>{
      console.error("Il y a une erreur :", error);
    });
  }
}