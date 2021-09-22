const express = require('express');
const router = express.Router();
const db = require('./../connection.js');

db.connect();

router.get('/refeicao', (req, res)=>{
    db.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    db.end;
});

router.get('/refeicao/:id', (req, res)=>{
    db.query(`Select * from refeicao where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    db.end;
});

router.post('/refeicao', (req, res)=> {
    const model = req.body;
    let insertQuery = `insert into refeicao(id, firstname, lastname, location) 
                       values(${model.id}, '${model.firstname}', '${model.lastname}', '${model.location}')`;

    db.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    });
    db.end;
});

router.put('/refeicao/:id', (req, res)=> {
    let model = req.body;
    let updateQuery = `update refeicao
                       set firstname = '${model.firstname}',
                       lastname = '${model.lastname}',
                       location = '${model.location}'
                       where id = ${model.id}`;

    db.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    });
    db.end;
});

router.delete('/users/:id', (req, res)=> {
    let insertQuery = `delete from refeicao where id=${req.params.id}`

    db.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    db.end;
});

module.exports = router;