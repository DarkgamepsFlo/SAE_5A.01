import axios from 'axios';

class CollectionService {
  // Méthode pour inscrire un utilisateur
  async deleteBoite(donnee) {
    try {
      const response = await axios.post('http://localhost:3000/boite/deleteCollec', donnee);
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  async addBoite(donnee){
    try {
      const response = await axios.post('http://localhost:3000/boite/addCollec', donnee);
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  async getCollection(where) {
    try {
      const response = await axios.post('http://localhost:3000/users/collection', where);
      return response.data;

    } catch (error) {
      throw error;
    }
  }
}

// Exportez une instance de votre service pour pouvoir l'utiliser dans vos composants
export default new CollectionService();
