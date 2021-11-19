const express = require('express');
const router = express.Router();
const db = require('../app/connection.js');
const bcrypt = require('bcrypt');
const rounds = 10;
const jwt = require('jsonwebtoken');
const tokenSecret = "autopet-feeder";

db.connect();

router.get('/login', (req, res) => {
    db.query(`select * from users where email='${req.body.email}'`, (err, result)=>{
        if (!err) {
            if (!result.rows[0]) {
                res.status(404).json({error: 'Email não encontrado'}).send();
            } else {
                var user = result.rows[0];

                bcrypt.compare(req.body.password, user.password, (error, match) => {
                    if (error) {
                        res.status(500).json(error).send();
                    } else if (match) {
                        res.status(200).json({token: generateToken(user)}).send();
                    } else {
                        res.status(403).json({error: 'Senha incorreta'}).send();
                    }
                });
            }
        } else {
            res.status(500).json(err);
        }
    });
    db.end;
});

router.post('/signup', (req, res) => {
    const model = req.body;

    bcrypt.hash(model.password, rounds, (error, hash) => {
        if (error) {
            res.status(500).json(error).send();
        } else {
            let insertQuery = `insert into users(name, email, password, telephone, active) 
                               values('${model.name}', '${model.email}', '${hash}', '${model.telephone}', 'T')`;

            db.query(insertQuery, (err, result)=>{
                if(!err){
                    const token = generateToken(result);

                    res.status(200).json({token: token}).send();
                } else {
                    res.status(500).json(err).send();
                }
            });
            db.end;
        }
    });
});

function generateToken(user) {
    return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'});
}

// -------------------------------------------------------------------------------------------------------------------

router.post('/usuario/login', (req, res)=> {
    const user = req.body;
    console.log('O login para o usuario: ' + user.nome + ' com a senha: ' + user.senha + ' foi solicitado');
    let selectQuery = `select * from usuario where usuario.nome='${user.nome}' and usuario.senha='${user.senha}'`;

    db.query(selectQuery, (err, result)=>{
        if(!err){
	        console.log(result.rows);
            res.send(result.rows[0]);
        }  else {
            console.log(err.message);
            res.json({error: err.message}).send();
        }

        /*if (!err) {
            if (!result.rows[0]) {
                res.status(404).json({error: 'Email não encontrado'}).send();
            } else {
                var user = result.rows[0];

                bcrypt.compare(req.body.password, user.password, (error, match) => {
                    if (error) {
                        res.status(500).json(error).send();
                    } else if (match) {
                        res.status(200).json({token: generateToken(user)}).send();
                    } else {
                        res.status(403).json({error: 'Senha incorreta'}).send();
                    }
                });
            }
        } else {
            res.status(500).json(err);
        }*/
    });
    db.end;
});

module.exports = router;