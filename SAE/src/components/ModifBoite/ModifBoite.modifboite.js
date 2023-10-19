import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import AjoutBoiteService from '../../services/AjoutBoiteService';
import RecupererInformationUser from '../../services/RecupererInformationUser';
import BoiteService from '../../services/BoiteService';
  
  export default {
    props: ['id_boite'],
    data() {
      return {
        suggestion: {
          nomBoite: '',
          numBoite: '',
          univers: '',
          NbrPiece: '',
          anneeSortie: '',
          descriptif: '',
        },
        boite_base: [],
        num_boite_base: 0,
        image: null,
        imageSizeError: null
      };
    },
    async mounted(){
      const where = {
        where: this.id_boite
      }

      const response = await BoiteService.getFicheBoite(where)

      if (response) {
        this.boite_base = response;
        this.suggestion.nomBoite = response[0].nom_boite
        this.suggestion.numBoite = response[0].numero_boi
        this.num_boite_base = response[0].numero_boi
        this.suggestion.univers = response[0].univers
        this.suggestion.NbrPiece = response[0].nbr_pieceboi
        this.suggestion.anneeSortie = response[0].annee_sortie_boi
        this.suggestion.descriptif = response[0].descriptif_boi
        this.image = response[0].lien_img_boi
      }
    },
    computed: {
      // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
      isAlreadyRegistered() {
        // Vérifiez si le cookie "connexion" existe et a la valeur "Y"
        const cookieValue = Cookies.get('connexion');
        if (cookieValue) {
          return true
        }

        Swal.fire({
          title: 'Erreur',
          text: 'Vous devez être connecté pour accéder à cette page',
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
          window.location.href = '../Connexion';
          return false
          }
        });
        return false
      }
    },
    methods: {
      // Cette méthode est appelée lorsque le bouton est cliqué
      onPickFile() {
        // Déclenche le clic sur l'input de type fichier caché
        this.$refs.fileInput.click();
      },
      // Cette méthode est appelée lorsque l'utilisateur sélectionne un fichier
      onFilePicked(event) {
        const files = event.target.files;

        // Ajout de condition pour vérifier la taille de l'image
        if (files.length > 0) {
          const selectedFile = files[0];

          if (selectedFile.size <= 90000) { // 102400 représente 100 Ko (la limite de POST)
            const fileReader = new FileReader();
            fileReader.addEventListener('load', () => {
                const imageDataUrl = fileReader.result;
                this.imageSizeError = null;
                this.image = imageDataUrl;
            });
            fileReader.readAsDataURL(files[0]);
          } else {
            this.imageSizeError = "L'image est trop grande ou n'est pas une image valide.";
            this.image = null;
          }
        }
      },
      async submitSuggestion() {

        const resultToken = await RecupererInformationUser.getToken();
        
        const donneesSuggestion = {
          nomBoite: this.suggestion.nomBoite,
          numBoite: this.suggestion.numBoite,
          univers: this.suggestion.univers,
          NbrPiece: this.suggestion.NbrPiece,
          anneeSortie: this.suggestion.anneeSortie,
          descriptif: this.suggestion.descriptif,
          imgBoite: this.image,
          id_boite: this.id_boite,
          id_uti: resultToken.info.id_uti,
          num_boite_base: this.num_boite_base,
          error: this.imageSizeError
        }

        const result = await AjoutBoiteService.ajoutBoiteAPI(donneesSuggestion);
            
        if (result.success === true){

          Swal.fire({
            title: 'Votre suggestion a bien été prise en compte !',
            icon: 'success',
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Super',
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
            
            window.location.href = '../rechercheLego';
            return;
          }});
        } else {
              Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: result.message
              });
        }
      },
    },
  };