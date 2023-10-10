<template>
    <div id="search-page">
        <h1>Rechercher une boite</h1>
        <input type="text" placeholder="Entrez le nom d'une boite, un numero, ou une licence..." id="search-bar" @input="search">
        <div id="tab-container">
            <div><div>Photo de la boite</div><div>Nom de la boite</div><div>Numéro de la boite</div><div>Nombre de pièces</div><div>Année de sortie de la boite</div></div>
            <ProfilBoite v-for="boite in items" :key="boite.nom_boi" :boite="boite" />
        </div>
    </div>
    <router-link v-if="isAlreadyRegistered" to="/ajoutBoite">Boite pas présente ? Ajoute là !</router-link>
</template>

<style src="./RechercheBoite.rechercheboite.scss"></style>
<script src="./RechercheBoite.rechercheboite.js"></script>