// import
import axios from 'axios';

// Cette classe permet de s'occuper de l'ensemble des services lorsqu'un utilisateur va essayer de se connecter
class ConnexionService {
  // Cette méthode permet de connecter un utilisateur
  async connexionUtilisateur(utilisateur) {
    try {
      const response = await axios.post('http://localhost:3000/users/connexion', utilisateur);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ConnexionService();
