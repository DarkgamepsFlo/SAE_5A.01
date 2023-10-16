<template>
    <router-link :to="{ name: 'boite', params: { id_boite: boite.id_boite } }">
        <div class="boite" id="boiteProfilDiv">
            <div class="image" id="imageProfilBoite"><img :src="boite.lien_img_boi"></div>
            <div class="nom" id="nomProfilBoite"><p>{{ boite.nom_boite }}</p></div>
            <div class="numero" id="numeroProfilBoite"><p>{{  boite.numero_boi }}</p></div>
            <div class="univers" id="universProfilBoite"><p>{{ boite.univers }}</p></div>
            <div class="nombrePieces" id="nombrePiecesProfilBoite"><p>{{ boite.nbr_pieceboi }}</p></div>
            <div class="dateDeSortie" id="dateDeSortieProfilBoite"><p>{{ boite.annee_sortie_boi }}</p></div>
            <input type="checkbox" id="checkboxProfilBoite" :data-id="boite.id_boite" @click.stop="action">
        </div>
    </router-link>
</template>

<style src="./ProfilBoite.profilboite.scss"></style>
<script src="./ProfilBoite.profilboite.js"></script>