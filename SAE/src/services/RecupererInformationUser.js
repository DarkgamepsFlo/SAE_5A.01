import axios from 'axios';
import Cookies from 'js-cookie';

class RecupererInformationUser {
  // Méthode pour inscrire un utilisateur
  async getToken() {
    try {
      const cookieConnexion = Cookies.get('connexion');      
      const cookieData = JSON.parse(cookieConnexion);
    
      console.log("Voici mon token : ", cookieData.token);

      const token = {
        token: cookieData.token
      }

      const response = await axios.post('http://localhost:3000/users/getinfouser', token);

      console.log('Contenu du token décodé :', response);
      return response.data;

    } catch (error) {
      throw error;
    }
  }
}

// Exportez une instance de votre service pour pouvoir l'utiliser dans vos composants
export default new RecupererInformationUser();
