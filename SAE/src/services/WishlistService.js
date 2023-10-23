import axios from "axios";

class WishlistService{
    //Récupérer la collection de l'utilisateur
    async getWishlist(donnee){
        try {
            const response = await axios.post('http://localhost:3000/users/wishlist', donnee);
            return response.data;
        } catch (e) {
            throw e
        }
    }

    //Ajouter une boite de la wishlist d'un utilisateur
    async addBoite(donnee){
        try {
          const response = await axios.post('http://localhost:3000/boite/addWishlist', donnee)
          return response.data;
        } catch (e) {
            throw e
        }
    }

    //Retirer une boite de la wishlist d'un utilisateur
    async deleteBoite(donnee){
        try {
            const response = await axios.post('http://localhost:3000/boite/deleteWishlist', donnee)
            return response.data;   
        } catch (e) {
            throw e
        }
    }
}

export default new WishlistService();