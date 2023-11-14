import ProfilBoite from "../../components/ProfilBoite/ProfilBoite.profilboite.vue";
import BoiteService from "../../services/BoiteService";
import CollectionService from "../../services/CollectionService";
import RechercheBoiteService from "../../services/RechercheBoiteService";
import RecupererInformationUser from "../../services/RecupererInformationUser";
import WishlistService from "../../services/WishlistService";
import Cookies from 'js-cookie';

export default {
    components: {
      ProfilBoite,
    },
  data() {
    return{
      items: [],
      collection_id: 0,
      collection_uti: [],
      wishlist_id: 0,
      wishlist_uti: []
  }},
  methods: {
    async search(event){//Fonction de recherche
      try{
        const inputValue = event.target.value;
        const where = {
          where: inputValue.toLowerCase(),
        };

        const response = await RechercheBoiteService.search(where);

        if (response) {
          this.items = response;
        }
      } catch (e) {
        console.error("Il y a une erreur :", e);
      }      
    },

    async getInformation(){//Récupérer les informations de l'utilisateur
      const infoUser = await RecupererInformationUser.getToken();
      this.collection_id = infoUser.info.collection_id;
      this.wishlist_id = infoUser.info.wishlist_id;
    },

    async getCollection(){//Récupérer la collection de l'utilisateur
      try {
        const where = {
          where: this.collection_id
        }

        const response = await CollectionService.getCollection(where)

        if (response) {
          this.collection_uti = response;
        }
      } catch (e) {
        console.error("Il y a une erreur :", e);
      }
    },

    async getWishlist(){//Récupère la wishlist de l'utilisateur
      try {
        const where = {
          where: this.wishlist_id
        }

        const response = await WishlistService.getWishlist(where);

        if(response){
          this.wishlist_uti = response;
        }
      } catch (e) {
        console.error("Il y a une erreur : ", e)
      }
    },

    async deleteBoiteCollection(id){//Récupère l'id de la ProfilBoite grâce à l'event émis par cette dernière
      const donnee = {
        boite: id, 
        id_collec: this.collection_id
      }

      const result = await CollectionService.deleteBoite(donnee);

      if (result) {
        this.getCollection();
      }
    },

    async addBoiteCollection(id){//Récupère l'id de la ProfilBoite grâce à l'event émis par cette dernière
      const donnee = {
        boite: id, 
        id_collec: this.collection_id
      }

      const result = await CollectionService.addBoite(donnee);

      if (result){
        this.getCollection();
      }
    },

    async deleteBoiteWishlist(id){//Récupère l'id de la ProfilBoite grâce à l'event émis par cette dernière
      const donnee = {
        boite: id, 
        id_wishlist: this.wishlist_id
      }

      const result = await WishlistService.deleteBoite(donnee);

      if (result) {
        this.getWishlist();
      }
    },

    async addBoiteWishlist(id){//Récupère l'id de la ProfilBoite grâce à l'event émis par cette dernière
      const donnee = {
        boite: id, 
        id_wishlist: this.wishlist_id
      }
      const result = await WishlistService.addBoite(donnee);

      if (result){
        this.getWishlist();
      }
    }
  },

  async mounted() {
    try {

      const response = await BoiteService.getAllBoite();
      
      if(response) {
        this.items = response;
      }

      if( this.isAlreadyRegistered) {
        await this.getInformation();
        await this.getCollection();
        await this.getWishlist();
      }

    } catch (e) {
      console.error("Il y a une erreur : ", e);
    }
   },
   computed: {
    // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
    // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
      isAlreadyRegistered() {
      // Vérifiez si le cookie "connexion" existe et a la valeur "Y"
      const cookieValue = Cookies.get('connexion');
      if (cookieValue) {
        return true
      }
      return false
    }
  },
};