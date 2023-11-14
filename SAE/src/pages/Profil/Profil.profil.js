import RecupererInformationUser from '../../services/RecupererInformationUser';
import ChangerInformationService from '../../services/ChangerInformationService';
import SuggestionBoite from '../../components/SuggestionBoite/SuggestionBoite.suggestionboite.vue';
import SuggestionService from '../../services/SuggestionService';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';


export default {
  components: {
    SuggestionBoite, // Composant permettant d'afficher les boites suggérés par les utilisateurs
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
  // Permet de récupérer les informations de l'utilisateur et la liste de suggestion 
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
      // Si l'utilisateur n'est pas connecté on va l'informer avec une pop-up qui va le rediriger vers la page de connexion
      Swal.fire({
        title: 'Tu dois déjà être connecté !',
        icon: 'error',
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
        customClass: {
          container: 'custom-sweetalert-container',
          title: 'custom-sweetalert-title',
          content: 'custom-sweetalert-text',
        },
        background: 'var(--color-background)',
      }).then((result) => {
        if (result.isConfirmed) {
        window.location.href = '../connexion';
        }
      });
      return false
    }
  },
  methods: {
    // Cette fonction permet de récupérer l'ensemble des informations de l'utilisateur
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

    // Cette focntion permet de déconnecter l'utilisateur
    deconnexion() {
      Cookies.remove("connexion");
      // Redirigez l'utilisateur vers la page d'accueil
      window.location.href = "http://127.0.0.1:5173/connexion";
    }, 

    // Cette fonction permet de récupérer l'ensemble des suggestions utilisateurs
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
    // Cette fonction permet de modifier l'ensemble des informations de l'utilisateur
    async modifierInformationUser() {
      
      // Il faut que les deux mots de passes correspondent
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

          if (response.success === true){

            // Si ça fonctionne, on va préciser à l'utilisateur que l'ensemble des ces informations sont mis à jours et on va l'inviter à se déconnecter pour pouvoir mettre à jour
            Swal.fire({
              title: 'L\'ensemble de vos informations sont enregistrés. Veuillez vous reconnecter',
              icon: 'success',
              allowOutsideClick: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Super !',
              customClass: {
                container: 'custom-sweetalert-container',
                title: 'custom-sweetalert-title',
                content: 'custom-sweetalert-text',
              },
              background: 'var(--color-background)',
  
            }).then((result) => {
  
            if (result.isConfirmed) {
  
              this.suggestion = {
                nomBoite: '',
                numBoite: '',
                univers: '',
                NbrPiece: '',
                anneeSortie: '',
                descriptif: '',
              };
              this.image = null
              
              this.deconnexion()
              return;
            }});
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Il y a eu un problème lors du changement de vos informations',
            });
            return;
          }
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

        if (response.success === true){

          Swal.fire({
            title: 'L\'ensemble de vos informations sont enregistrés. Veuillez vous reconnecter',
            icon: 'success',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Super !',
            customClass: {
              container: 'custom-sweetalert-container',
              title: 'custom-sweetalert-title',
              content: 'custom-sweetalert-text',
            },
            background: 'var(--color-background)',

          }).then((result) => {

          if (result.isConfirmed) {

            this.suggestion = {
              nomBoite: '',
              numBoite: '',
              univers: '',
              NbrPiece: '',
              anneeSortie: '',
              descriptif: '',
            };
            this.image = null
            
            this.deconnexion()
            return;
          }});
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Il y a eu un problème lors du changement de vos informations',
          });
          return;
        }
      }
    }
  },
};
