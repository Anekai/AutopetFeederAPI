const express = require('express');
const app = express();

app.listen(3300, ()=>{
    console.log("Server is now listening at port 3300");
});

const acaoRouter = require('../routes/user.js');
const alimentadorRouter = require('../routes/user.js');
const dietaRouter = require('../routes/user.js');
const petRouter = require('../routes/user.js');
const racaoRouter = require('../routes/user.js');
const refeicaoRouter = require('../routes/user.js');
const sensorRouter = require('../routes/user.js');
const userRouter = require('../routes/user.js');

app.use(acaoRouter);
app.use(alimentadorRouter);
app.use(dietaRouter);
app.use(petRouter);
app.use(racaoRouter);
app.use(refeicaoRouter);
app.use(sensorRouter);
app.use(userRouter);

