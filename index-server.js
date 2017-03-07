'use strict'

let express = require('express')
let bodyParser = require('body-parser')
let jwt = require('jsonwebtoken')

const JWT_PASSWORD  = 'P@ssw0rd88an'

let app = express();

let user = {andre:'senhaTeste'}

app.post('/login', bodyParser.json(),(req,res) => {
  console.log(req.body)
  if(!user[req.body.username] || user[req.body.username] !== req.body.password){
    res.status(401).json({ error: 'Usuário ou senha inválidos'})
  }else{
    res.json({token: jwt.sign({username : req.body.username}, JWT_PASSWORD)})
  }
})

app.get('/session',(req,res) =>{
  let auth = req.headers.authorization

  if(!auth || !auth.startsWith('Bearer')){
    return res.status(401).json({error: "Faltou JWT de Sessão"})
  }else{
    auth = auth.split('Bearer').pop().trim()
  }
  jwt.verify(auth, JWT_PASSWORD, (err, data) =>{
    if(err){
      return res.status(401).json({error: "Sessão inválida!"})
    }
    res.send(`Ola ${data.username}`)
  })

  console.log(auth)
})

app.listen(3000)
