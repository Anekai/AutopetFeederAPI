const express = require('express');
const app = express();

app.listen(3300, ()=>{
    console.log("Server is now listening at port 3300");
});

app.use(express.json());

const authRouter = require('../routes/auth.js');
const userRouter = require('../routes/user.js');
const commandRouter = require('../routes/command.js');
const feederRouter = require('../routes/feeder.js');
const dietRouter = require('../routes/diet.js');
const petRouter = require('../routes/pet.js');
const mealRouter = require('../routes/meal.js');
const readingRouter = require('../routes/reading.js');


app.use(authRouter);
app.use(userRouter);
app.use(commandRouter);
app.use(feederRouter);
app.use(dietRouter);
app.use(petRouter);
app.use(mealRouter);
app.use(readingRouter);

