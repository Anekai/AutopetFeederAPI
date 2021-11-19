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

//---------------------------------------------------------------------------------------------------------------

router.get('/refeicao/:iddieta', (req, res)=>{
    console.log('As refeicoes para a dieta com ID: '+req.params.iddieta+' foram solicitadas')
    db.query(`select idrefeicao, nome,  to_char(horario, 'HH24:MI') as horario, quantidadegramas, iddieta from refeicao where refeicao.iddieta=${req.params.iddieta}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    db.end;
});

router.put('/refeicao', (req, res)=> {
    const refeicao = req.body;
    console.log(refeicao)
    console.log(`A refeicao com  ID: ${refeicao.idrefeicao} foi atualizada`)
    let updateQuery = `update refeicao set nome='${refeicao.nome}', horario='${refeicao.horario}', quantidadegramas='${refeicao.quantidadegramas}' where idrefeicao='${refeicao.idrefeicao}'`

    db.query(updateQuery, (err, result)=>{
        if(!err){
            res.send(refeicao)
        }
        else{ console.log(err.message) }
    })
    db.end;
});

router.delete('/refeicao/:idrefeicao', (req, res)=> {
    console.log('A refeicao com  ID: '+req.params.idrefeicao+' foi excluida')
    let updateQuery = `delete from refeicao where idrefeicao=${req.params.idrefeicao}`
    db.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('{}')
        }
        else{ console.log(err.message) }
    })
    db.end;
});

router.post('/refeicao', (req, res)=> {
    const refeicao = req.body;
    console.log(refeicao)
    let insertQuery = `insert into refeicao(idrefeicao, nome, horario, quantidadegramas, iddieta)
                       values(default, '${refeicao.nome}', '${refeicao.horario}', '${refeicao.quantidadegramas}', '${refeicao.iddieta}')`

    db.query(insertQuery, (err, result)=>{
        if(!err){
            res.send(refeicao)
        }
        else{ console.log(err.message) }
    })
    db.end;
});

module.exports = router;