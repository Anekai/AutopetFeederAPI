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

//-------------------------------------------------------------------------------------------------------------------

router.get('/alimentador/:idusuario', (req, res)=>{
    console.log('O alimentador do usuario com ID: '+req.params.idusuario+' foi solicitada')
    db.query(`select * from alimentador where alimentador.idusuario=${req.params.idusuario} and excluido=false`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    db.end;
});

router.get('/alimentador/emailUsuario/:idalimentador', (req, res)=>{
    console.log('O email do usuario vinculado ao alimentador com ID: '+req.params.idalimentador+' foi solicitado')
    db.query(`select usuario.email from alimentador, usuario where alimentador.idusuario = usuario.idusuario and idalimentador=${req.params.idalimentador} and excluido=false`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    db.end;
});

router.get('/alimentador/dieta/:idalimentador', (req, res)=>{
    console.log('A dieta para o alimentador com ID: '+req.params.idalimentador+' foi solicitado')
    db.query(`select to_char(horario, 'HH24:MI') as horario, quantidadegramas from alimentador, refeicao where alimentador.iddieta = refeicao.iddieta and alimentador.idalimentador = ${req.params.idalimentador}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    db.end;
});

router.post('/alimentador', (req, res)=> {
    const alimentador = req.body;
    console.log(alimentador)
    let insertQuery = `insert into alimentador(idalimentador, serial, idusuario, idpet, iddieta, excluido)
                       values(default, '${alimentador.serial}', '${alimentador.idusuario}', '${alimentador.idpet}', '${alimentador.iddieta}', 'false')`

    db.query(insertQuery, (err, result)=>{
        if(!err){
            res.send(alimentador)
        }
        else{ console.log(err.message) }
    })
    db.end;
});

router.delete('/alimentador/:idalimentador', (req, res)=> {
    console.log('O alimentador com  ID: '+req.params.idalimentador+' foi excluido')
    //let updateQuery = `update alimentador set excluido='true' where idalimentador=${req.params.idalimentador}`
    let updateQuery = `update alimentador set excluido='true', serial=((select serial from alimentador where idalimentador=${req.params.idalimentador}) || '#' ||(SELECT MD5(random()::text))) where idalimentador=${req.params.idalimentador}`
    db.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('{}')
        }
        else{ console.log(err.message) }
    })
    db.end;
});

router.put('/alimentador', (req, res)=> {
    const alimentador = req.body;
    console.log(alimentador)
    console.log(`O alimentador com  ID: ${alimentador.idalimentador} foi atualizado`)
    let updateQuery = `update alimentador set serial='${alimentador.serial}', idpet='${alimentador.idpet}', iddieta='${alimentador.iddieta}' where idalimentador='${alimentador.idalimentador}'`

    db.query(updateQuery, (err, result)=>{
        if(!err){
            res.send(alimentador)
        }
        else{ console.log(err.message) }
    })
    db.end;
});

module.exports = router;