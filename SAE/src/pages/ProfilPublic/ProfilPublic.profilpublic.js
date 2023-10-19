import ProfilService from "../../services/ProfilService";

export default {
  props: ['id_uti'],
  data(){
    return{
      user: [],
      collection: [],
      ifPublic: false,
    }
  },
  methods: {},
  async mounted(){

    try{
      //Première requête pour récupérer les données lié à l'utilisateur
      const where = {
        where: this.id_uti
      }

      const responseProfil = await ProfilService.getProfil(where);

      if(responseProfil){
        this.user = responseProfil;
        this.ifPublic = this.user.some(item => item.public);
      }

      const responseCollec = await ProfilService.getProfilCollection(where);

      if (responseCollec){
        this.collection = responseCollec
      }

    } catch (e) {
      console.error("Il y a une erreur :", e);
    }
  }
}