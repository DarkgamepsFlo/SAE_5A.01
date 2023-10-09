<template>
    <router-link :to="{ name: 'boite', params: { id_boite: boite.id_boite } }">
        <div class="boite">
            <div class="image"><img :src="boite.lien_img_boi"></div>
            <div class="nom">{{ boite.nom_boite }}</div>
            <div class="numero">{{  boite.numero_boi }}</div>
            <div class="univers">{{ boite.univers }}</div>
            <div class="nombrePieces">{{ boite.nbr_pieceboi }}</div>
            <div class="dateDeSortie">{{ boite.annee_sortie_boi }}</div>
            <div>{{ boite.id_boite }}</div>
        </div>
    </router-link>
</template>

<style src="./ProfilBoite.profilboite.scss"></style>
<script src="./ProfilBoite.profilboite.js"></script>