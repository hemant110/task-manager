const express = require('express')
require('./db/mongoose')
const bcrypt = require('bcryptjs');

const userRouter = require('./routes/user')
const taskRouter = require('../src/routes/task')

const app = express()
const port = process.env.PORT || process.env.PORT

app.use(express.json())
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log('server is up on port '+ port);
})
