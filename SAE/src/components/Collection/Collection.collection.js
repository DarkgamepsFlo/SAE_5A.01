import ProfilBoite from "../ProfilBoite/ProfilBoite.profilboite.vue";
import axios from "axios";

export default {
    name: "Collection",
    components: {
        ProfilBoite,
    },
    props: {
        collection_id: Number,
    },
    data(){
        return{
            collection: []
        }
    },
    methods: {
        deleteBoite(id){//Récupère l'id de la ProfilBoite grâce à l'event émis par cette dernière
            console.log(id);
            console.log(this.collection_id);
            axios
            .post('http://localhost:3000/boite/delete', {boite: id, id_collec: this.collection_id})
            .then(response =>{
                this.getCollection();
            })
            .catch(error =>{
              console.error("Il y a une erreur :", error);
            });
        },
        async getCollection(){
            const where = {
                where: this.collection_id
            }
            console.log(where.where);
            axios
            .post('http://localhost:3000/users/collection', where)
            .then(response =>{
              this.collection = response.data;
              console.log(this.collection);
            })
            .catch(error =>{
              console.error("Il y a une erreur :", error);
            });
        },
    },
    created: async function(){
        await this.getCollection();
    }
}