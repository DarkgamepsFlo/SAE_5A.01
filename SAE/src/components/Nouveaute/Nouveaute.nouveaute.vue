<template>
    <div id="nouveaute">
        <h1 id="titreNouveaute">VOICI LES 10 DERNIERES NOUVEAUTES DU SITE</h1>
        <div id="caroussel">
            <div id="imageFlecheGauche"><button id="precedent" @click="changeSlide(-1)"></button></div>
            <div id="divImageCaroussel">
                <router-link :to="{ name: 'boite', params: { id_boite: id } }">
                    <img class="nouveaute" id="slide" :src="caroussel_current">
                </router-link>
            </div>            
            <div id="imageFlecheDroit"><button id="suivant" @click="changeSlide(1)"></button></div>
            <!-- item.nom_boite pour récupérer le nom-->
        </div>
    </div>
</template>

<script src="./Nouveaute.nouveaute.js"></script>
<style src="./Nouveaute.nouveaute.scss"></style>
