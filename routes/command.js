const express = require('express');
const router = express.Router();
const db = require('../app/connection.js');

db.connect();

router.get('/command', (req, res)=>{
    db.query(`select * from commands`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        } else {
            console.log(err.message);
            res.json({error: err.message}).send();
        }
    });

    db.end;
});

router.get('/command/:id', (req, res)=>{
    db.query(`select * from commands where idAcoes=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows[0]);
        } else {
            console.log(err.message);
            res.json({error: err.message}).send();
        }
    });
    
    db.end;
});

router.post('/command', (req, res)=> {
    const model = req.body;
    let insertQuery = `insert into commands(feeder_id, command_date, command, active) 
                       values(${model.feeder_id}, '${model.command_date}', '${model.command}', 'T')`;

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

router.put('/command/:id', (req, res)=> {
    let model = req.body;
    let updateQuery = `update commands
                       set    feeder_id = ${model.feeder_id}
                       ,      command_date = '${model.command_date}'
                       ,      command = '${model.command}'
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

router.delete('/command/:id', (req, res)=> {
    let insertQuery = `update commands set active = 'F' where id=${req.params.id}`;

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