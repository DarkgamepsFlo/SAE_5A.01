import axios from 'axios';

class DemandeMotDePasseService {
  // Méthode pour inscrire un utilisateur
  async demandeMotDePasse(utilisateur) {
    try {
      const response = await axios.post('http://localhost:3000/users/motdepasse', utilisateur);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// Exportez une instance de votre service pour pouvoir l'utiliser dans vos composants
export default new DemandeMotDePasseService();
