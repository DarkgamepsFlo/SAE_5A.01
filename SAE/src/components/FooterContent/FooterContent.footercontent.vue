<template>
  <footer>
    <div id="texteFooter">
      <p class="textFooter">Pour nous contacter!</p>
      <router-link to = "/contact" class="lien">Contact</router-link> 
      <div id="footer_line">
        <router-link to="/politique" class="footer_info">Politique de confidentialité</router-link>
        <router-link to="/cookies" class="footer_info">Politique concernant les cookies</router-link>
        <router-link to="/about" class="footer_info">Mentions légales</router-link>
      </div> 
    </div>
    
  </footer>
</template>
  
<script src="./FooterContent.footercontent.js"></script>
<style src="./FooterContent.footercontent.scss"></style>