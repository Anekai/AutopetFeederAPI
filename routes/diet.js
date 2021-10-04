const express = require('express');
const router = express.Router();
const db = require('../app/connection.js');

db.connect();

router.get('/diet', (req, res)=>{
    db.query(`select * from diets`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        } else {
            console.log(err.message);
            res.json({error: err.message}).send();
        }
    });

    db.end;
});

router.get('/diet/:id', (req, res)=>{
    db.query(`select * from diets where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows[0]);
        } else {
            console.log(err.message);
            res.json({error: err.message}).send();
        }
    });

    db.end;
});

router.post('/diet', (req, res)=> {
    const model = req.body;
    let insertQuery = `insert into diets(name, pet_id, active) 
                       values('${model.name}', ${model.pet_id}, 'T')`;

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

router.put('/diet/:id', (req, res)=> {
    let model = req.body;
    let updateQuery = `update diets
                       set    name = '${model.name}'
                       ,      pet_id = ${model.pet_id}
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

router.delete('/diet/:id', (req, res)=> {
    let insertQuery = `update diets set active = 'F' where id=${req.params.id}`;

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