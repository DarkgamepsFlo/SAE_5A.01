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
            const checkbox = event.target;
            const boiteId = checkbox.getAttribute("data-id");
            if(this.search){//Méthode d'action quand le composant est appelé dans RechercheBoite
                if (checkbox.checked) {
                    console.log("yes");
                } else {
                    console.log("no");
                }
            } else{//Méthode d'action quand le composant est appelé ailleurs
                this.$emit('deleteBoite', boiteId);
            }
        }
    },
}