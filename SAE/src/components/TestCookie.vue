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
          this.cookieList.push({ name: this.cookieName, value: this.cookieValue, expires: this.getExpirationTime(this.cookieExpires) });
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
  