import BoiteService from "../../services/BoiteService";

export default {
  data(){
    return{
      caroussel: []
    }
  },
  methods: {},
  async mounted(){
    try {
      const response = await BoiteService.getNouveaute()

      if (response) {
        this.caroussel = response;
      }
    } catch (e) {
      console.error("Il y a une erreur :", e);
    }
  }
};