import RecupererInformationUser from '../../services/RecupererInformationUser';
import ChangerInformationService from '../../services/ChangerInformationService';
import SuggestionBoite from '../../components/SuggestionBoite/SuggestionBoite.suggestionboite.vue';
import SuggestionService from '../../services/SuggestionService';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';


export default {
  components: {
    SuggestionBoite,
  },
  data() {
    return {
      active_uti: null,
      admin_uti: null,
      adresse_mail_uti: '',
      collection_id: null,
      id_uti: null,
      pseudo_uti: '',
      wishlist_id: null,
      new_mdp: '',
      conf_mdp: '',
      public_c: null,
      public_w: null,
      lien_img_pro_pp: "",
      suggestions: [],
    };
  },
  created() {
    if(this.isAlreadyRegistered)
      this.getInformation();
      this.searchSuggestion();
  },
  computed: {
    // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
    isAlreadyRegistered() {
      // Vérifiez si le cookie "connexion" existe et a la valeur "Y"
      const cookieValue = Cookies.get('connexion');
      if (cookieValue) {
        return true
      }
      return false
    }
  },
  methods: {
    async getInformation() {        
      try {
        const infoUser = await RecupererInformationUser.getToken()

        this.active_uti = infoUser.info.active_uti
        this.admin_uti = infoUser.info.admin_uti
        this.adresse_mail_uti = infoUser.info.adresse_mail_uti
        this.collection_id = infoUser.info.collection_id
        this.id_uti = infoUser.info.id_uti
        this.pseudo_uti = infoUser.info.pseudo_uti
        this.wishlist_id = infoUser.info.wishlist_id
        this.public_c = infoUser.info.public_c
        this.public_w = infoUser.info.public_w
        this.lien_img_pro_pp = infoUser.info.lien_img_pro_pp

      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur :', error);
      }
    },

    async searchSuggestion(){
      try{
        const result = await SuggestionService.getSuggestion();
        if(result.success){
          this.suggestions = result.suggest.suggest;
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des suggestions", error)
      }
    },

    async modifierInformationUser() {
      
      if (!!this.new_mdp || !!this.conf_mdp) {
        if(this.new_mdp == this.conf_mdp) {
          
          const donnee = {
            adresse_mail_uti: this.adresse_mail_uti,
            pseudo_uti: this.pseudo_uti,
            new_mdp: this.new_mdp,
            public_c: this.public_c,
            public_w: this.public_w,
            id_uti: this.id_uti
          }

          const response = await ChangerInformationService.changerInfoAvecMdp(donnee);

          // !!! Si ça marche, modifier le token du cookie déjà présent avec celui qu'on vient d'amener de l'API
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Les mots de passe ne correspondent pas.',
          });
          return;
        }
      }  
      else {
        const donnee = {
          adresse_mail_uti: this.adresse_mail_uti,
          pseudo_uti: this.pseudo_uti,
          public_c: this.public_c,
          public_w: this.public_w,
          id_uti: this.id_uti
        }

        const response = await ChangerInformationService.changerInfoSansMdp(donnee);
        
        // !!! Si ça marche, modifier le token du cookie déjà présent avec celui qu'on vient d'amener de l'API
      }
    }
  },
};
