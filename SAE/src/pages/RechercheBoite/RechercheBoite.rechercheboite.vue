<template>
    <div id="search-page">
        <h1 id="titreRecherche">RECHERCHE UNE BOITE</h1>
        <input type="text" placeholder="Entrez le nom d'une boite, un numero, ou une licence..." id="searchBarBoite" class="searchBar" @input="search">
        <div id="tab-container">
            <div id="divChangeInlineBlock">
                <div class="photoLabel"><p >Photo de la boite</p></div>
                <div class="nomLabel"><p >Nom de la boite</p></div>
                <div class="numBoiteLabel"><p >Numéro de la boite</p></div>
                <div class="universLabel"><p >Univers</p></div>
                <div class="nbrPieceLabel"><p >Nombre de pièces</p></div>
                <div class="anneeBoiteLabel"><p >Année de sortie de la boite</p></div>
                <div class="actionLabel"><p>Action</p></div>
            </div>             
            <ProfilBoite v-for="boite in items" :key="boite.nom_boi" :boite="boite" 
            :search="true" 
            :presentation="false"
            :collection_uti="collection_uti"
            :wishlist_uti="wishlist_uti"
            @deleteBoiteCollection="deleteBoiteCollection" 
            @addBoiteCollection="addBoiteCollection" 
            @addBoiteWishlist="addBoiteWishlist" 
            @deleteBoiteWishlist="deleteBoiteWishlist"/>
        </div>
    </div>
    <router-link v-if="isAlreadyRegistered" to="/ajoutBoite">Boite pas présente ? Ajoute là !</router-link>
</template>

<style src="./RechercheBoite.rechercheboite.scss"></style>
<script src="./RechercheBoite.rechercheboite.js"></script>