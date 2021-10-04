const express = require('express');
const router = express.Router();
const db = require('../app/connection.js');

db.connect();

router.get('/feeder', (req, res)=>{
    db.query(`select * from feeders`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        } else {
            console.log(err.message);
            res.json({error: err.message}).send();
        }
    });

    db.end;
});

router.get('/feeder/:id', (req, res)=>{
    db.query(`select * from feeders where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows[0]);
        } else {
            console.log(err.message);
            res.json({error: err.message}).send();
        }
    });
    
    db.end;
});

router.post('/feeder', (req, res)=> {
    const model = req.body;
    let insertQuery = `insert into feeders(user_id, pet_id, serial_number, active) 
                       values(${model.user_id}, ${model.pet_id}, '${model.serial_number}', 'T')`;

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

router.put('/feeder/:id', (req, res)=> {
    let model = req.body;
    let updateQuery = `update feeders
                       set    user_id = ${model.user_id}
                       ,      pet_id = ${model.pet_id}
                       ,      serial_number = '${model.serial_number}'
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

router.delete('/feeder/:id', (req, res)=> {
    let insertQuery = `update feeders set active = 'F' where id=${req.params.id}`;

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