// import
import axios from 'axios';

// Cette classe permet de s'occuper de l'ensemble des services lorsqu'un utilisateur va contacter l'équipe de Collego
class ContactService {
  // Cette méthode permet à un utilisateur d'envoyer un message à l'équipe de Collego
  async contact(message) {
    try {
      const response = await axios.post('http://localhost:3000/users/contact', message);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ContactService();