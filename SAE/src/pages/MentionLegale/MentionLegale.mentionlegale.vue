<template>
    <h1 id="titreMentionLegale">MENTIONS LEGALES</h1>
    <div id="mentionLegaleDiv">
        <section>
            <p>Bienvenue sur Collego, le site de gestion de LEGO. L'ensemble de ces mentions vont permettre de nous présenter et de indiquer l'ensmeble des pages annexes concernant l'ensemble des utilisateurs</p>
        </section>
        
        <section>
            <h2>Qui sommes-nous ? </h2>
            <p>Étudiants en 3ème année de BUT informatique à Calais, nous avons comme tâche de réaliser un projet SAE, correspondant à ce site web, permettant de démontrer nos compétences et de valiser l'UE 1.</p>
            <p>Notre équipe est composé de :</p>
            <ul>
                <li>Ogès Florian</li>
                <li>Lutic Enzo</li>
                <li>Vernalde Enzo</li>
            </ul>
            <p>Ce site web est conçu pour notre client/tuteur Monsieur Rousselle et est adapté à l'ensemble des règles imposés par l'évaluateur de code Monsieur Offroy</p>
        </section>

        <section>
            <h2>Autres pages </h2>
            <p>Pour pouvoir avoir plus d'information sur vos droits, nous vous invitons à aller voir la page concernant notre <span @click="pageConfid" style="color: rgb(0, 234, 255);">politique de confidentialité</span>.</p>
            <p>Pour pouvoir avoir plus d'information sur la façon dont les cookies sont gérés, nous vous invitons à aller voir la page concernant notre <span @click="pageCookies" style="color: rgb(0, 234, 255);">politique de cookie</span></p>
        </section>
    </div>
</template>

<style src="./MentionLegale.mentionlegale.scss"></style>
<script src="./MentionLegale.mentionlegale.js"></script>