<template>
    <div id="nouveaute">
        <h1>Voici les 10 dernières nouveautes</h1>
        <div id="caroussel">
            <button id="precedent" onclick="ChangeSlide(-1)"></button>
            <img class="nouveaute" id="slide" :src="item.lien_img_boi">
            <button id="suivant" onclick="ChangeSlide(1)"></button>
            <!-- item.nom_boite pour récupérer le nom-->
        </div>
    </div>
</template>

<script src="./Nouveaute.nouveaute.js"></script>
<style src="./Nouveaute.nouveaute.scss"></style>
