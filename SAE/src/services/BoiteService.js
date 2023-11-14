// import
import axios from 'axios';

// Cette classe permet de s'occuper de l'ensemble des services correspondant à la manipulation d'une boite
class BoiteService {
  // Cette méthode permet de récupérer l'ensemble des informations d'une boite
  async getFicheBoite(where) {
    try {
      const response = await axios.post('http://localhost:3000/boite/ficheboite', where);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  // Cette méthode permet de récupérer l'ensemble des boites faisant partie des nouveautés
  async getNouveaute() {
    try {
      const response = await axios.post('http://localhost:3000/boite/nouveaute');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  // Cette méthode permet de récupérer l'ensemble des boites de la base de données
  async getAllBoite() {
    try{
      const response = await axios.post('http://localhost:3000/boite/searchAllBoite');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  // Cette méthode permet de récupérer les boites les plus populaires pour l'ensemble des utilisateurs 
  async getBestBoite() {
    try{
      const response = await axios.post('http://localhost:3000/boite/searchBestBoite');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new BoiteService();
