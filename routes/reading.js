const express = require('express');
const router = express.Router();
const db = require('../app/connection.js');

db.connect();

router.get('/reading', (req, res)=>{
    db.query(`select * from readings`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        } else {
            console.log(err.message);
            res.json({error: err.message}).send();
        }
    });

    db.end;
});

router.get('/reading/:id', (req, res)=>{
    db.query(`select * from readings where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows[0]);
        } else {
            console.log(err.message);
            res.json({error: err.message}).send();
        }
    });
    
    db.end;
});

router.post('/reading', (req, res)=> {
    const model = req.body;
    let insertQuery = `insert into readings(feeder_id, reading_date, reading_data, active) 
                       values(${model.feeder_id}, '${model.reading_date}', '${model.reading_data}', 'T')`;

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

router.delete('/reading/:id', (req, res)=> {
    let insertQuery = `update readings set active = 'F' where id=${req.params.id}`;

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