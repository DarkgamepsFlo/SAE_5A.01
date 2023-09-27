<template>
    <div id="blockAjout">
      <h1>AJOUTER UNE BOITE</h1>
      <form @submit.prevent="submitSuggestion">
        <label id="labelInputFile">
            <input type="file" id="imageBoiteProposition" name="imageBoiteProposition" accept="image/png, image/jpeg" />
            <img src="../assets/img/inputFile.png" id="imgInputFile">
        </label>
        <div id="divNomBoite">
            <label for="nom" id="labelNom">Nom de la boite</label>
            <input type="text" id="nom" nom="nomBoite" v-model="suggestion.nomBoite" required/>
        </div>
        <div id="divNumBoite">
            <label for="numBoite" id="labelNumBoite">Numéro de la boite</label>
            <input type="number" id="numBoite" v-model="suggestion.numBoite" step="1" required/>
        </div>   
        <div id="divUnivers">
            <label for="univers" id="labelUnivers">Univers</label>
            <input type="text" id="univers" v-model="suggestion.univers" required/>
        </div>  
        <div id="divNbrPiece">
            <label for="nbrPiece" id="labelNbrPiece">Nombre de pièces</label>
            <input type="number" id="nbrPiece" v-model="suggestion.NbrPiece" step="1" required />
        </div>  
        <div id="divAnneeSortie">
            <label for="anneeSortie" id="labelAnneeSortie">Année de sortie</label>
            <input type="number" id="anneeSortie" v-model="suggestion.anneeSortie" step="1" required />
        </div>  
        <div id="divDescriptif">
            <label for="descriptif" id="labelDescriptif">Descriptif</label>
            <input type="text" id="descriptif" v-model="suggestion.descriptif" required />
        </div>  
        <div id="divBoutonEnvoie"><button type="submit" id="boutonEnvoie"><span id="spanEnvoie">Envoyer</span> </button></div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Cookies from 'js-cookie';
  import Swal from 'sweetalert2';
  
  export default {
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
      };
    },
    computed: {
      // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
      isAlreadyRegistered() {
       // Vérifiez si le cookie "connexion" existe et a la valeur "Y"
        return Cookies.get('connexion') === 'Y';
      },
    },
    methods: {
      submitSuggestion() {
        const donneesSuggestion = {
          nomBoite: this.suggestion.nomBoite,
          numBoite: this.suggestion.numBoite,
          univers: this.suggestion.univers,
          NbrPiece: this.suggestion.NbrPiece,
          anneeSortie: this.suggestion.anneeSortie,
          descriptif: this.suggestion.descriptif,
        }
  
        axios
          .post('http://localhost:3000/suggestion/add', donneesSuggestion)
          .then(response => {
            // Réinitialisez le formulaire
            this.suggestion = {
              nomBoite: '',
              numBoite: '',
              univers: '',
              NbrPiece: '',
              anneeSortie: '',
              descriptif: '',
            };

            if (response.data.success === true){
              console.log("MARCHE !!!")
  
              // Redirigez l'utilisateur vers la page d'accueil
              //window.location.href = "http://127.0.0.1:5173/accueil";
            }
  
            else{
              Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: response.data.message
              });
              console.error(response.data.message);
            }
          })
          .catch(error => {
            console.error("Il y a une erreur :", error);
          });
      },
    },
  };
  </script>
  

<style scoped>
    @font-face {
    font-family: 'LegoThick';
    src: url("../assets/font/Legothick.ttf");
    }
    @font-face {
        font-family: 'Acme';
        src: url("../assets/font/Acme-Regular.ttf");
    }

    #blockAjout{
        margin-left: auto;
        margin-right: auto;
        border: 1px solid;
        width: 700px;
    }
    #imageBoiteProposition{
        display: none;
    }
    #labelInputFile{
        width: 25%;
        margin-left: 35%;
    }
    #imgInputFile{
        margin-top: 50px;
        width: 100%;
        margin-bottom: 100px;
    }
    label{
        font-family: 'Acme';
        font-size: 20px;
        display: block;
        margin-left: 70px;
    }
    h1{
        font-family: 'LegoThick';
        font-size: 64px;
        text-align: center;
    }

    #nom{
        width: 70%;
        margin-left: 90px;
        background-color: lightgray;
    }
    #numBoite{
        width: 70%;
        margin-left: 90px;
        background-color: lightgray;
    }
    #univers{
        width: 70%;
        margin-left: 90px;
        background-color: lightgray;
    }
    #nbrPiece{
        width: 70%;
        margin-left: 90px;
        background-color: lightgray;
    }
    #anneeSortie{
        width: 70%;
        margin-left: 90px;
        background-color: lightgray;
    }
    #descriptif{
        width: 70%;
        margin-left: 90px;
        background-color: lightgray;
        height: 100px;
    }

    #boutonEnvoie{
        margin-top: 50px;
        width: 40%;
        height: 50px;
        background-image: url("../assets/img/boutonCentral.png");
        background-size: contain;
        margin-bottom: 100px;
        border-color: transparent;
    }

    #divBoutonEnvoie{
        text-align: center;
    }

    #spanEnvoie{
        font-family: 'Acme';
        font-size: 30px;
        text-shadow:
        -1px 0px 0px white,
        1px 0px 0px white,
        0px -1px 0px white,
        0px 1px 0px white;
    }
</style>