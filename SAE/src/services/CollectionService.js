// import
import axios from 'axios';

// Cette classe permet de s'occuper de l'ensemble des services lorsqu'on doit intéragir avec la collection
class CollectionService {
  // Cette méthode permet de supprimer une boite de la collection d'un utilisateur
  async deleteBoite(donnee) {
    try {
      const response = await axios.post('http://localhost:3000/boite/deleteCollec', donnee);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  // Cette méthode permet d'ajouter une boite dans la collection d'un utilisateur
  async addBoite(donnee){
    try {
      const response = await axios.post('http://localhost:3000/boite/addCollec', donnee);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  // Cette méthode permet de récupérer l'ensemble des boites d'une collection d'un utilisateur
  async getCollection(where) {
    try {
      const response = await axios.post('http://localhost:3000/users/collection', where);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new CollectionService();
