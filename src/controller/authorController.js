const Author = require('../models/authorModel')

// Create Author
const createAuthor = async (req,res) => {
    try {
        let data = req.body;

        if(!data) {
            return res.status(400).send({msg : 'author data is required'})
        } 
        if(!data.fname){
            return res.status(400).send({msg : 'author first name is required'})
        }
        if(!data.lname){
            return res.status(400).send({msg : 'author last name is required'})
        }
        if(!data.email){
            return res.status(400).send({msg : 'author email is required'})
        }
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(data.email)) {
            return res.status(400).send({msg: 'Invalid email format'})
        }
        const existingAuthor = await Author.findOne({ email: data.email });
            if (existingAuthor) {
                return res.status(400).send({ msg: 'Email already exists'});
        }
        if(!data.password){
            return res.status(400).send({msg : 'author password is required'})
        }
        if(!data.title){
            return res.status(400).send({msg : 'author title is required'})
        }
        if (!['Mr', 'Mrs', 'Miss'].includes(data.title)) {
            return res.status(400).json({ error: 'Invalid title. Author title will only include - Mr, Mrs, Miss' });
        }

        let createAuthor = await Author.create(req.body);
        res.status(201).send({
            status: true,
            msg : 'author is succesfully created',
            data : createAuthor, 
        })
    } catch (error) {
        res.status(500).send({msg : error.message})
    }
}




module.exports = {createAuthor}