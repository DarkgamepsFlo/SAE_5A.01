import Cookies from 'js-cookie';

export default {
    props: {
        boite: Object, //Objet qui contient les données de la boite
        presentation: Boolean, //Si true = Utilisé sur la page d'accueil, false ailleurs
        search: Boolean, //Si true = Utilisé dans RechercheBoite, false ailleurs
        collection_uti: Object, //Objet qui contient la collection de l'utilisateur
        wishlist_uti: Object //Objet qui contient la wishlist de l'utilisateur
    },
    data(){
        return{
            value: 0,
        }
    },
    computed: {
        isBoiteInCollection(){
            //Vérifie si la boite est présente dans la collection de l'utilisateur
            return this.collection_uti.some(boite => boite.id_boite === this.boite.id_boite);
        },
        isBoiteInWishlist(){
            //Vérifie si la boite est présente dans la wishlist de l'utilisateur
            return this.wishlist_uti.some(boite => boite.id_boite === this.boite.id_boite);
        },
        // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
      isAlreadyRegistered() {
            // Vérifiez si le cookie "connexion" existe et a la valeur "Y"
            const cookieValue = Cookies.get('connexion');
            if (cookieValue) {
              return true
            }
            return false
        },
    },
    methods: {
        collection(event){
            event.preventDefault();
            const button = event.target;
            const boiteId = button.getAttribute("data-id");
            if(this.search){//Méthode d'action quand le composant est appelé dans RechercheBoite
                if(this.collection_uti.some(boite => boite.id_boite === this.boite.id_boite)){
                    this.$emit('deleteBoiteCollection', boiteId);
                } else {
                    this.$emit('addBoiteCollection', boiteId);
                }
            } else{//Méthode d'action quand le composant est appelé ailleurs
                this.$emit('deleteBoite', boiteId);
            }
        },
        wishlist(event){
            event.preventDefault();
            const button = event.target;
            const boiteId = button.getAttribute("data-id");
            if(this.search){//Méthode d'action quand le composant est appelé dans RechercheBoite
                if(this.wishlist_uti.some(boite => boite.id_boite === this.boite.id_boite)){
                    this.$emit('deleteBoiteWishlist', boiteId);
                } else {
                    this.$emit('addBoiteWishlist', boiteId);
                }
            } else{//Méthode d'action quand le composant est appelé ailleurs
                this.$emit('deleteBoite', boiteId);
            }
        }
    },
}