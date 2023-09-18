const bcrypt = require('bcrypt');
const conf = require('../conf.json');
const Joi = require('joi');
const { findUsers, inscriptionUser, connexionUser, motdepasseUser } = require("../services/db/crudUser");

// 1 //
// Cette fonction permet d'appeler la fonction findAllUsers lorsqu'on se situe sur la bonne URL
async function findAllUsers(req, res, next) {
  try{
    const result = await findUsers("utilisateur");
    return res.send(result);
  }catch(e){
    console.log(`Il y a une erreur dans la fonction findAllUsers : ${e}`)
  }
}

// 2 //
// Cette fonction permet d'appeler la fonction inscriptionUser lorsqu'on se situe sur la bonne URL
async function inscription(req, res, next) {
  try {
    const body = req.body;

    const shema = Joi.object({
      pseudo: Joi.string().min(3).required(),
      motDePasse: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
    });

    const { error, value } = shema.validate(body);

    if (error) {
      console.error('Erreur de validation :', error.details[0].message);
      return res.send({
        success: false,
        message: error.details[0].message
      });
    } else {
      console.log('Données valides :', value);
      const saltRounds = conf.Salt.salt;
      const salt = await bcrypt.genSalt(saltRounds);

      const motDePasseHache = await bcrypt.hash(body.motDePasse, salt);

      const donnee = {
        pseudo: body.pseudo,
        motDePasse: motDePasseHache,
        email: body.email
      };

      const result = await inscriptionUser('utilisateur', donnee);
      console.log("RESULT : ", result);

      if (result.success) {
        return res.send({
          success: true
        });
      } else {
        return res.send({
          success: false,
          message: result.message
        });
      }
    }
  } catch (e) {
    console.log(`Il y a une erreur dans la fonction inscription : ${e}`);
    return res.send({
      success: false,
      message: "Une erreur s'est produite lors de l'inscription."
    });
  }
}

// 3 //
// Cette fonction permet d'appeler la fonction connexionUser lorsqu'on se situe sur la bonne URL
async function connexion (req, res, next) {
  try{
    const donnee = req.body;
    
    const shema = Joi.object({
      pseudo: Joi.string().required(),
      motDePasse: Joi.string().required(),
    })

    const { error, value } = shema.validate(donnee);

    if (error) {
      console.error('Erreur de validation :', error.details[0].message);
      return res.send({
        success: false,
        message: error.details[0].message
      });
    }
    else {
      console.log('Données valides :', value);

      const result = await connexionUser('utilisateur', donnee);
      console.log("RESULT : ", result);

      if (result.success) {
        return res.send({
          success: true
        });
      } else {
        return res.send({
          success: false,
          message: result.message
        });
      }
    }
    
  }catch(e){
    return res.send({
      success: false,
      message: "Une erreur s'est produite lors de la connexion."
    });
  }
}

// 4 //
// Cette fonction permet d'appeler la fonction connexionUser lorsqu'on se situe sur la bonne URL
async function motdepasse (req, res, next) {
  try{
    const donnee = req.body;

    const shema = Joi.object({
      email: Joi.string().email().required(),
    })

    const { error, value } = shema.validate(donnee);

    if (error) {
      console.error('Erreur de validation :', error.details[0].message);
      return res.send({
        success: false,
        message: error.details[0].message
      });
    }
    else {

      const result = await motdepasseUser('utilisateur', donnee);
      
      if (result.success) {
        return res.send({
          success: true
        });
      } else {
        return res.send({
          success: false,
          message: result.message
        });
      }
    }
    
  }catch(e){
    console.log(`Il y a une erreur dans la fonction motDePasse : ${e}`)
  }
}

module.exports = {
  findAllUsers,
  inscription,
  connexion,
  motdepasse,
};