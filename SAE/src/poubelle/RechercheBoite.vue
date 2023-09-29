<script setup>
import ProfilBoite from '../components/ProfilBoite.vue'
</script>

<template>
<h1>Voici la recherche de boite avec la liste de boite</h1>
<ProfilBoite />
<router-link to="/ajoutBoite">voila la boite</router-link>

</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

</style>
