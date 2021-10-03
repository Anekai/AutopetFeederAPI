const express = require('express');
const router = express.Router();
const db = require('../app/connection.js');
const bcrypt = require('bcrypt');
const rounds = 10;

db.connect();

router.get('/users', (req, res)=>{
    db.query(`Select * from users`, (err, result)=>{
        if(!err){
           // res.send(result.rows);
        }
    });
    db.end;
});

router.get('/users/:id', (req, res)=>{
    db.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            console.log(result.rows.length);
            res.send(result.rows[0]);
        }
    });
    db.end;
});

router.post('/users', (req, res)=> {
    const model = req.body;
    let insertQuery = `insert into users(id, firstname, lastname, location) 
                       values(${model.id}, '${model.firstname}', '${model.lastname}', '${model.location}')`;

    db.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    });
    db.end;
});

router.put('/users/:id', (req, res)=> {
    //res.send(req.query);

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

    /*db.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    });
    db.end;*/
});

router.delete('/users/:id', (req, res)=> {
    let insertQuery = `delete from users where id=${req.params.id}`

    db.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    db.end;
});

module.exports = router;