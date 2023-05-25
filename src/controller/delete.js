const Author = require('../models/blogsModel')

const deleteBlog = async function(req,res){
    let id = req.params.blogId
    const date = new Date()
    let result = await Author.findById(id)
    if(!result) {return res.status(404).send({status: false, msg: "Id not found"})}

    const dateUp = {deletedAt : date}
    const isdeletd = { isDeleted :true}
    try{
        await Author.updateOne({_id:id},
            {$set : dateUp},
            {new :true}
        )
        let savedata = await Author.updateOne({_id:id},
            {$set : isdeletd},
            {new :true}
        )
        res.status(200).send({status:true})
    }
    catch(error){
        console.log(error.message);
        res.status(501).json({message:error.message})
    }    
}

const deleteBlog1 = async function(req,res){
    let data = req.query
    
    const date = new Date()
    let result = await Author.findOne({data}).select({_id:1})
    if(!result) {return res.status(404).send({status: false, msg: "Id not found"})}
    let id = result._id

    const dateUp = {deletedAt : date}
    const isdeletd = { isDeleted :true}
    try{
        await Author.updateOne({_id:id},
            {$set : dateUp},
            {new :true}
        )
        let savedata = await Author.updateOne({_id:id},
            {$set : isdeletd},
            {new :true}
        )
        res.status(200).send({status:true})
    }
    catch(error){
        console.log(error.message);
        res.status(501).json({message:error.message})
    }    
}

module.exports = {deleteBlog,deleteBlog1}
