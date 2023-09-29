import axios from 'axios';

class InscriptionService {
  // Méthode pour inscrire un utilisateur
  async inscrireUtilisateur(utilisateur) {
    try {
      const response = await axios.post('http://localhost:3000/users/inscription', utilisateur);
      console.log("DATAAAA : ", response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// Exportez une instance de votre service pour pouvoir l'utiliser dans vos composants
export default new InscriptionService();
