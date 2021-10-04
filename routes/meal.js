const express = require('express');
const router = express.Router();
const db = require('../app/connection.js');

db.connect();

router.get('/meal', (req, res)=>{
    db.query(`select * from meals`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        } else {
            console.log(err.message);
            res.json({error: err.message}).send();
        }
    });

    db.end;
});

router.get('/meal/:id', (req, res)=>{
    db.query(`select * from meals where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows[0]);
        } else {
            console.log(err.message);
            res.json({error: err.message}).send();
        }
    });
    
    db.end;
});

router.post('/meal', (req, res)=> {
    const model = req.body;
    let insertQuery = `insert into meals(schedule, quantity_grams, diet_id, active) 
                       values('${model.schedule}', '${model.quantity_grams}', ${model.diet_id}, 'T')`;

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

router.put('/meal/:id', (req, res)=> {
    let model = req.body;
    let updateQuery = `update meals
                       set    schedule = '${model.schedule}'
                       ,      quantity_grams = '${model.quantity_grams}'
                       ,      diet_id = ${model.diet_id}
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

router.delete('/meal/:id', (req, res)=> {
    let insertQuery = `update meals set active = 'F' where id=${req.params.id}`;

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