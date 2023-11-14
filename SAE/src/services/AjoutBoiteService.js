// import
import axios from 'axios';

// Cette classe permet de s'occuper de l'ensemble des services lorsqu'on ajoute une boite
class AjoutBoiteService {
  // Cette méthode permet d'ajouter une boite dans la liste de suggestion
  async ajoutBoiteAPI(donnee) {
    try {
      const response = await axios.post('http://localhost:3000/suggestion/add', donnee)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new AjoutBoiteService();
