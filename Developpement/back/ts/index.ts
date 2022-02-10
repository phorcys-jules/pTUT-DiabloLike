import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { connect } from './database.js';
import { User } from './models/User.js';

//Config the app
const app = express();
const PORT = 8752;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * Routes available
 */
app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.get('/ginette', async function (req, res) {

  const conn = await connect();
  await conn.query("INSERT INTO `user` (`id`, `pseudo`, `firstname`, `lastname`, `password`, `email`) VALUES (NULL, 'GinGinGaming', 'Gin', 'ette', '1234', 'ginette@gaming.com')");
  res.json({
    message: 'Ginette Created'
  });
});

app.get('/characters', async function (req, res) {

  const conn = await connect();
  await conn.query("SELECT * FROM `character`")
    .then((result) => {
      res.send(result)
    })
    .catch((error) => {
      res.send({
        error: error.toString(),
      })
    })
});

/**
 * Routes de création d'un utilisateur
 * type : POST
 */
app.post('/createUser/:pseudo/:firstname/:lastname/:pass/:mail', async function (req, res) {
  let p = req.params;
  p.pass = await bcrypt.hash(p.pass, 10);
  let u = new User(p.pseudo, p.firstname, p.lastname, p.pass, p.mail);

    /**
   * TODO gestion erreur try catch
   * si connection pas possible
   * si donné non validé par le constructeur de user
   * si problème lors de l'exècution de la requete
   * mail existe déja,...
   */
  const conn = await connect();
  await conn.query(u.sql_insert());

  res.status(201).json({
    data: [],
    message : "user created"
  });
});





//Launch the app
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});