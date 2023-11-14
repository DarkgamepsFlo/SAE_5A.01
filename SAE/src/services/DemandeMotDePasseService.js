// import
import axios from 'axios';

// Cette classe permet de s'occuper de l'ensemble des services lorsqu'on veut changer de mot de passe
class DemandeMotDePasseService {
  // Cette méthode permet de demander la modification d'un mot de passe
  async demandeMotDePasse(utilisateur) {
    try {
      const response = await axios.post('http://localhost:3000/users/motdepasse', utilisateur);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  // Cette méthode permet de changer de mot de passe
  async changerMotDePasse(donnee) {
    try {
      const response = await axios.post('http://localhost:3000/users/changerpassword', donnee);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new DemandeMotDePasseService();