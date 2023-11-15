<template>
    <div id="boitePage">
        <h1 id="titleBoitePage">VOICI LA FICHE D'UNE BOITE</h1>
        <div id="fiche" v-for="item in boite" :key="item.id_boite">
            <img :src="item.lien_img_boi">
            <p>{{ item.nom_boite }}</p>
            <p>{{ item.numero_boi }}</p>
            <p>{{ item.univers }}</p>
            <p>{{ item.annee_sortie_boi }}</p>
            <p>{{ item.nbr_pieceboi }}</p>
            <p>{{ item.descriptif_boi }}</p>
            <div v-if="isAlreadyRegistered" id="buttonProfilBoite">
                <input type="button" id="buttonCollectionProfilBoite" value="Supprimer de la collection" @click.stop="collection" v-if="isBoiteInCollection">
                <input type="button" id="buttonCollectionProfilBoite" value="Ajouter à la collection" @click.stop="collection" v-else>

                <input type="button" id="buttonWishlistProfilBoite" value="Supprimer de la wishlist" @click.stop="wishlist" v-if="isBoiteInWishlist">
                <input type="button" id="buttonWishlistProfilBoite" value="Ajouter à la wishlist" @click.stop="wishlist" v-else>
            </div>
            

            <router-link id="linkModifBoite" v-if="isAlreadyRegistered" :to="{ name: 'modifboite', params: { id_boite: item.id_boite } }">Cette boite n'est pas à jour ? Modifie là !</router-link>
        </div>
    </div>
    
</template>

<style src="./Boite.boite.scss"></style>
<script src="./Boite.boite.js"></script>