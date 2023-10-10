<template>
    <div id="nouveaute">
        <h1>Voici les 10 dernières nouveautes</h1>
        <div id="caroussem">
            <img class="nouveaute" v-for="item in caroussel" :key="item.id_boite" :src="item.lien_img_boi">
            <!-- item.nom_boite pour récupérer le nom-->
        </div>
    </div>
</template>

<script src="./Nouveaute.nouveaute.js"></script>
<style src="./Nouveaute.nouveaute.scss"></style>
