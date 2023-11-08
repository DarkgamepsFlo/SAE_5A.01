import axios from 'axios';

class ContactService {
  // Méthode pour inscrire un utilisateur
  async contact(message) {
    try {
      const response = await axios.post('http://localhost:3000/users/contact', message);
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// Exportez une instance de votre service pour pouvoir l'utiliser dans vos composants
export default new ContactService();