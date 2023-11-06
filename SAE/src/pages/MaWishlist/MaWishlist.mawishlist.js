import RecupererInformationUser from "../../services/RecupererInformationUser";
import Cookies from 'js-cookie';
import Wishlist from '../../components/Wishlist/Wishlist.wishlist.vue'

export default {
    components: {
        Wishlist,
    },
    data(){
        return{
            wishlist_id: -1,
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
          return false
        },
    },
    methods: {
        async getInformation(){
            const infoUser = await RecupererInformationUser.getToken();
            this.wishlist_id = infoUser.info.wishlist_id;
        },
    },
    created: async function(){
        if(this.isAlreadyRegistered){
            await this.getInformation();
        }
    }
}