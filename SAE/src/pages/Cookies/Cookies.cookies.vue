<template>
    <h1>Politique concernant les cookies</h1>
    <label>Cookies Nécessaires <input type="checkbox" id="switch_1" v-model="acceptCookies"></label>
    <button @click="checkAcceptCookies">Vérifier</button>
</template>

<script src="./Cookies.cookies.js"></script>
<style src="./Cookies.cookies.scss"></style>