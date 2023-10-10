<template>
    <div class="boite">
      <img :src="suggestion.lien_img_sugg">
      <div>
        <p>{{ suggestion.type_sugg }} :</p>
        <p>{{ suggestion.nom_boite_sugg }}</p>
        <p>{{ suggestion.numero_boite_sugg }}</p>
        <p>{{ suggestion.univers_sugg }}</p>
        <p>{{ suggestion.nbr_piece_sugg }}</p>
        <p>{{ suggestion.annee_sortie_sugg }}</p>
      </div>
      <div class="actions">
        <button @click="ajouterDansBDD">Ajouter</button>
        <button @click="supprimerDeBDD">Supprimer</button>
      </div>
    </div>
  </template>
  

<style src="./SuggestionBoite.suggestionboite.scss"></style>
<script src="./SuggestionBoite.suggestionboite.js"></script>