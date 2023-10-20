import CollectionService from "../../services/CollectionService";

export default {
    props: {
        boite: Object, //Objet qui contient les données de la boite
        search: Boolean, //Si true = Utilisé dans RechercheBoite, false ailleurs
        inCollec: Boolean, //Si true = dans la collection de l'utilisateur, false non
        collection_id: Number, //Id de la collection de l'utilisateur
        collection_uti: Object //Objet qui contient la collection de l'utilisateur
    },
    data(){
        return{
            value: 0,
        }
    },
    computed: {
        isBoiteInCollection() {
            //Vérifie si la boite est aussi présente dans la collection de l'utilisateur
            return this.collection_uti.some(boite => boite.id_boite === this.boite.id_boite);
        }
    },
    methods: {
        action(event){
            event.preventDefault();
            const button = event.target;
            const boiteId = button.getAttribute("data-id");
            if(this.search){//Méthode d'action quand le composant est appelé dans RechercheBoite
                if(this.collection_uti.some(boite => boite.id_boite === this.boite.id_boite)){
                    this.$emit('deleteBoite', boiteId);
                } else {
                    this.$emit('addBoite', boiteId);
                }
            } else{//Méthode d'action quand le composant est appelé ailleurs
                this.$emit('deleteBoite', boiteId);
            }
        }
    },
}