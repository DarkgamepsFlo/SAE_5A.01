import RecupererInformationUser from "../../services/RecupererInformationUser";
import Cookies from 'js-cookie';
import Collection from "../../components/Collection/Collection.collection.vue";
import axios from "axios";

export default {
    components: {
        Collection
    },
    data(){
        return{
            collection_id: -1,
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
            this.collection_id = infoUser.info.collection_id;
        },
    },
    created: async function(){
        if(this.isAlreadyRegistered){
            await this.getInformation();
            console.log(this.collection_id);
        }
    }
}