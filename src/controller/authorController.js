const Author = require('../models/authorModel')
const jwt = require('jsonwebtoken');
require('dotenv').config

// Create Author
const createAuthor = async (req,res) => {
    try {
        let data = req.body;

        if(!data) {
            return res.status(400).send({status: false, message:  'author data is required'})
        } 
        if(!data.fname){
            return res.status(400).send({status: false,message:  'author first name is required'})
        }
        if(!data.lname){
            return res.status(400).send({status: false,message:  'author last name is required'})
        }
        if(!data.email){
            return res.status(400).send({status: false, message:  'author email is required'})
        }
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(data.email)) {
            return res.status(400).send({status: false, message:  'Email should be a valid email address'})
        }
        data.email = data.email.toLowerCase()
        const existingAuthor = await Author.findOne({ email: data.email });
        if(existingAuthor) {
                return res.status(400).send({status: false, message:  'Email already exists'});
        }
        if(!data.title){
            return res.status(400).send({status: false, message:  'author title is required'})
        }
        if (!['Mr', 'Mrs', 'Miss'].includes(data.title)) {
            return res.status(400).json({status: false, message:  'Invalid title. Author title will only include - Mr, Mrs, Miss' });
        }

        let createAuthor = await Author.create(req.body);
        res.status(201).send({
            status: true,
            message:  'author is succesfully created',
            data : createAuthor, 
        })
    } catch (error) {
        res.status(500).send({status: false, message:  error.message})
    }
}

const login = async (req,res)=>{
    try {
        const user = await Author.findOne({email:req.body.email});
        const token = jwt.sign({userId:user._id.toString()}, 
          process.env.JWT_SECRET_KEY,{
                expiresIn:"5d"
            });
        res.status(200).json({status:true, message:token})
    } catch (error) {
        res.status(500).send({status: false, message:  error.message})
    }
}



module.exports = {createAuthor,login}