const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const conf = require('../conf.json');
const Joi = require('joi');
const { findUsers, inscriptionUser, connexionUser, motdepasseUser, changerpasswordUser } = require("../services/db/crudUser");

// 1 //
// Cette fonction permet d'appeler la fonction findAllUsers lorsqu'on se situe sur la bonne URL
async function findAllUsers(req, res, next) {
  try{
    console.log("Je suis dans findAllUser")
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

      if (result?.success) {
        const token = jwt.sign(result, conf.secretKey, { expiresIn: '1h' });

        return res.send({
          success: true,
          token: token
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
        const token = jwt.sign(result, conf.secretKey, { expiresIn: '1h' });

        console.log(token);

        return res.send({
          success: true,
          token: token
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

      console.log(result);

      return res.send({
        success: result.success,
        message: result.message
      });
    }
    
  }catch(e){
    console.log(`Il y a une erreur dans la fonction motDePasse : ${e}`)
  }
}

// 5 //
// Cette fonction permet à un utilisateur de changer son mot de passe
async function changerpassword (req, res, next) {
  try{
    const body = req.body;

    const shema = Joi.object({
      email: Joi.string().email().required(),
      mdp: Joi.string().required()
    })

    const { error, value } = shema.validate(body);

    if (error) {
      console.error('Erreur de validation :', error.details[0].message);
      return res.send({
        success: false,
        message: error.details[0].message
      });
    }
    else {

      const saltRounds = conf.Salt.salt;
      const salt = await bcrypt.genSalt(saltRounds);

      const motDePasseHache = await bcrypt.hash(body.mdp, salt);

      const donnee = {
        email: body.email,
        mdp: motDePasseHache,
      };

      const result = await changerpasswordUser('utilisateur', donnee);

      console.log(result);

      return res.send({
        success: result.success,
        message: result.message
      });
    }
    
  }catch(e){
    console.log(`Il y a une erreur dans la fonction motDePasse : ${e}`)
  }
}

// 6 //
// Cette fonction permet d'appeler la fonction search lorsqu'on se situe sur la bonne URL
async function search(req, res, next) {
  try{
    const body = req.body;
    console.log("test2");
    const result = await findUsers("utilisateur", body);
    console.log(result);
    console.log("test5");
    return res.send(result);
  }catch(e){
    console.log(`Il y a une erreur dans la fonction findAllUsers : ${e}`)
  }
}

module.exports = {
  findAllUsers,
  inscription,
  connexion,
  motdepasse,
  changerpassword,
  search,
};