const bcrypt = require('bcrypt');
const conf = require('../conf.json');
const { findUsers, inscriptionUser } = require("../services/db/crudUser");

// 1 //
// Cette fonction permet d'appeler la fonction findAllUsers lorsqu'on se situe sur la bonne URL
async function findAllUsers(req, res, next) {
  try{
    const result = await findUsers('users');
    return res.send(result);
  }catch(e){
    console.log(`Il y a une erreur dans la fonction findAllUsers : ${e}`)
  }
}

// 2 //
// Cette fonction permet d'appeler la fonction inscriptionUser lorsqu'on se situe sur la bonne URL
async function inscription(req, res, next) {
  try{
    const body = req.body;

    const saltRounds = conf.Salt.salt
    const salt = await bcrypt.genSalt(saltRounds);

    const motDePasseHache = await bcrypt.hash(body.motDePasse, salt);

    const donnee = {
      pseudo : body.pseudo,
      motDePasse: motDePasseHache,
      email: body.email
    }

    const result = await inscriptionUser('users', donnee);
    return res.send(result);
  }catch(e){
    console.log(`Il y a une erreur dans la fonction inscription : ${e}`)
  }
}

module.exports = {
  findAllUsers,
  inscription
};