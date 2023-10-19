import ProfilBoite from "../ProfilBoite/ProfilBoite.profilboite.vue";
import CollectionService from "../../services/CollectionService";

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
        async deleteBoite(id){//Récupère l'id de la ProfilBoite grâce à l'event émis par cette dernière

            const donnee = {
                boite: id, 
                id_collec: this.collection_id
            }

            const result = await CollectionService.deleteBoite(donnee)

            if (result) {
                this.getCollection();
            }
        },
        async getCollection(){
            const where = {
                where: this.collection_id
            }

            const response = await CollectionService.getCollection(where);

            if (response){
                this.collection = response;
            }
        },
    },
    created: async function(){
        await this.getCollection();
    }
}