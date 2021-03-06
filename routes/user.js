const express = require('express');
const router = express.Router();
const db = require('../app/connection.js');
const bcrypt = require('bcrypt');
const rounds = 10;

db.connect();
/*
router.get('/user', (req, res)=>{
    db.query(`select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        } else {
            res.send(err.message);
            console.log(err.message);
        }
    });

    db.end;
});

router.get('/user/:id', (req, res)=>{
    console.log(req.body);
    db.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows[0]);
        }
    });

    db.end;
});

router.put('/user/:id', (req, res)=> {
    bcrypt.hash(req.query.senha, rounds, (error, hash) => {
        if (error) {
            res.status(500).json(error.message).send();
        } else {
            let updateQuery = `update users
                               set senha = '${hash}'
                               where id = ${req.params.id}`;

            db.query(updateQuery, (err, result)=>{
                if(!err){
                    res.send('Update was successful');
                }
                else{ console.log(err.message) }
            });
            db.end;
        }
    });
    const model = req.body;

    let updateQuery = `update users
                       set    name = '${model.name}'
                       ,      email = '${model.email}'
                       ,      telephone = '${model.telephone}'
                       where  id = ${model.id}`;

    db.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        } else {
            console.log(err.message);
        }
    });

    db.end;
});

router.delete('/user/:id', (req, res)=> {
    let insertQuery = `update users set active = 'F' where id=${req.params.id}`

    db.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        } else {
            console.log(err.message);
            res.json({error: err.message}).send();
        }
    });

    db.end;
});*/

// ------------------------------------------------------------------------------------------------------

router.get('/usuarios/:id', (req, res)=>{
    db.query(`Select * from usuario where idusuario=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    db.end;
});


router.post('/usuario', (req, res)=> {
    const user = req.body;
    console.log(user)
    let insertQuery = `insert into usuario(idUsuario, nome, dtNascimento, email, senha, celular)
                       values(default, '${user.nome}', '${user.dtnascimento}', '${user.email}', '${user.senha}', '${user.celular}')`

    db.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('{}')
        }
        else{ console.log(err.message) }
    })
    db.end;
});

router.put('/usuario', (req, res)=> {
    const user = req.body;
    let updateQuery = `update usuario set dtNascimento='${user.dtnascimento}', email='${user.email}', senha='${user.senha}', celular='${user.celular}' where idusuario='${user.idusuario}'`

    db.query(updateQuery, (err, result)=>{
        if(!err){
	    console.log('A conta do o usuario: '+user.nome+' com a senha: '+user.senha+' foi alualizado')
            res.send('{}')
        }
        else{ console.log(err.message) }
    })
    db.end;
});

module.exports = router;
