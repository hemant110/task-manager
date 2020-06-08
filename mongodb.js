const {MongoClient, ObjectID} = require('mongodb');

//const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017'

const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true,useUnifiedTopology: true}, (error, client) => {
    if(error) {
        return  console.log('Unable to connect to database.');
    }

    console.log('connected correctly!');

    const db = client.db(databaseName);

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5ed1fc47633b44b5e809cc2e")
    // }, {
    //     $set: {
    //         name: 'Manish Kumar'
    //     }
    // }).then((result)=>{
    //     console.log(result.modifiedCount);
    // }).catch((err) => {
    //     console.log(err);
    // })
    
    db.collection('tasks').updateMany({},{
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result.modifiedCount);
    }).catch((err) => {
        console.log(err);
    });

    // db.collection('users').findOne({_id: new ObjectID('5ed1fe326742bb2a9094aaa9')}, (error, result) => {
    //     if(error){
    //         return console.log('unable to fetch');
    //     }
    //     console.log(result);
    // });

    // db.collection('tasks').find({completed: false}).toArray((error, result) => {

    //     if(error){
    //         return console.log('unable to fetch');
    //     }
    //     console.log(result);
    // })
    // db.collection('tasks').find().count((error, count) => {

    //     if(error){
    //         return console.log('unable to fetch');
    //     }
    //     console.log(count);
    // })
    // db.collection('users').insertOne({
    //     name: 'Hemant',
    //     age: 30
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('unable to insert user.');
    //     }

    //     console.log(result.ops);
    // })

    // db.collection('users').insertMany([{
    //     name: 'Tarun',
    //     age: 27
    // }, {
    //     name:'Rahul',
    //     age: 31
    // },{
    //     name:'Mohit',
    //     age:30
    // }], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert.')
    //     }
    //     console.log(result.ops);
    // })

    // db.collection('tasks').insertMany([{
    //     description: 'first process',
    //     completed: false
    // }, {
    //     description: 'second process',
    //     completed: true
    // }], (error, result) => {
    //     if(error) {
    //         return console.log('unable to insert');
    //     }

    //     console.log(result.ops);
    // })

})