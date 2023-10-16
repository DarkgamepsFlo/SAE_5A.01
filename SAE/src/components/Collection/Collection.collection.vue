<template>
    <div>
        <div id="tab-container">
            <div><div>Photo de la boite</div><div>Nom de la boite</div><div>Numéro de la boite</div><div>Nombre de pièces</div><div>Année de sortie de la boite</div><div>Action</div></div>
            <div v-for="item in collection" :key="item.id_boite">
                <ProfilBoite :boite="item" :search="false" @deleteBoite="deleteBoite"></ProfilBoite>
            </div>
        </div>
    </div>
</template>

<style src="./Collection.collection.scss"></style>
<script src="./Collection.collection.js"></script>