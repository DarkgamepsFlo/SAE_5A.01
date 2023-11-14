// import
import axios from 'axios';

// Cette classe permet de s'occuper de l'ensemble des services lorsqu'on doit changer l'ensemble des informations sur le profil d'un utilisateur 
class ChangerInformationService {
  // Cette méthode permet de changer l'ensemble des informations de l'utilisateur lorsqu'il ne veut pas changer son mot de passe
  async changerInfoSansMdp(donnee) {
    try {
      const response = await axios.post('http://localhost:3000/users/modifinfosansmdp', donnee);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  // Cette méthode permet de changer l'ensemble des informations de l'utilisateur lorsqu'il veut changer son mot de passe
  async changerInfoAvecMdp(donnee) {
    try {
      const response = await axios.post('http://localhost:3000/users/modifinfoavecmdp', donnee);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ChangerInformationService();
