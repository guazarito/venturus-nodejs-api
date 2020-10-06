const express = require('express');
const router = express.Router();
const db = require('../database/configDb');

router.get('/', (req, res, next) => {

    Db = new db();

    let result = Db.runQuery(' SELECT id, keyword, user_id, date FROM search ');

    res.status(200).send({
        msg: 'ok',
        result
    })

}); 
 
module.exports = router;

 