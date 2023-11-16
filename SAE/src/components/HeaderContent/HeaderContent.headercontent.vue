<template>
    <header>
      <div id="headerResponsive">

      </div>
      <div id="headerNormal">
        <button type="submit" id="boutonMenu" @click="toggleMenuGauche"> <img src="../../assets/img/menuButton.png" id="imgBoutonMenu"></button>
        <router-link to="/accueil"><a href="#" id="bouttonLogo"><div id="divImgLogo"><img src="../../assets/img/logo.png" id="imgLogo"></div></a></router-link>
        <button type="submit" id="boutonProfil" @click="toggleMenuDroit">
          <img v-if='isAlreadyRegistered' src="../../assets/img/boutonCon.png" id="imgProfil">
          <img v-else src="../../assets/img/bouton.png" id="imgProfil">
        </button>
      </div>
    </header>
</template>

<style src="./HeaderContent.headercontent.scss"></style>
<script src="./HeaderContent.headercontent.js"></script>