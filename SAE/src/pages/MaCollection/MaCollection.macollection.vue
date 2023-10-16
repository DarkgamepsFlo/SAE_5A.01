<template>
    <div id="collec">
        <h1>Ma collection</h1>
        <Collection v-if="collection_id !== -1" :collection_id="collection_id"></Collection>
    </div>
</template>

<script src="./MaCollection.macollection.js"></script>
<style src="./MaCollection.macollection.scss"></style>