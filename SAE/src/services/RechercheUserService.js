import axios from 'axios';

class RechercheUserService {
  // Méthode pour inscrire un utilisateur
  async getUser(where) {
    try {
      const response = await axios.post('http://localhost:3000/users/findUser', where)
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  async getAllUser() {
    try {
      const response = await axios.post('http://localhost:3000/users/searchAllUsers');
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  async getBestUser() {
    try {
      const response = await axios.post('http://localhost:3000/users/searchBestUsers');
      return response.data;

    } catch (error) {
      throw error;
    }
  }
}

// Exportez une instance de votre service pour pouvoir l'utiliser dans vos composants
export default new RechercheUserService();
