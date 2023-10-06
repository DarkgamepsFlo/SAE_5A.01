import axios from 'axios';

class ChangerInformationService {
  // Méthode pour inscrire un utilisateur
  async changerInfoSansMdp(donnee) {
    try {
      const response = await axios.post('http://localhost:3000/users/modifinfosansmdp', donnee);
      return response.data;

    } catch (error) {
      throw error;
    }
  }

  async changerInfoAvecMdp(donnee) {
    try {
      const response = await axios.post('http://localhost:3000/users/modifinfoavecmdp', donnee);
      return response.data;

    } catch (error) {
      throw error;
    }
  }
}

// Exportez une instance de votre service pour pouvoir l'utiliser dans vos composants
export default new ChangerInformationService();
