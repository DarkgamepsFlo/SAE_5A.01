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
  methods: {
    search: async function(event){
      try {
        const where = {
          where: event.target.value.toLowerCase() + "%",
        }
  
        const response = await RechercheUserService.getUser(where);

        if (response) {
          this.items = response;
        }

      } catch (e) {
        console.error("Il y a une erreur :", e);
      }
    },
  },
  async mounted() {
    try{

      const response = await RechercheUserService.getAllUser();

      if (response) {
        this.items = response;
      }

    } catch (e) {
      console.error("Il y a une erreur :", e);
    }
  }
}

