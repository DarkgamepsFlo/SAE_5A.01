import axios from 'axios';

class SuggestionService {
  // Méthode pour inscrire un utilisateur
  async getSuggestion() {
    try {

      const response = await axios.get('http://localhost:3000/suggestion/find');
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  async addSuggestion(suggestion) {
    try {
      const response = await axios.post('http://localhost:3000/suggestion/addinboite', suggestion);
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  async removeSuggestion(suggestion) {
    try {

      const response = await axios.post('http://localhost:3000/suggestion/remove', suggestion);
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  async modifSuggestion(suggestion) {
    try {

      const response = await axios.post('http://localhost:3000/suggestion/update', suggestion);
      return response.data;

    } catch (error) {
      throw error;
    }
  }
}

// Exportez une instance de votre service pour pouvoir l'utiliser dans vos composants
export default new SuggestionService();
