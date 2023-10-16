<template>
    <div id="collec">
        <h1>Ma collection</h1>
        <div id="gestion">
            <div id="control-line">
                <div>+ Ajouter une boite</div>
                <div @click="test">Supprimer une boite x</div>
            </div>
        </div>
        <Collection :collection="collection" ref="childComponent"></Collection>
    </div>
</template>

<script src="./MaCollection.macollection.js"></script>
<style src="./MaCollection.macollection.scss"></style>