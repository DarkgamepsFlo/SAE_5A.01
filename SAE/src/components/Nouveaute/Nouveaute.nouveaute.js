import axios from "axios"

export default {
  data(){
    return{
      caroussel: []
    }
  },
  methods: {},
  mounted(){
    axios
      .post('http://localhost:3000/boite/nouveaute')
      .then(response =>{          
        this.caroussel = response.data;
        console.log(response);
      })
      .catch(error =>{
        console.error("Il y a une erreur :", error);
      });
  }
};