import { Router } from 'express';


declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

const router = Router();


router.get('/', function (req, res) {
    res.send('Home /session nothing to do here');
});

router.get('/set', function (req, res) {
    req.session.user = { name: 'Chetan' };
    let data = {
        status: 'Session set',
        User: req.session.user,
    }
    res.send(data);
});

router.get('/get',async function(req, res){
    let data;
    console.log(req.session);
    if (!req.session.user) {
        data = {};
    }else{
        data = req.session.user;
    }
    
    res.status(202).json(data);
});

export default router;