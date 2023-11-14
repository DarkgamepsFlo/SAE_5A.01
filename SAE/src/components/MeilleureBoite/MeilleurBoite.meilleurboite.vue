<template>
    <div id="utilisateur">
        <h1 id="titreTopBoite">VOICI LES 5 BOITES LES PLUS POPULAIRES</h1>
        <div id="grid-container-list2">
            <ProfilBoite v-for="boite in items" :key="boite.nom_boi" :boite="boite" 
            :search="true"
            :presentation="true"
            />
        </div>
    </div>
</template>

<script src="./MeilleurBoite.meilleurboite.js"></script>
<style src="./MeilleurBoite.meilleurboite.scss"></style>
