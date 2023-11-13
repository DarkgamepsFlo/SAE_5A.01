import Cookies from 'js-cookie';
import BoiteService from "../../services/BoiteService";
import RecupererInformationUser from '../../services/RecupererInformationUser';
import CollectionService from '../../services/CollectionService';
import WishlistService from '../../services/WishlistService';

export default {
    props: ['id_boite'],
    data(){
        return{
          boite: [],
          collection_uti: [],
          wishlist_uti: [],
          collection_id: 0,
          wishlist_id: 0,
        }
    },
    methods: {
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

      async deleteBoiteCollection(){//Récupère l'id de la ProfilBoite grâce à l'event émis par cette dernière
        const donnee = {
          boite: this.id_boite, 
          id_collec: this.collection_id
        }
  
        const result = await CollectionService.deleteBoite(donnee);
  
        if (result) {
          this.getCollection();
          // window.location.href = "http://127.0.0.1:5173/boite/"+this.id_boite;
        }
      },
  
      async addBoiteCollection(){//Récupère l'id de la ProfilBoite grâce à l'event émis par cette dernière
        const donnee = {
          boite: this.id_boite,
          id_collec: this.collection_id
        }
  
        const result = await CollectionService.addBoite(donnee);
  
        if (result){
          this.getCollection();
          // window.location.href = "http://127.0.0.1:5173/boite/"+this.id_boite;
        }
      },
  
      async deleteBoiteWishlist(id){//Récupère l'id de la ProfilBoite grâce à l'event émis par cette dernière
        const donnee = {
          boite: this.id_boite, 
          id_wishlist: this.wishlist_id
        }
  
        const result = await WishlistService.deleteBoite(donnee);
  
        if (result) {
          this.getWishlist();
          // window.location.href = "http://127.0.0.1:5173/boite/"+this.id_boite;
        }
      },
  
      async addBoiteWishlist(id){//Récupère l'id de la ProfilBoite grâce à l'event émis par cette dernière
        const donnee = {
          boite: this.id_boite, 
          id_wishlist: this.wishlist_id
        }
        const result = await WishlistService.addBoite(donnee);
  
        if (result){
          this.getWishlist();
          // window.location.href = "http://127.0.0.1:5173/boite/"+this.id_boite;
        }
      },

      collection(){
        if(this.collection_uti.some(boite => boite.id_boite == this.id_boite)){
            this.deleteBoiteCollection();
        } else {
            this.addBoiteCollection();
        }
      },
      wishlist(){
        if(this.wishlist_uti.some(boite => boite.id_boite == this.id_boite)){
            this.deleteBoiteWishlist();
        } else {
            this.addBoiteWishlist();
        }
      }
    },
    async mounted(){
      try {
        const where = {
          where: this.id_boite
        }

        const response = await BoiteService.getFicheBoite(where)

        if (response) {
          this.boite = response;
        }

        if(this.isAlreadyRegistered){
          await this.getInformation();
          await this.getCollection();
          await this.getWishlist();
        }

      } catch (e) {
        console.error("Il y a une erreur :", e);
      }
    },
    computed: {
      // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
      isAlreadyRegistered() {
        // Vérifiez si le cookie "connexion" existe et a la valeur "Y"
        const cookieValue = Cookies.get('connexion');
        if (cookieValue) {
          return true
        }
        return false
      },

      isBoiteInCollection(){
        return this.collection_uti.some(boite => boite.id_boite == this.id_boite);
      },

      isBoiteInWishlist(){
        return this.wishlist_uti.some(boite => boite.id_boite == this.id_boite);
      },

  },
}