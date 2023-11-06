<template>
    <div>
        <div id="tab-container">
            <div id="divInlineBlock">
                <p>Photo de la boite</p>
                <p>Nom de la boite</p>
                <p>Numéro de la boite</p>
                <p>Nombre de pièces</p>
                <p>Année de sortie de la boite</p>
                <p>Action</p>
            </div>
            <div><div>Action</div></div>
            <div v-for="item in collection" :key="item.id_boite">
                <ProfilBoite :boite="item" :search="false" @deleteBoite="deleteBoite"></ProfilBoite>
            </div>
        </div>
    </div>
</template>

<style src="./Collection.collection.scss"></style>
<script src="./Collection.collection.js"></script>