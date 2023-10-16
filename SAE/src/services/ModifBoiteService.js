import axios from 'axios';

class ModifBoiteService {
  // Méthode pour inscrire un utilisateur
  async modifBoiteAPI(donnee) {
    try {
        const response = await axios.post('http://localhost:3000/suggestion/add', donnee)
          
        return response.data;

    } catch (error) {
      throw error;
    }
  }
}

// Exportez une instance de votre service pour pouvoir l'utiliser dans vos composants
export default new ModifBoiteService();
