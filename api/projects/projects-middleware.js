// add middlewares here related to projects
const Projects = require('./projects-model')

async function checkProjectId(req, res, next){
    try{
        const project = await Projects.get(req.params.id)
        if(project){
            req.project = project
            next()
        }else{
            next({status:404, message:'not found!!!'})
        }
    }catch(err){
        next(err)
    }
}

function validateProject (req, res, next){
    const {name, description, completed} = req.body
    if( !name || !description|| !name.trim() ||!description.trim() || completed==undefined){
        res.status(400).json({
            message:"missing required field"
        })
    }else {
        req.name = name.trim()
        req.description = description.trim()
        next()
    }
}

module.exports = {
    checkProjectId,
    validateProject
}