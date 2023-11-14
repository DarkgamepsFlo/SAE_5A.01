import ProfilBoite from "../ProfilBoite/ProfilBoite.profilboite.vue";
import CollectionService from "../../services/CollectionService";

export default {
    name: "Collection",
    components: {
        ProfilBoite,
    },
    props: {
        collection_id: Number, // id de la collection (correspondant à celui de l'utilisateur)
    },
    data(){
        return{
            collection: [] // Collection de l'utilisateur
        }
    },
    methods: {
        // Permet de supprimer une boite de la collection
        async deleteBoite(id){ //Récupère l'id de la ProfilBoite grâce à l'event émis par cette dernière

            const donnee = {
                boite: id, 
                id_collec: this.collection_id
            }

            const result = await CollectionService.deleteBoite(donnee)

            if (result) {
                this.getCollection();
            }
        },
        // Permet de récupérer l'ensemble de la collection d'un utilisateur
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
    // Permet de récupérer la collection dès qu'on arrive sur la page concernant la collection
    created: async function(){
        await this.getCollection();
    }
}