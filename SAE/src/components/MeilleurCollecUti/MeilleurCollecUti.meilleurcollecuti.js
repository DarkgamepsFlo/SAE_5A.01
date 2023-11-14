import ProfilUtilisateur from '../../components/ProfilUtilisateur/ProfilUtilisateur.profilutilisateur.vue';
import RechercheUserService from '../../services/RechercheUserService';

export default {
  components: {
    ProfilUtilisateur,
  },
  data() {
    return{
    items: [], // Liste contenant l'ensemble des utilisateurs ayant une plus grande collection
    
  }},
  // Permet de récupérer l'ensemble des utilisateurs dès qu'on arrive sur la page
  async mounted() {
    try{
      const response = await RechercheUserService.getBestUser();

      if (response) {
        this.items = response;
      }

    } catch (e) {
      console.error("Il y a une erreur :", e);
    }
  }
}

