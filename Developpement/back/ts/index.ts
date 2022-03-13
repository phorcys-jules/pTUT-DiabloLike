import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { connect } from './database.js';
import { User } from './models/User.js';
import  session  from './routes/session.js';
import cookieParser from 'cookie-parser';
import sessions from 'express-session';
import { Router } from 'express';

import * as fs from 'fs';
import e from 'express';

//Config the app
const app = express();
const PORT = 8752;

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
  secret: "thisismysecrctekey",
  saveUninitialized:true,
  cookie: { maxAge: oneDay, httpOnly: false  },
  resave: true
}));

app.use(cookieParser());

app.use(express.json());
/*
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
*/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * Router
*/
const routes = Router();

routes.use('/session', session);
app.use(routes);


/**
 * Routes available
 */
app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.get('/json', async function (req, res) {
  var data = { table: [{
    id: 0,
    square: 0
  }
  ] }

  for (let i = 0; i < 26; i++) {
    var obj = {
      id: i,
      square: i * i
    }
    data.table.push(obj);
  }
  fs.writeFile("input.json", JSON.stringify(data), function (err: any) {
    if (err) throw err;
    console.log('complete');
  }
  );
  res.status(200).send("complete")

});

app.get('/ginette', async function (req, res) {

  const conn = await connect();
  await conn.query("INSERT INTO `user` (`id`, `pseudo`, `firstname`, `lastname`, `password`, `email`) VALUES (NULL, 'GinGinGaming', 'Gin', 'ette', '1234', 'ginette@gaming.com')");
  res.json({
    message: 'Ginette Created'
  });
});

app.get(`/users`, async function (req, res) {
  
    const conn = await connect();
    await conn.query("SELECT * FROM `user` ")
      .then((result) => {
        res.send(result)
      })
      .catch((error) => {
        res.send({
          error: error.toString(),
        })
      })
  });

  app.get(`/classes`, async function (req, res) {
  
    const conn = await connect();
    await conn.query("SELECT * FROM `class`")
      .then((result) => {
        res.send(result)
      })
      .catch((error) => {
        res.send({
          error: error.toString(),
        })
      })
  });

  app.get(`/classbyname/:name`, async function (req, res) {
    let name=req.params.name;
    const conn = await connect();
    await conn.query("SELECT * FROM `class` WHERE name=?", [
      name,
    ])
      .then((result) => {
        res.send(result)
      })
      .catch((error) => {
        res.send({
          error: error.toString(),
        })
      })
  });

  app.get(`/characters`, async function (req, res) {
  
    const conn = await connect();
    await conn.query("SELECT * FROM `character` ")
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
app.post('/createChar/:name/:classID/', async function (req, res) {
  let id = req.params.classID;
  let name=req.params.name;

    /**
   * TODO gestion erreur try catch
   * si connection pas possible
   * si donné non validé par le constructeur de user
   * si problème lors de l'exècution de la requete
   * mail existe déja,...
   */
  const conn = await connect();
  await conn.query("INSERT INTO `character` (name, lvl, hp, maxHP, mp, MaxMP, classID) VALUES ('"+name+"', 1, 10, 100,1,1,"+id+")");

  res.status(201).json({
    data: [],
    message : "character created"
  });
});


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

app.get('*', function (req, res) {
  res.status(400).json({
    "type": "error",
    "error": 400,
    "message": `route inconnu`});
})




//Launch the app
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});