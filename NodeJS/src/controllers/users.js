const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const conf = require('../conf.json');
const Joi = require('joi');
const { findUsers, inscriptionUser, connexionUser, motdepasseUser, changerpasswordUser, searchAllUsrs, changerInfoAvecMdpUser, changerInfoSansMdpUser, profilUsr, profilCollec, getCollection, getWishlist, contactUser } = require("../services/db/crudUser");

// 1 //
// Cette fonction permet d'appeler la fonction findAllUsers lorsqu'on se situe sur la bonne URL
async function findAllUsers(req, res, next) {
  try{
    const result = await findUsers("utilisateur");
    return res.send(result);
  }catch(e){
    console.error(`Il y a une erreur dans la fonction findAllUsers : ${e}`)
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
      const saltRounds = conf.Salt.salt;
      const salt = await bcrypt.genSalt(saltRounds);

      const motDePasseHache = await bcrypt.hash(body.motDePasse, salt);

      const donnee = {
        pseudo: body.pseudo,
        motDePasse: motDePasseHache,
        email: body.email
      };

      const result = await inscriptionUser('utilisateur', donnee);

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
    console.error(`Il y a une erreur dans la fonction inscription : ${e}`);
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
      const result = await connexionUser('utilisateur', donnee);

      if (result.success) {
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

      return res.send({
        success: result.success,
        message: result.message
      });
    }
    
  }catch(e){
    console.error(`Il y a une erreur dans la fonction motDePasse : ${e}`)
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

      return res.send({
        success: result.success,
        message: result.message
      });
    }
    
  }catch(e){
    console.error(`Il y a une erreur dans la fonction motDePasse : ${e}`)
  }
}

// 6 //
// Cette fonction permet d'appeler la fonction search lorsqu'on se situe sur la bonne URL
async function search(req, res, next) {
  try{
    const body = req.body;
    const result = await findUsers("utilisateur", body);
    return res.send(result);
  }catch(e){
    console.error(`Il y a une erreur dans la fonction findAllUsers : ${e}`)
  }
}

// 7 //
//
async function searchAllUsers(req, res, next) {
  try{
    const result = await searchAllUsrs("utilisateur");
    return res.send(result);
  }catch(e){
    console.error(`Il y a une erreur dans la fonction findAllUsers : ${e}`)
  }
}

// 8 //
async function getInformation(req, res, next) {
  try{
    const body = req.body;

    const decodedToken = jwt.verify(body.token, conf.secretKey);

    return res.send({
      info: decodedToken
    });
      
  } catch(e) {
    console.error('Erreur lors du décodage du token :', e);
    // !!! Flo : envoyer quelque chose au vue cli pour qui puisse y avoir une redirection automatique sur la page de connexion 
  }
}

