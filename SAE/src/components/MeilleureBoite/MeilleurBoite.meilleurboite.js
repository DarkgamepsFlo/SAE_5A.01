import ProfilBoite from "../../components/ProfilBoite/ProfilBoite.profilboite.vue";
import BoiteService from "../../services/BoiteService";

export default {
  components: {
    ProfilBoite,
  },
data() {
  return{
    items: [], // Liste de boite les plus ajoutés dans des collections
}},
// Permet de récupérer l'ensemble des boites dès qu'on arrive sur la page
async mounted() {
  try {
    const response = await BoiteService.getBestBoite();
    
    if(response) {
      this.items = response;
    }

  } catch (e) {
    console.error("Il y a une erreur : ", e);
  }
 },
};

