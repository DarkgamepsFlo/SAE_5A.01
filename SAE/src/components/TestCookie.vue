<template>
    <div>
      <h1>Exemple de gestion de cookies personnalisés en Vue.js</h1>
      <input v-model="cookieName" placeholder="Nom du cookie" />
      <input v-model="cookieValue" placeholder="Valeur du cookie" />
      <input v-model="cookieExpires" type="number" placeholder="Durée du cookie (en jours)" />
      <button @click="setCookie">Ajouter un cookie personnalisé</button>
      <button @click="listAllCookies">Lister tous les cookies</button>
      <div v-if="cookieList.length">
        <h2>Liste de tous les cookies :</h2>
        <ul>
          <li v-for="cookie in cookieList" :key="cookie.name">
            <strong>{{ cookie.name }}:</strong> {{ cookie.value }} (Expire dans {{ cookie.expires }} jours)
            <button @click="deleteCookie(cookie.name)">Supprimer</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import Cookies from 'js-cookie';
  
  export default {
    data() {
      return {
        cookieName: '',
        cookieValue: '',
        cookieExpires: 7, // Par défaut, la durée est de 7 jours
        cookieList: [],
      };
    },
    methods: {
      setCookie() {
        // Vérifier si le nom et la valeur du cookie sont définis
        if (this.cookieName && this.cookieValue) {
          // Définir le cookie avec le nom, la valeur et la durée personnalisés
          Cookies.set(this.cookieName, this.cookieValue, { expires: this.cookieExpires });
          
          // Ajouter le cookie à la liste
          this.cookieList.push({ name: "connexion", value: {success: true, token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWNjZXNzIjp0cnVlLCJpZF91dGkiOjU0LCJwc2V1ZG9fdXRpIjoiYXplcnR5IiwiYWRyZXNzZV9tYWlsX3V0aSI6ImF6ZXJ0eUBnbWFpbC5jb20iLCJhZG1pbl91dGkiOmZhbHNlLCJhY3RpdmVfdXRpIjp0cnVlLCJ3aXNobGlzdF9pZCI6NTQsImNvbGxlY3Rpb25faWQiOjU0LCJwdWJsaWNfYyI6ZmFsc2UsInB1YmxpY193IjpmYWxzZSwibGllbl9pbWdfcHJvX3BwIjoiaHR0cHM6Ly9tZWRpYS5pc3RvY2twaG90by5jb20vaWQvMTMwMDg0NTYyMC9mci92ZWN0b3JpZWwvYXBwYXJ0ZW1lbnQtZGljJUMzJUI0bmUtZHV0aWxpc2F0ZXVyLWlzb2wlQzMlQTktc3VyLWxlLWZvbmQtYmxhbmMtc3ltYm9sZS11dGlsaXNhdGV1ci5qcGc_cz02MTJ4NjEyJnc9MCZrPTIwJmM9QlZPZlM3bW12eTJsbmZCUGdoa05fX2s4T01zZzdObHlrcGdqbjBZT0hqMD0iLCJpYXQiOjE2OTY4MzgyMjEsImV4cCI6MTY5Njg0MTgyMX0.U1ffQpJFAQ0L3lk-w7VWbU1yF5bAkEhQmVVI5dq6RBI"}, expires: this.getExpirationTime(this.cookieExpires) });
        } else {
          alert('Veuillez saisir un nom et une valeur pour le cookie.');
        }
      },
      listAllCookies() {
        // Réinitialiser la liste des cookies
        this.cookieList = [];
  
        // Récupérer la liste de tous les cookies présents
        const allCookies = Cookies.get();
        for (const [name, value] of Object.entries(allCookies)) {
          this.cookieList.push({ name, value });
        }
      },
      deleteCookie(cookieName) {
        // Supprimer le cookie spécifique par son nom
        Cookies.remove(cookieName);
        
        // Mettre à jour la liste des cookies après la suppression
        this.listAllCookies();
      },
      getExpirationTime(days) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + parseInt(days)); // Ajouter le nombre de jours à la date actuelle
        return expirationDate.toLocaleString();
      },
    },
  };
  </script>
  