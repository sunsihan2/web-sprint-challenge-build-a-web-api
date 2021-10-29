// Write your "projects" router here!
const express = require('express')
const {checkProjectId, validateProject} = require('./projects-middleware')
const projects = require('./projects-model')
const router = express.Router()

router.get('/',(req, res, next) => {
    projects.get()
        .then(resource =>{
            if (resource===null){
                return [];
            }else {
                res.json(resource)
            }
        })
        .catch(next)
})
router.get('/:id', checkProjectId, (req, res)=> {
    res.json(req.project)
})

router.post('/', validateProject, (req, res, next)=> {
    projects.insert(req.body)
        .then( resource => {
            res.status(201).json(resource)
        })
        .catch(next)
})

router.put('/:id', checkProjectId, validateProject, (req, res, next)=> {
    projects.update(req.params.id, req.body)
        .then(resource => {
            res.json(resource)
        })
        .catch(next)
})

router.delete('/:id', checkProjectId, (req, res, next) => {
    projects.remove(req.params.id)
        .then(()=> {
            res.status(200).json({message: 'deleted'})
        })
        .catch(next)
})

router.get('/:id/actions', checkProjectId, (req, res, next) => {
    projects.getProjectActions(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
})

module.exports= router