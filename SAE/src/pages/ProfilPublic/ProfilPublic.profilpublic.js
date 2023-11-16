import ProfilService from "../../services/ProfilService";
import RecupererInformationUser from "../../services/RecupererInformationUser";
import Cookies from "js-cookie";
import ProfilBoite from "../../components/ProfilBoite/ProfilBoite.profilboite.vue";
import WishlistService from "../../services/WishlistService";
import CollectionService from "../../services/CollectionService";
import Swal from 'sweetalert2';

export default {
  props: ['id_uti'],
  components: {
    ProfilBoite
  },
  data(){
    return{
      user: [], // Contient la liste des utilisateurs
      collection: [], // Contient les collections des utilisateurs 
      ifPublic: false, // Contient si l'utilisateur veut partager sa collection ou non
      isUser: false, // Contient si l'utilisateur est propriétaire de ce profil
      isAdmin: false, // Contient si l'utilisateur est un administrateur du site ou non

      /*Data de l'utilisateur courant*/
      collection_id: 0,
      collection_uti: [],
      wishlist_id: 0,
      wishlist_uti: []
    }
  },
  methods: {
    // Cette fonction permet de vérifier si la page utilisateur est celle de l'utilisateur qui est en train de la consulter
    async isUserFonc(){
      const token = await RecupererInformationUser.getToken();

      if (token.info.id_uti === this.user[0].id_uti){
        return true;
      }
      return false;
    },
    // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
    isAlreadyRegistered(){
      const cookieValue = Cookies.get('connexion');
      if (cookieValue) {
        return true
      }
    },

    /*Méthodes pour l'utilisateur courant*/
    
    async getInformation(){//Récupérer les informations de l'utilisateur
      const infoUser = await RecupererInformationUser.getToken();
      this.collection_id = infoUser.info.collection_id;
      this.wishlist_id = infoUser.info.wishlist_id;
      this.isAdmin = infoUser.info.admin_uti
    },

    async deleteUser() {
      Swal.fire({
        title: 'Voulez-vous vraiment supprimer l\'utilisateur ?',
        showDenyButton: true,
        allowOutsideClick: false,
        confirmButtonText: 'Oui',
        denyButtonText: `Non`,
        allowOutsideClick: false,
        customClass: {
            container: 'custom-sweetalert-container',
            title: 'custom-sweetalert-title',
            content: 'custom-sweetalert-text',
        },
        background: 'var(--color-background)',
    }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const donnee = {
              id_uti: this.id_uti
            }
            const result = await ProfilService.deleteUser(donnee);

            if(result){
                window.location.href = "http://127.0.0.1:5173/rechercheUser";
            }
        } 
    })
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
    },
  },
  // Permet de récupérer l'ensemble des informations utiles lorsqu'on arrive sur la page
  async mounted(){

    try{
      //Première requête pour récupérer les données lié à l'utilisateur
      const where = {
        where: this.id_uti
      }

      const responseProfil = await ProfilService.getProfil(where);

      if(responseProfil){
        this.user = responseProfil;
        this.ifPublic = this.user.some(item => item.public);
      }

      const responseCollec = await CollectionService.getCollection(where);
      if (responseCollec){
        this.collection = responseCollec
      }
      
      await this.getInformation();
      await this.getCollection();
      await this.getWishlist();

      if (this.isAlreadyRegistered()){
        this.isUser = await this.isUserFonc();
      }

    } catch (e) {
      console.error("Il y a une erreur :", e);
    }
  }
}