// 9 // 
async function changerInfoAvecMdp(req, res, next) {
  try {
    const body = req.body;

    const shema = Joi.object({
      pseudo_uti: Joi.string().min(3).required(),
      new_mdp: Joi.string().min(3).required(),
      adresse_mail_uti: Joi.string().email().required(),
      public_c: Joi.boolean().required(),
      public_w: Joi.boolean().required(),
      id_uti: Joi.number().required()
    });

    const { error, value } = shema.validate(body);

    if (error) {
      console.error('Erreur de validation :', error.details[0].message);
      return res.send({
        success: false,
        message: error.details[0].message
      });
    } else {
      const saltRounds = conf.Salt.salt;
      const salt = await bcrypt.genSalt(saltRounds);

      const motDePasseHache = await bcrypt.hash(body.new_mdp, salt);

      const donnee = {
        pseudo_uti: body.pseudo_uti,
        adresse_mail_uti: body.adresse_mail_uti,
        new_mdp: motDePasseHache,
        public_c: body.public_c,
        public_w: body.public_w,
        id_uti: body.id_uti
      };

      const result = await changerInfoAvecMdpUser('utilisateur', donnee);

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
    console.error(`Il y a une erreur dans la fonction changerinfoavecmdp : ${e}`);
    return res.send({
      success: false,
      message: "Une erreur s'est produite lors du changement."
    });
  }
}

// 10 //
async function changerInfoSansMdp(req, res, next) {
  try {
    const body = req.body;

    const shema = Joi.object({
      pseudo_uti: Joi.string().min(3).required(),
      adresse_mail_uti: Joi.string().email().required(),
      public_c: Joi.boolean().required(),
      public_w: Joi.boolean().required(),
      id_uti: Joi.number().required()
    });

    const { error, value } = shema.validate(body);

    if (error) {
      console.error('Erreur de validation :', error.details[0].message);
      return res.send({
        success: false,
        message: error.details[0].message
      });
    } else {
      const donnee = {
        pseudo_uti: body.pseudo_uti,
        adresse_mail_uti: body.adresse_mail_uti,
        public_c: body.public_c,
        public_w: body.public_w,
        id_uti: body.id_uti
      };

      const result = await changerInfoSansMdpUser('utilisateur', donnee);

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
    console.error(`Il y a une erreur dans la fonction changerinfosansmdp : ${e}`);
    return res.send({
      success: false,
      message: "Une erreur s'est produite lors du changement."
    });
  }
}

// 11 //
// Cette fonction permet d'appeler la fonction search lorsqu'on se situe sur la bonne URL
async function search(req, res, next) {
  try{
    const body = req.body;
    const result = await findUsers("utilisateur", body);
    return res.send(result);
  }catch(e){
    console.error(`Il y a une erreur dans la fonction findAllUsers : ${e}`)
  }
}

// 12 //
//Permet de chercher tous les utilisateurs au chargement de la page de recherche des utilisateurs
async function searchAllUsers(req, res, next) {
  try{
    const result = await searchAllUsrs("utilisateur");
    return res.send(result);
  }catch(e){
    console.error(`Il y a une erreur dans la fonction findAllUsers : ${e}`)
  }
}

// 13 //
//Permet de faire appel à la fonction profilPb lorsqu'on est sur la bonne URL
async function profilUser(req, res, next){
  try {
    const body = req.body;
    const where = body.where;
    const result = await profilUsr('utilisateur', where);
    return res.send(result);
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction profilPublic : ${e}`);
  }
}

// 14 //
//Permet de faire appel à la fonction profilCollec lorsqu'on est sur la bonne URL
async function profilCollection(req, res, next){
  try {
    const body = req.body;
    const where = body.where;
    const result = await profilCollec('utilisateur', where);
    return res.send(result);
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction profilCollection : ${e}`);
  }
}

// 15 //
//Permet de faire appel à la fonction getCollection lorsqu'on est sur la bonne URL
async function collection(req, res, next){
  try {
    const body = req.body;
    const where = body.where;
    const result = await getCollection(where);
    return res.send(result);
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction collection : ${e}`);
  }
}

// 16 //
//Permet de faire appel à la fonction getWishist lorsqu'on est sur la bonne URL
async function wishlist(req, res, next){
  try {
    const body = req.body;
    const where = body.where;
    const result = await getWishlist(where);
    return res.send(result);
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction wishlist : ${e}`);
  }
}

// 17 //
// Cette fonction permet d'appeler la fonction connexionUser lorsqu'on se situe sur la bonne URL
async function contact (req, res, next) {
  try{
    const donnee = req.body;

    console.log(donnee);

    const result = await contactUser('utilisateur', donnee);

    return res.send({
      success: result.success,
      message: result.message,
    });
  } catch(e) {
    console.error(`Il y a une erreur dans la fonction contact : ${e}`)
  }
}

module.exports = {
  findAllUsers,
  inscription,
  connexion,
  motdepasse,
  changerpassword,
  search,
  searchAllUsers,
  getInformation,
  changerInfoSansMdp,
  changerInfoAvecMdp,
  search,
  searchAllUsers,
  profilUser,
  profilCollection,
  collection,
  wishlist,
  contact,
};