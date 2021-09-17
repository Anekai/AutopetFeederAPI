const express = require('express');
const router = express.Router();
const db = require('./../connection.js');

db.connect();

router.get('/acoes', (req, res)=>{
    db.query(`select * from acao`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    db.end;
});

router.get('/acoes/:id', (req, res)=>{
    db.query(`select * from acao where idAcoes=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    db.end;
});

router.post('/acoes', (req, res)=> {
    const model = req.body;
    let insertQuery = `insert into acao(idAlimentador, data, qtderacaoArbitraria, racaoArbitrariaLiberada) 
                       values(${model.idAlimentador}, '${model.data}', '${model.qtderacaoArbitraria}', '${model.racaoArbitrariaLiberada}')`;

    db.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    });
    db.end;
});

router.put('/acoes/:id', (req, res)=> {
    let model = req.body;
    let updateQuery = `update acao
                       set idAlimentador = '${model.idAlimentador}',
                       data = '${model.data}',
                       qtderacaoArbitraria = '${model.qtderacaoArbitraria}',
                       racaoArbitrariaLiberada = '${model.racaoArbitrariaLiberada}'
                       where id = ${model.id}`;

    db.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    });
    db.end;
});

router.delete('/acoes/:id', (req, res)=> {
    let insertQuery = `delete from acao where idAcoes=${req.params.id}`

    db.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    db.end;
});

module.exports = router;