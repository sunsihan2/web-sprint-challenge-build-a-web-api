// Write your "actions" router here!
const express = require('express')
const {checkActionId, validateAction} = require('./actions-middlware')
const actions = require('./actions-model')
const router = express.Router()

router.get('/',(req, res,next)=> {
    actions.get()
        .then(action=> {
            res.json(action)
        })
        .catch(next)
})

router.get('/:id', checkActionId, (req, res)=> {
    res.json(req.action)
})
router.post('/', validateAction, (req, res,next)=> {
    actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(next)
})

router.put('/:id', checkActionId, validateAction,(req, res,next)=> {
    actions.update(req.params.id, req.body)
        .then(action => {
            res.json(action)
        })
        .catch(next)
})

router.delete('/:id', checkActionId,(req, res,next)=> {
    actions.remove(req.params.id)
        .then(()=> {
            res.status(200).json({message:'deleted'})
        })
        .catch(next)
} )
module.exports= router