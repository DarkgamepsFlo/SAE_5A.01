import axios from "axios"

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
    }
}