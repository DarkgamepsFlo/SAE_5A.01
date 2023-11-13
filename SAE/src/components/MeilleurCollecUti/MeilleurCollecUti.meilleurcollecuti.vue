<template>
    <div id="utilisateur">
        <h1>VOICI LES 5 UTILISATEURS AYANT LE PLUS DE LEGO</h1>
        <div id="grid-containers-list">
            <ProfilUtilisateur v-for="user in items" :key="user.pseudo_uti" :user="user" />
        </div>
    </div>
</template>

<script src="./MeilleurCollecUti.meilleurcollecuti.js"></script>
<style src="./MeilleurCollecUti.meilleurcollecuti.scss"></style>
