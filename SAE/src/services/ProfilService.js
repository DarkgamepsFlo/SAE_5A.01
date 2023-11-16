import axios from 'axios';

class ProfilService {
  // Méthode pour inscrire un utilisateur
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

  async deleteUser(donnee){
    try{
      const response = await axios.post('http://localhost:3000/users/delete', donnee)
      return response;
    } catch (e) {
      throw error;
    }
  }
}

// Exportez une instance de votre service pour pouvoir l'utiliser dans vos composants
export default new ProfilService();
