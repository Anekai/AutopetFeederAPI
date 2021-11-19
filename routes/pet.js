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

//--------------------------------------------------------------------------------------------------------

router.post('/pet', (req, res)=> {
    const pet = req.body;
    console.log(pet)
    let insertQuery = `insert into pet(idpet, nome, animal, dtnascimento, raca, porte, idusuario, excluido)
                       values(default, '${pet.nome}', '${pet.animal}', '${pet.dtnascimento}', '${pet.raca}', '${pet.porte}', ${pet.idusuario}, 'false')`

    db.query(insertQuery, (err, result)=>{
        if(!err){
            res.send(pet)
        }
        else{ console.log(err.message) }
    })
    db.end;
});

router.put('/pet', (req, res)=> {
    const pet = req.body;
    console.log(pet)
    let updateQuery = `update pet set nome='${pet.nome}', animal='${pet.animal}', dtnascimento='${pet.dtnascimento}', raca='${pet.raca}', porte='${pet.porte}' where idpet='${pet.idpet}'`

    db.query(updateQuery, (err, result)=>{
        if(!err){
            res.send(pet)
        }
        else{ console.log(err.message) }
    })
    db.end;
});

router.delete('/pet/:idpet', (req, res)=> {
    console.log('O pet com  ID: '+req.params.idpet+' foi excluido')
    let updateQuery = `update pet set excluido='true' where idpet=${req.params.idpet}`
    db.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('{}')
        }
        else{ console.log(err.message) }
    })
    db.end;
});

router.get('/pet/:idusuario', (req, res)=> {
    console.log('O pet do usuario com  ID: '+req.params.idusuario+' foi solicitado')
    db.query(`select * from pet where idusuario=${req.params.idusuario} and excluido is false`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    db.end;
});

module.exports = router;