export default {
    props: {
        boite: Object, //Objet user qui contient les données de la boite
        search: Boolean //Si true = Utilisé dans RechercheBoite, else ailleurs
    },
    data(){
        return{
            value: 0,
        }
    },
    methods: {
        action(event){
            event.preventDefault();
            const button = event.target;
            const boiteId = button.getAttribute("data-id");
            if(this.search){//Méthode d'action quand le composant est appelé dans RechercheBoite
                
            } else{//Méthode d'action quand le composant est appelé ailleurs
                this.$emit('deleteBoite', boiteId);
            }
        }
    },
}