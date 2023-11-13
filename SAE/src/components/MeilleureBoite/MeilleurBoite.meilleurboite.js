import ProfilBoite from "../../components/ProfilBoite/ProfilBoite.profilboite.vue";
import BoiteService from "../../services/BoiteService";

export default {
  components: {
    ProfilBoite,
  },
data() {
  return{
    items: [],
}},

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

