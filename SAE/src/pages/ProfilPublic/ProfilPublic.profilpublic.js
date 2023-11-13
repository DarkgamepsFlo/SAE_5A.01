import ProfilService from "../../services/ProfilService";
import RecupererInformationUser from "../../services/RecupererInformationUser";
import Cookies from "js-cookie";

export default {
  props: ['id_uti'],
  data(){
    return{
      user: [],
      collection: [],
      ifPublic: false,
      isUser: false
    }
  },
  methods: {
    async isUserFonc(){
      const token = await RecupererInformationUser.getToken();

      if (token.info.id_uti === this.user[0].id_uti){
        return true;
      }
      return false;
    },
    isAlreadyRegistered() {
      // Vérifiez si le cookie "connexion" existe et a la valeur "Y"
      const cookieValue = Cookies.get('connexion');
      if (cookieValue) {
        return true
      }
    }
  },
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

      if (this.isAlreadyRegistered()){
        this.isUser = await this.isUserFonc();
      }

    } catch (e) {
      console.error("Il y a une erreur :", e);
    }
  }
}