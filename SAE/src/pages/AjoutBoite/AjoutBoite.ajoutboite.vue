<template>
    <div id="blockAjout" v-if="isAlreadyRegistered">
      <h1 id="titreAjout" class="titreBlock">AJOUTER UNE BOITE</h1>
      <form @submit.prevent="submitSuggestion">
        <label id="labelInputFile">
            <input type="file" style="display: none" ref="fileInput" id="imageBoiteProposition" name="imageBoiteProposition" accept="image/png, image/jpeg" @change="onFilePicked"/>
            <img v-if="!image" class="imgInputAjout" src="../../assets/img/inputFile.png" id="imgInputFile">
            <img v-else :src="image" class="imgInputAjout" alt="Image sélectionnée" />
            <h2 v-if="imageSizeError">{{ imageSizeError }}</h2>
            <button class="btn btn-info" @click="onPickFile">Upload profile picture</button>
        </label>
        <div id="divNomBoite">
            <label for="nom" id="labelNom" class="labelForm">Nom de la boite</label>
            <input type="text" id="nom" nom="nomBoite" class="inputForm" v-model="suggestion.nomBoite" required/>
        </div>
        <div id="divNumBoite">
            <label for="numBoite" id="labelNumBoite" class="labelForm">Numéro de la boite</label>
            <input type="number" id="numBoite" class="inputForm" v-model="suggestion.numBoite" step="1" required/>
        </div>   
        <div id="divUnivers">
            <label for="univers" id="labelUnivers" class="labelForm">Univers</label>
            <input type="text" id="univers" class="inputForm" v-model="suggestion.univers" required/>
        </div>  
        <div id="divNbrPiece">
            <label for="nbrPiece" id="labelNbrPiece" class="labelForm">Nombre de pièces</label>
            <input type="number" id="nbrPiece" class="inputForm" v-model="suggestion.NbrPiece" step="1" required />
        </div>  
        <div id="divAnneeSortie">
            <label for="anneeSortie" id="labelAnneeSortie" class="labelForm">Année de sortie</label>
            <input type="number" id="anneeSortie" class="inputForm" v-model="suggestion.anneeSortie" step="1" required />
        </div>  
        <div id="divDescriptif">
            <label for="descriptif" id="labelDescriptif" class="labelForm">Descriptif</label>
            <textarea id="descriptif" class="inputForm" v-model="suggestion.descriptif" required></textarea>
        </div>  
        <div id="divBoutonEnvoie" class="divBoutonPrincipal"><button type="submit" id="boutonEnvoie" class="boutonPrincipal"><span id="spanEnvoie" class="spanBoutonPrincipal">Envoyer</span> </button></div>
      </form>
    </div>    
</template>

<script src="./AjoutBoite.ajoutboite.js"></script>
<style src="./AjoutBoite.ajoutboite.scss"></style>
