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

//---------------------------------------------------------------------------------------------------------------------------

router.get('/dieta/usuario/:idusuario', (req, res)=>{
    console.log('A dieta para o usuario com ID: '+req.params.idusuario+' foi solicitado')
    db.query(`select dieta.iddieta, dieta.nome, dieta.idpet from dieta, pet where dieta.idpet=pet.idpet and pet.idusuario=${req.params.idusuario} and dieta.excluido=false`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    db.end;
});

router.get('/dieta/:iddieta', (req, res)=>{
    console.log('A dieta com ID: '+req.params.iddieta+' foi solicitada')
    db.query(`select * from dieta where dieta.iddieta=${req.params.idusuario} and excluido=false`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    db.end;
});

router.delete('/dieta/:iddieta', (req, res)=> {
    console.log('A dieta com  ID: '+req.params.iddieta+' foi excluida')
    let updateQuery = `update dieta set excluido='true' where iddieta=${req.params.iddieta}; delete from refeicao where iddieta=${req.params.iddieta}`
    db.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('{}')
        }
        else{ console.log(err.message) }
    })
    db.end;
});

router.post('/dieta', (req, res)=> {
    const dieta = req.body;
    console.log(dieta)
    let insertQuery = `insert into dieta(iddieta, nome, idpet, excluido)
                       values(default, '${dieta.nome}', ${dieta.idpet}, 'false')`

    db.query(insertQuery, (err, result)=>{
        if(!err){
            res.send(dieta)
        }
        else{ console.log(err.message) }
    })
    db.end;
});

router.put('/dieta', (req, res)=> {
    const dieta = req.body;
    console.log(dieta)
    console.log(`A dieta com  ID: ${dieta.iddieta} foi atualizada`)
    let updateQuery = `update dieta set nome='${dieta.nome}', idpet='${dieta.idpet}' where iddieta='${dieta.iddieta}'`

    db.query(updateQuery, (err, result)=>{
        if(!err){
            res.send(dieta)
        }
        else{ console.log(err.message) }
    })
    db.end;
});

module.exports = router;