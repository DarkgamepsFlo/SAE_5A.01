export default {
    props: {
        user: Object, //Objet user qui contient la photo de profil et le nom de l'utilisateur
    },
    methods: {
        redirection: function(event) {
            window.alert(this.user.id_uti); //Ecrire à la place la fonction pour rediriger vers la page du profil
        }
    }
}