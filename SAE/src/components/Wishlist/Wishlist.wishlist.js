import ProfilBoite from "../ProfilBoite/ProfilBoite.profilboite.vue";
import WishlistService from "../../services/WishlistService";

export default {
    name: "Wishlist",
    components: {
        ProfilBoite,
    },
    props: {
        wishlist_id: Number,
    },
    data(){
        return{
            wishlist: []
        }
    },
    methods: {
        // Permet de supprimer une boite de la wishList
        async deleteBoite(id){//Récupère l'id de la ProfilBoite grâce à l'event émis par cette dernière
            const donnee = {
                boite: id, 
                id_wishlist: this.wishlist_id
            }

            const result = await WishlistService.deleteBoite(donnee)

            if (result) {
                this.getWishlist();
            }
        },
        // Permet de récupérer la wishlist de l'utilisateur
        async getWishlist(){
            const where = {
                where: this.wishlist_id
            }

            const response = await WishlistService.getWishlist(where);

            if (response){
                this.wishlist = response;
            }
        },
    },
    // Permet de récupérer la wishlist dès qu'on arrive sur la page
    created: async function(){
        await this.getWishlist();
    }
}