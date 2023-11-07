<template>
    <div>
      <h1>MA WISHLIST</h1>
      <Wishlist v-if="wishlist_id !== -1" :wishlist_id="wishlist_id"></Wishlist>
    </div>
</template>
    
<script src="./MaWishlist.mawishlist.js"></script>
<style src="./MaWishList.mawishlist.scss"></style>
