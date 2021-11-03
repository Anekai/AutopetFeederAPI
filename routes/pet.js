const express = require('express');
const router = express.Router();
const db = require('../app/connection.js');

db.connect();

router.get('/pet', (req, res)=>{
    db.query(`select * from pets`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        } else {
            console.log(err.message);
            res.json({error: err.message}).send();
        }
    });

    db.end;
});

router.get('/pet/:id', (req, res)=>{
    db.query(`select * from pets where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows[0]);
        } else {
            console.log(err.message);
            res.json({error: err.message}).send();
        }
    });

    db.end;
});

router.post('/pet', (req, res)=> {
    const model = req.body;
    let insertQuery = `insert into pets(name, specie, breed, size, user_id, active) 
                       values('${model.name}', '${model.specie}', '${model.breed}', '${model.size}', ${model.user_id}, 'T')`;

    db.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful');
        } else {
            console.log(err.message);
            res.json({error: err.message}).send();
        }
    });

    db.end;
});

router.put('/pet/:id', (req, res)=> {
    let model = req.body;
    let updateQuery = `update pets
                       set    name = '${model.name}'
                       ,      specie = '${model.specie}'
                       ,      breed = '${model.breed}'
                       ,      size = '${model.size}'
                       where  id = ${req.params.id}`;

    db.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        } else {
            console.log(err.message);
            res.json({error: err.message}).send();
        }
    });
    
    db.end;
});

router.delete('/pet/:id', (req, res)=> {
    let insertQuery = `update pets set active = 'F' where id=${req.params.id}`;

    db.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        } else {
            console.log(err.message);
            res.json({error: err.message}).send();
        }
    });

    db.end;
});

module.exports = router;