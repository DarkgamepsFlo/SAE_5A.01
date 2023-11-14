<template>
    <div class="boiteSugg" id="boiteDivSugg">
      <div id="divImgSugg"><img id="idImgSugg" :src="suggestion.lien_img_sugg"></div>
        <div id="typeSuggP"><p>{{ suggestion.type_sugg }} :</p></div>
        <div id="nomBoiteSugg"><p>{{ suggestion.nom_boite_sugg }}</p></div>
        <div id="numeroBoiteSugg"><p>{{ suggestion.numero_boite_sugg }}</p></div>
        <div id="universSugg"><p>{{ suggestion.univers_sugg }}</p></div>
        <div id="nbrPieceSugg"><p>{{ suggestion.nbr_piece_sugg }}</p></div>
        <div id="anneSortieSugg"><p>{{ suggestion.annee_sortie_sugg }}</p></div>
      <div class="actions">
        <button @click="ajouterDansBDD">Ajouter</button>
        <button @click="supprimerDeBDD">Supprimer</button>
      </div>
    </div>
  </template>
  

<style src="./SuggestionBoite.suggestionboite.scss"></style>
<script src="./SuggestionBoite.suggestionboite.js"></script>