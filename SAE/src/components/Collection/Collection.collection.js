import ProfilBoite from "../ProfilBoite/ProfilBoite.profilboite.vue";

export default {
    name: "Collection",
    components: {
        ProfilBoite,
    },
    props: {
        collection: Array,
    },
    data(){
        return{
            boitesSelection: []
        }
    },
    methods: {
        deleteBoite(id){//Récupère l'id de la ProfilBoite grâce à l'event émis par cette dernière
            //Si l'id n'est pas déjà dans le tableau pour sélectionner les boîtes à supprimer, il l'ajoute sinon il la retire
            if(this.boitesSelection.includes(id)){
                var index = this.boitesSelection.indexOf(id);
                this.boitesSelection.splice(index, 1);
            } else{
                this.boitesSelection.push(id);
            }
            console.log(this.boitesSelection);
        }
    }
}