<template>
    <div id="blockAjout" v-if="isAlreadyRegistered">
      <h1>AJOUTER UNE BOITE</h1>
      <form @submit.prevent="submitSuggestion">
        <label id="labelInputFile">
            <input type="file" id="imageBoiteProposition" name="imageBoiteProposition" accept="image/png, image/jpeg" />
            <img src="../../assets/img/inputFile.png" id="imgInputFile">
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

<script src="./AjoutBoite.ajoutboite.js"></script>
<style src="./AjoutBoite.ajoutboite.scss"></style>