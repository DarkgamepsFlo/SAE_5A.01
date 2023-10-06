export default {
    props: {
        boite: Object, //Objet user qui contient les données de la boite
    },
    methods: {
        redirection: function(event) {
            window.alert(this.boite.id_boite); //Ecrire à la place la fonction pour rediriger vers la page de la boite
        }
    }
}