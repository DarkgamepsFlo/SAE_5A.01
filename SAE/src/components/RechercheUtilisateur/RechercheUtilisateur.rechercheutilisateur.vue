<template>
    <div id="search-page">
        <h1>Rechercher un utilisateur</h1>
        <input type="text" placeholder="Entrez le nom d'un utilisateur..." id="search-bar" @input="search">
        <div id="grid-container">
            <div class="utilisateur" v-for="n in 9" v-bind:key="n">{{ n }}</div>
        </div>
    </div>
</template>

<script src="./RechercheUtilisateur.rechercheutilisateur.js"></script>
<style src="./RechercheUtilisateur.rechercheutilisateur.scss"></style>