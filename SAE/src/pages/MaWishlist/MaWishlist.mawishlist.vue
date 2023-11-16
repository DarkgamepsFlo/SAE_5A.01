<template>
    <div id="maWishlistDiv">
      <h1 id="titreMaWishlist">MA WISHLIST</h1>
      <Wishlist v-if="wishlist_id !== -1" :wishlist_id="wishlist_id"></Wishlist>
    </div>
</template>
    
<script src="./MaWishlist.mawishlist.js"></script>
<style src="./MaWishlist.mawishlist.scss"></style>
