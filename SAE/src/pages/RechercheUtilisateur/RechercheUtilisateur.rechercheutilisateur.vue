<template>
    <div id="search-page">
        <h1 id="titreRechercherUti">RECHERCHER UN UTILISATEUR</h1>
        <input type="text" placeholder="Entrez le nom d'un utilisateur..." id="searchBarUti" class="searchBar" @input="search">
        <div id="grid-container" v-if="items.length > 0">
            <ProfilUtilisateur v-for="user in items" :key="user.pseudo_uti" :user="user" />
        </div>
        <div v-else>
            <h1>VOTRE RECHERCHE NE DONNE AUCUN RESULTAT</h1>
        </div>
    </div>
</template>

<script src="./RechercheUtilisateur.rechercheutilisateur.js"></script>
<style src="./RechercheUtilisateur.rechercheutilisateur.scss"></style>