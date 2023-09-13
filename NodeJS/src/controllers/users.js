const { findUsers } = require("../services/db/crudUser");

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

module.exports = {
  findAllUsers,
};