import axios from 'axios';

class ProfilService {
  // Méthode pour inscrire un utilisateur
  async search(where) {
    try {
      const response = await axios.post('http://localhost:3000/boite/search', where);
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  async getProfilCollection(where) {
    try {
      const response = await axios.post('http://localhost:3000/users/profilcollection', where)
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  async getProfil(where) {
    try {
      const response = await axios.post('http://localhost:3000/users/profiluser', where)
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  async getProfilCollection(where) {
    try {
      const response = await axios.post('http://localhost:3000/users/profilcollection', where)
      return response.data;

    } catch (error) {
      throw error;
    }
  }
}

// Exportez une instance de votre service pour pouvoir l'utiliser dans vos composants
export default new ProfilService();
