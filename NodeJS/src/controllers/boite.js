const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const conf = require('../conf.json');
const Joi = require('joi');
const { findBoite, searchAllBts, ficheBt, getNouveaute, deleteBts, addBts, addWlh, deleteWlh } = require("../services/db/crudBoite");


// 1 //
// Cette fonction permet d'appeler la fonction search lorsqu'on se situe sur la bonne URL
async function search(req, res, next) {
  try{
    const body = req.body;
    const result = await findBoite("boite", body);
    return res.send(result);
  }catch(e){
    console.error(`Il y a une erreur dans la fonction search : ${e}`)
  }
}

// 2 //
//Permet de récupérer toutes les boites pour la recherche de boite
async function searchAllBoites(req, res, next) {
  try{
    const result = await searchAllBts("boite");
    return res.send(result);
  }catch(e){
    console.error(`Il y a une erreur dans la fonction searchAllBoites : ${e}`)
  }
}

// 3 //
//Permet d'appeler la fonction ficheBt lorsqu'on est sur la bonne URL
async function ficheBoite(req, res, next){
  try {
    const where = req.body;
    const result = await ficheBt('boite', where);
    return res.send(result);
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction ficheBoite : ${e}`);
  }
}

// 4 //
//Permet de récupérer la fonction nouveaute lorsqu'on est sur la bonne URL
async function nouveaute(req, res, next){
  try {
    const result = await getNouveaute('boite');
    return res.send(result);
  } catch (e) {
    console.error(`Il y a une erreur dans a fonction nouveaute : ${e}`);
  }
}

// 5 //
//Permet de récupérer la fonction deleteBts lorsqu'on est sur la bonne URL
async function deleteCollec(req, res, next){
  try {
    const boites = req.body.boite;
    const id_collec = req.body.id_collec;
    const result = await deleteBts('lien_collection', boites, id_collec);
    return res.send(result);
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction deleteBoites : ${e}`);
  }
}

// 6 //
//Permet de récupérer la fonction addBts lorsqu'on est sur la bonne URL
async function addCollec(req, res, next){
  try {
    const boite = req.body.boite;
    const id_collec = req.body.id_collec;
    const result = await addBts('lien_collection', boite, id_collec);
    return res.send(result);
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction addCollec : ${e}`);
  }
}

// 7 //
//Permet de récupérer la fonction addWhl lorsqu'on est sur la bonne URL
async function addWishlist(req, res, next){
  try {
    const boite = req.body.boite;
    const id_wishlist = req.body.id_wishlist;
    const result = await addWlh('lien_wishlist', boite, id_wishlist);
    return res.send(result);
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction addWishlist : ${e}`);
  }
}

// 8 //
//Permet de récupérer la fonction addWhl lorsqu'on est sur la bonne URL
async function deleteWishlist(req, res, next){
  try {
    const boite = req.body.boite;
    const id_wishlist = req.body.id_wishlist;
    const result = await deleteWlh('lien_wishlist', boite, id_wishlist);
    return res.send(result);
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction deleteWishlist : ${e}`);
  }
}

module.exports = {
  search,
  searchAllBoites,
  ficheBoite,
  nouveaute,
  deleteCollec,
  addCollec,
  addWishlist,
  deleteWishlist
};