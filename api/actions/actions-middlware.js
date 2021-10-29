// add middlewares here related to actions
const actions = require('./actions-model')

async function checkActionId( req, res, next){
    try{
        const action = await actions.get(req.params.id)
        if(action){
            req.action = action
            next()
        }else{
            next({status:404, message:'not found!!!'})
        }
    }catch(err){
        next(err)
    }
}

function validateAction(req, res, next){
    console.log(req.body)
    const {project_id,description,notes, completed} = req.body
    if(project_id ===undefined || !description || !description.trim() || !notes|| !notes.trim() ){
        res.status(400).json({
            message:"missing required text field"
        })
    }else{
        req.description = description.trim()
        req.notes = notes.trim()
        req.project_id= project_id
        req.completed = completed
        next()
    }
}
module.exports={
    checkActionId,
    validateAction
}