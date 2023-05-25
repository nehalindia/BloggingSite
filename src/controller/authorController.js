const Author = require('../models/authorModel')

async function createAuthor(req,res){
    try {
        let data = await Author.create(req.body);
        res.status(201).send({data : data, msg : 'author is succesfully created'})
    } catch (error) {
        res.status(500).send({msg : error.message})
    }
}




module.exports = {createAuthor}