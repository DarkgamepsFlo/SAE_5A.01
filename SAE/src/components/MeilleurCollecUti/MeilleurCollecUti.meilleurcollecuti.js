import ProfilUtilisateur from '../../components/ProfilUtilisateur/ProfilUtilisateur.profilutilisateur.vue';
import RechercheUserService from '../../services/RechercheUserService';

export default {
  components: {
    ProfilUtilisateur,
  },
  data() {
    return{
    items: [],
    
  }},
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

