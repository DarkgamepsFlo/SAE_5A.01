import ProfilService from "../../services/ProfilService";
import RecupererInformationUser from "../../services/RecupererInformationUser";
import Cookies from "js-cookie";

export default {
  props: ['id_uti'],
  data(){
    return{
      user: [], // Contient la liste des utilisateurs
      collection: [], // Contient les collections des utilisateurs 
      ifPublic: false, // Contient si l'utilisateur veut partager sa collection ou non
      isUser: false // Contient si l'utilisateur est propriétaire de ce profil
    }
  },
  methods: {
    // Cette fonction permet de vérifier si la page utilisateur est celle de l'utilisateur qui est en train de la consulter
    async isUserFonc(){
      const token = await RecupererInformationUser.getToken();

      if (token.info.id_uti === this.user[0].id_uti){
        return true;
      }
      return false;
    },
    // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
      isAlreadyRegistered() {
      const cookieValue = Cookies.get('connexion');
      if (cookieValue) {
        return true
      }
    }
  },
  // Permet de récupérer l'ensemble des informations utiles lorsqu'on arrive sur la page
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

      // On va vérifier si l'utilisateur est connecté pour pouvoir essayer de voir s'il est sur son profil
      if (this.isAlreadyRegistered()){
        this.isUser = await this.isUserFonc();
      }

    } catch (e) {
      console.error("Il y a une erreur :", e);
    }
  }
}