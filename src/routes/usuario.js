const express = require('express');
const conectarBancoDados = require('../middlewares/conectarBD');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');
const bcrypt = require('bcrypt');
const EsquemaUsuario = require('../models/usuario');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authUser = require('../middlewares/authUser');

/* GET users listing. */

/* POST Criar algo, fazer login */
router.post('/criar', authUser, conectarBancoDados, async function(req, res) {
  try{
    //#swagger.tags = ['Usuario']
    // já aparece na documentação
    let {nome, email, senha} = req.body;
    const numeroVezesHash = 10; //constante ligada a criptografia
    const senhaHash = await bcrypt.hash(senha, numeroVezesHash);
    const respostaBD = await EsquemaUsuario.create({nome, email, senha:senhaHash})
    res.status(200).json({
      status: 'OK',
      statusMensagem:'Usuario criado com sucesso....',
      resposta: respostaBD
    })

  }
  catch (error) {
    if (String(error).includes("email_1 dup key")){
      return tratarErrosEsperados(res,'Error: Já existe uma conta com este email')
    }

    return tratarErrosEsperados(res, error)
  }
});


router.post('/logar', conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Usuario']
    let { email, senha } = req.body;

    let respostaBD = await EsquemaUsuario.findOne({ email }).select('+senha');
    if (respostaBD) {

      //verificando a senha, o '+' garante a seleção pois o padrão é estar oculto
      let senhaCorreta = await bcrypt.compare(senha, respostaBD.senha);
      if (senhaCorreta) {
        
        //token é necessario para gerar um token de autenticação
        let token = jwt.sign({ id: respostaBD._id }, process.env.JWT_SECRET, { expiresIn: '1d' })


        res.header('x-auth-token', token);
        res.status(200).json({
          status: "OK",
          statusMensagem: "Usuário autenticado com sucesso...",
          resposta: { "x-auth-token": token }
        });
      } else {
        // raise a error = throw
        throw new Error("Email ou senha incorreta...");
      }
    } else {
      throw new Error("Email ou senha incorreta...");
    }
  } catch (err) {
    return tratarErrosEsperados(res, err);
  }
});




module.exports = router;
