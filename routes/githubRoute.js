const express = require('express');
const router = express.Router();
const https = require('https');
const githubConfig = require('../config/githubConfig');
const db = require('../database/configDb');


router.get('/searchrepos/:q', (req, res, next) => {

    let q = req.params.q;
    q = q.replace(/%20/gi, "+");
    q = q.replace(/ /gi, "+");

    console.log(q);

    Db = new db();
    let date = new Date().toISOString().slice(0,10);
    Db.insert('SEARCH', 'keyword, user_id, date', `'${q}', 1, '${date}'`);

    let options = githubConfig.httpOptions;

    options.path = `/search/repositories?q=${q}&page=1&per_page=1`;

    var request = https.request(options, (resultBuffer) => {
        let body = '';

        resultBuffer.on('data', (d) => {
            body += d;
        });

        resultBuffer.on('end', (d) => {
            let JSONBody = JSON.parse(body);
           
             res.status(200).send(
                {
                    msg: 'ok',
                    full_name: JSONBody.items[0].full_name ? JSONBody.items[0].full_name : ''
                }
            )
        });

      });

      request.end();
      
      request.on('error', function(e) {
        console.error(e);
      });
});


router.get('/getissues/:owner/:repos', (req, res, next) => {
   
    let ownerRepos = req.params.owner + "/" + req.params.repos;

    let options = githubConfig.httpOptions;

    options.path = `/search/issues?q=repo:${ownerRepos}+is:issue+is:open&sort=created&order=desc&page=1&per_page=100`;

    var request = https.request(options, (resultBuffer) => {

        let body = '';

        resultBuffer.on('data', (d) => {
            body += d;
        });

        resultBuffer.on('end', (d) => {
            let JSONBody = JSON.parse(body);

            res.status(200).send(
                [
                    {
                        msg: 'ok',
                        repos: ownerRepos,
                        totalIssues: JSONBody.total_count,
                        avgAge: _calculateAge(JSONBody.items).avg,
                        stdAge: _calculateAge(JSONBody.items).std
                    }
                ]
            )
        });

      });

      request.end();
      
      request.on('error', function(e) {
        console.error(e);
      });
    
});

/**
 * _calculateAge    
 * Calcula média e desvio padrao de datas.
 * Parametro: obj => Objeto com as datas à ser calculado.
 * Retorno: obj {  
 *                  avg: 100,
 *                  std: 80
 *              }
 */
function _calculateAge(obj) {
    try {
        let qttTotalDays = 0;
        let todayDate = new Date();
        let avg = 0;
        let std = 0;
    
        obj.forEach(obj => {
            let created_atDate = new Date(obj.created_at);
            qttTotalDays += parseInt((todayDate - created_atDate) / (1000 * 60 * 60 * 24));
        });
    
        avg = qttTotalDays/obj.length;
    
        let std_aux = 0;
        obj.forEach(obj => {
            let created_atDate = new Date(obj.created_at);
            std_aux += (parseInt((todayDate - created_atDate) / (1000 * 60 * 60 * 24)) - avg) * (parseInt((todayDate - created_atDate) / (1000 * 60 * 60 * 24)) - avg);
        });
    
        std = Math.sqrt(std_aux/obj.length);
    
        return {
            avg: Math.round(avg),
            std: Math.round(std)
        }
    } catch (error) {
        console.log(error);
        return {
            avg: 0,
            std: 0
        }
    }
 
}

module.exports = router;

 