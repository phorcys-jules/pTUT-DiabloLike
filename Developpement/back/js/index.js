var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import bcrypt from 'bcryptjs';
import { connect } from './database.js';
import { User } from './models/User.js';
//Config the app
const app = express();
const PORT = 8752;
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
/**
 * Routes available
 */
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.get('/ginette', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield connect();
        yield conn.query("INSERT INTO `user` (`id`, `pseudo`, `firstname`, `lastname`, `password`, `email`) VALUES (NULL, 'GinGinGaming', 'Gin', 'ette', '1234', 'ginette@gaming.com')");
        res.json({
            message: 'Ginette Created'
        });
    });
});
/**
 * Routes de création d'un utilisateur
 * type : POST
 */
app.post('/createUser/:pseudo/:firstname/:lastname/:pass/:mail', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let p = req.params;
        p.pass = yield bcrypt.hash(p.pass, 10);
        let u = new User(p.pseudo, p.firstname, p.lastname, p.pass, p.mail);
        /**
       * TODO gestion erreur try catch
       * si connection pas possible
       * si donné non validé par le constructeur de user
       * si problème lors de l'exècution de la requete
       * mail existe déja,...
       */
        const conn = yield connect();
        yield conn.query(u.sql_insert());
        res.status(201).json({
            data: [],
            message: "user created"
        });
    });
});
//Launch the app
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
