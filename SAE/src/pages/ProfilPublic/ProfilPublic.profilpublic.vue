<template>
    <div id="profil">
        <h1>PROFIL UTILISATEUR</h1>
        <div id="user" v-for="item in user" :key="item.id_uti">
            <p>Profil de {{ item.pseudo_uti }}</p>
            <img id="imgProfilPublic" :src="item.lien_img_pro">
            <div v-if="item.public">
                <p>La collection de {{ item.pseudo_uti }}</p>
            </div>
            <div v-else>
                <p>La collection de {{ item.pseudo_uti }} est en privé!</p>
            </div>  
            <router-link v-if="isUser" to="/profil">C'est ton profil ! Vas directement dessus</router-link>
            <!--L'id de l'utilisateur est aussi disponible-->
            <button v-if="isAdmin" @click="deleteUser">Supprimer l'utilisateur</button>
        </div>
        <div id="collection" v-if="ifPublic">

            <h1>COLLECTION</h1>
            <div id="collectionBoites">
                <ProfilBoite v-for="item in collection" :key="item.nom_boi" :boite="item" 
                :search="true" 
                :presentation="false"
                :collection_uti="collection_uti"
                :wishlist_uti="wishlist_uti"
                @deleteBoiteCollection="deleteBoiteCollection" 
                @addBoiteCollection="addBoiteCollection" 
                @addBoiteWishlist="addBoiteWishlist" 
                @deleteBoiteWishlist="deleteBoiteWishlist"/>
            </div>
            
        </div>
        <div v-else>
            <h1>La collection de cet utilisateur est privée</h1>
        </div>
    </div>
</template>

<style src="./ProfilPublic.profilpublic.scss"></style>
<script src="./ProfilPublic.profilpublic.js"></script>