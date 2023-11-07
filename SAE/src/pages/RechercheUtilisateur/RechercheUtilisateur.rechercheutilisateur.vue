<template>
    <div id="search-page">
        <h1 id="titreRechercherUti">RECHERCHER D'UN UTILISATEUR</h1>
        <input type="text" placeholder="Entrez le nom d'un utilisateur..." id="search-bar" @input="search">
        <div id="grid-container">
            <ProfilUtilisateur v-for="user in items" :key="user.pseudo_uti" :user="user" />
        </div>
    </div>
</template>

<script src="./RechercheUtilisateur.rechercheutilisateur.js"></script>
<style src="./RechercheUtilisateur.rechercheutilisateur.scss"></style>