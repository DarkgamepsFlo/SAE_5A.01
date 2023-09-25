<template>
      <div id="corps">
        <h1 id="titreAventure">REJOIGNEZ L'AVENTURE</h1>
        <router-link to="/inscription"><a href="#" id="boutonInscription"><div id="divImgBoutonCentral"><img src="../assets/img/boutonCentral.png" id="imgInscription"></div></a></router-link>
        <h2 id="description">Le site pour gérer votre collection de lego!</h2>
      </div>
      
  </template>
  
  <script>
  export default {
    // Votre logique JavaScript ici
  }
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

    #titreAventure{
        margin-top: 150px;
        font-family: 'LegoThick';
        text-align: center;
    }

    #description{
        text-align: center;
        margin-bottom: 100px;
        font-family: 'Acme';
    }

    #boutonInscription{
        text-align: center;
    }
    #titreAventure{
      font-size: 96px;
    }
    #description{
        font-size: 32px;
    }
    #imgInscription{
      width: 400px;
    }
  </style>