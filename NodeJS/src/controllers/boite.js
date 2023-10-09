const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const conf = require('../conf.json');
const Joi = require('joi');
const { findBoite, searchAllBts, ficheBt } = require("../services/db/crudBoite");


// 1 //
// Cette fonction permet d'appeler la fonction search lorsqu'on se situe sur la bonne URL
async function search(req, res, next) {
  try{
    const body = req.body;
    console.log("test2");
    const result = await findBoite("boite", body);
    console.log(result);
    console.log("test5");
    return res.send(result);
  }catch(e){
    console.log(`Il y a une erreur dans la fonction search : ${e}`)
  }
}

// 2 //
//Permet de récupérer toutes les boites pour la recherche de boite
async function searchAllBoites(req, res, next) {
  try{
    const result = await searchAllBts("boite");
    console.log(result);
    console.log("test5");
    return res.send(result);
  }catch(e){
    console.log(`Il y a une erreur dans la fonction searchAllBoites : ${e}`)
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
    console.log(`Il y a une erreur dans la fonction ficheBoite : ${e}`);
  }
}

module.exports = {
  search,
  searchAllBoites,
  ficheBoite,
};