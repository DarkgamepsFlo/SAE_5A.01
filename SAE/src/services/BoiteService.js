import axios from 'axios';

class BoiteService {
  // Méthode pour inscrire un utilisateur
  async getFicheBoite(where) {
    try {
      const response = await axios.post('http://localhost:3000/boite/ficheboite', where);
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  async getNouveaute() {
    try {
      const response = await axios.post('http://localhost:3000/boite/nouveaute');
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  async getAllBoite() {
    try{
      const response = await axios.post('http://localhost:3000/boite/searchAllBoite');
      return response.data;
      
    } catch (error) {
      throw error;
    }
  }

  async getBestBoite() {
    try{
      const response = await axios.post('http://localhost:3000/boite/searchBestBoite');
      return response.data;
      
    } catch (error) {
      throw error;
    }
  }
}

// Exportez une instance de votre service pour pouvoir l'utiliser dans vos composants
export default new BoiteService();
