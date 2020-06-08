const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const Task = require('../models/task')

// GET /tasks?completed?true
router.get('/tasks',auth, async (req, res) => {
    const match = {}
    const sort = {}

    try {
        
        if(req.query.completed) {
            match.completed = req.query.completed === 'true'
        }

        if(req.query.sort){
            const sortParam = req.query.sort.split(':')
            sort[sortParam[0]] = sortParam[1] === "desc" ? -1 : 1
        }

        //match.author = req.user._id.toString()
        //const tasks = await Task.find(match)

        const user = await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()

        res.send(user.tasks);
    }
    catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({_id, author: req.user._id})
        if(!task) {
            return res.status(404).send('Task not Found')
        }
        res.send(task);
    }
    catch(e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']

    const isUpdateValid = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    if(!isUpdateValid) {
        return res.status(400).send('Invalid update parameters')
    }

    try {

        //const task = await Task.findById(_id)
        const task = await Task.findOne({_id, author: req.user._id})

        if(!task) {
            return res.status(404).send('Task not Found')
        }
        

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()

        res.send(task);
    }
    catch(e) {
        console.log(e);
        res.status(500).send(e)
    }
})

router.post('/tasks',auth, async (req, res) => {
    try {
        //const task = new Task(req.body)
        const task = new Task({
            ...req.body,
            author: req.user._id
        })
        await task.save()
        res.status(201).send(task)
    }
    catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id',auth , async (req, res) => {
    try {
       //const task = await Task.findByIdAndDelete(req.params.id)
       const task = await Task.findOneAndDelete({_id: req.params.id, author: req.user._id})

       if(!task) {
           return res.status(404).send()
       }
        return res.send()
    }
    catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router
