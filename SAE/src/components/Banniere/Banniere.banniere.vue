<template>
    <div v-if="isNotAcceptedRefused" class="banniere-fixed">
        <h3>BANNIERE COOKIES</h3>
        <p>En cliquant sur "Accepter" vous nous autoriser à utiliser les cookies sur notre site web afin de pouvoir vous faire profiter de l'ensemble des fonctionnalités du site.<br>
        Sinon vous pouvez choisir de <span @click="refuserCookies" style="color: yellow;">refuser</span> l'usage des Cookies - dans ce cas vous pouvez toujours parcourir notre site sans profiter de certaines fonctionnalités<br>
        Vous pouvez changer d'avis à n'importe quel moment en cliquant sur "Gérer" ou sur notre page dédiée aux Cookies. Vous pouvez trouver plus d'information sur notre page concernant la <span @click="allerPolitique" style="color: yellow;">politique de confidentialité</span></p>
        <button @click="accepterCookies" class="butonBaniere">Accepter</button>
        <button @click="refuserCookies" class="butonBaniere">Refuser</button>
        <button @click="gererCookies" class="butonBaniere">Gérer</button>
    </div>
    
</template>

<script src="./Banniere.banniere.js"></script>
<style src="./Banniere.banniere.scss"></style>
