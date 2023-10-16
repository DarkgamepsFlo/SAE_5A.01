import axios from "axios";
import RecupererInformationUser from "../../services/RecupererInformationUser";
import Cookies from 'js-cookie';
import Collection from "../../components/Collection/Collection.collection.vue";

export default {
    components: {
        Collection
    },
    data(){
        return{
            collection_id: 0,
            collection: []
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
        async getCollection(){
            const where = {
                where: this.collection_id
            }
            console.log(where.where);
            axios
            .post('http://localhost:3000/users/collection', where)
            .then(response =>{
              this.collection = response.data;
              console.log(this.collection);
            })
            .catch(error =>{
              console.error("Il y a une erreur :", error);
            });
        },
        test(){
            const child = this.$refs.childComponent;
            
            const boites = child.boitesSelection;
            axios
            .post('http://localhost:3000/boite/delete', {boites: boites, id_collec: this.collection_id})
            .then(response =>{
                this.getCollection();
            })
            .catch(error =>{
              console.error("Il y a une erreur :", error);
            });
        }
    },
    created: async function(){
        if(this.isAlreadyRegistered){
            await this.getInformation();
            await this.getCollection();
        }
    }
}