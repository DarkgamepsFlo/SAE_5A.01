<template>
    <div id="boite">
        <h1>Voici la fiche d'une boite</h1>
        <div id="fiche" v-for="item in boite" :key="item.id_boite">
            <img :src="item.lien_img_boi">
            <p>{{ item.nom_boite }}</p>
            <p>{{ item.numero_boi }}</p>
            <p>{{ item.univers }}</p>
            <p>{{ item.annee_sortie_boi }}</p>
            <p>{{ item.nbr_pieceboi }}</p>
            <p>{{ item.descriptif_boi }}</p>
        </div>
    </div>
</template>

<style src="./Boite.boite.scss"></style>
<script src="./Boite.boite.js"></script>