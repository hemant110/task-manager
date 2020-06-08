const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-api';

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})


// const me = new User({
//     name: '  Mike ',
//     email: 'MikeEmail@gmail.com  ',
//     password: '  mike@123  '
// })
// .save()  
// .then((result) => {
//     console.log(result);
// })
// .catch((error) => {
//     console.log('Error!', error)
// })


// const task = new Task({
//     description: 'Washing  '
// }).save().then((result) => {
//     console.log(result)
// })
// .catch((error) => {
//     console.log(error);
// })