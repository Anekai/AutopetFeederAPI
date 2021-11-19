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

//-------------------------------------------------------------------------------------------------------------

router.post('/sensor', (req, res)=> {
    const user = req.body;
    console.log(user)
    const json = JSON.stringify(user.sensores)
    console.log(json)
    let insertQuery = `insert into sensor(idsensor, idalimentador , data, sensores)
                       values(default, (select idalimentador from alimentador where serial='${user.serialalimentador}'), '${user.data}', '${json}')`
    console.log(insertQuery)
    db.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('{}')
        }
        else{
		console.log(err.message);
		res.send('{}');
	}

    })
    db.end;
})

router.get('/sensor/:idalimentador', (req, res)=>{
    db.query(`select idsensor, sensor.idalimentador, to_char(data, 'DD/MM/YYYY HH24:MI:SS') as data, sensores from sensor where idalimentador='${req.params.idalimentador}'`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    db.end;
});

router.get('/sensor/ultimaLeitura/:idalimentador', (req, res)=>{
    db.query(`select idsensor, sensor.idalimentador, to_char(data, 'DD/MM/YYYY HH24:MI:SS') as data, sensores from sensor where idalimentador='${req.params.idalimentador}' order by sensor.data desc limit 1`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
});

router.post('/sensor/temperaturaUmidade/', (req, res)=>{
    //const json = JSON.stringify(req.body);
    //console.log(json);
    const requisicao = req.body[0];
    //console.log(requisicao)
    console.log('Foi solicitado os dados dos sensores de temperatura e umidade do alimentador com ID: '+requisicao.idalimentador+' nas datas de: '+requisicao.dataInicio+'  ate: '+requisicao.dataFim+'');
    //console.log('Foi solicitado os dados dos sensores de temperatura e umidade do alimentador com ID: '+json.idalimentador+' nas datas de: '+json.dataInicio+'  ate: '+json.dataFim+'');
    db.query(`select  to_char(temperaturaUmidade.data, 'DD/MM - HH24:MI') as data , temperaturaUmidade.temperatura, temperaturaUmidade.umidade from (select date_trunc('hour', sensor.data) as data, TRUNC(avg((sensores->>'temperatura')::numeric),2) as "temperatura", TRUNC(avg((sensores->>'umidade')::numeric),2) as "umidade" from sensor where sensor.data >= to_date('${requisicao.dataInicio}','DD-MM-YYYY') and sensor.data <= to_date('${requisicao.dataFim}','DD-MM-YYYY')+1  and sensor.idalimentador='${requisicao.idalimentador}' group by 1 order by data asc) as temperaturaUmidade`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    db.end;
});

router.post('/sensor/liberacoes/', (req, res)=>{
    const requisicao = req.body[0];
    console.log('Foi solicitado os dados de liberacao do alimentador com ID: '+requisicao.idalimentador+' nas datas de: '+requisicao.dataInicio+'  ate: '+requisicao.dataFim+'');
    db.query(`select to_char(dataLiberacao, 'DD/MM - HH24:MI') as data, qtdeLiberada, qtdeSolicitada, status  from (select * from (select distinct(TO_TIMESTAMP(sensores->'ultimaLiberacao'->>'dataUltimaLiberacao', 'DD-MM-YYY HH24:MI:SS')) as dataLiberacao, ((sensores->'ultimaLiberacao'->>'quantidadeLiberada')::numeric) as qtdeLiberada, ((sensores->'ultimaLiberacao'->>'quantidadeSolicitada')::numeric) as qtdeSolicitada, ((sensores->'ultimaLiberacao'->>'status')) as status  from sensor where sensor.idalimentador='${requisicao.idalimentador}') as liberacoes where liberacoes.dataLiberacao is not null and liberacoes.dataLiberacao >= to_date('${requisicao.dataInicio}','DD-MM-YYYY') and liberacoes.dataLiberacao <= to_date('${requisicao.dataFim}','DD-MM-YYYY')+1 order by liberacoes.dataLiberacao) as liberacoesRange`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    db.end;
});

module.exports = router;