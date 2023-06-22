const jwt = require('jsonwebtoken');
const Author = require('../models/authorModel');
const Blog = require('../models/blogsModel')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
require('dotenv').config

const hashPass = async function(req, res, next){
    try{
        // req.body.email = req.body.email.toLowerCase()
        if(!req.body.password) { return res.status(400).send({status: false, message: "Password is required"})}
        const pass = await bcrypt.hash(req.body.password, 12)
        req.body.password = pass
        next()
    }catch (error) {
        res.status(500).send({status:false, message:  error.message})
    }
}

const auth = async (req,res,next)=>{
    try{
        if(!req.body.email){
            return res.status(400).send({status: false, message:  'author email is required'})
        }
        req.body.email = req.body.email.toLowerCase()
        const {email,password} = req.body;
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            return res.status(400).send({status: false, message:  'Email should be a valid email address'})
        }
        const user = await Author.findOne({email:email});
        // console.log(user, req.body)
        if(!user) return res.status(401).send({status:false, message: "invalid user!"});
        if (!password) {
            return res.status(400).send({status: false, message:  'Password must added'})
        }
        const hashPass = await bcrypt.compare(password,user.password);
        if(hashPass){ 
            next();   
        }else{
        return res.status(401).send({status:false, message: "Password Not Matched!"});
        }
    }catch (error) {
        res.status(500).send({status:false, message:  error.message})
    }
};
    


const auth3 = async(req,res,next)=>{
    try {
        const token = req.headers["x-api-key"]
        if(!token) {return res.status(401).send({status:false, message: "token is requires!"})}
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
            // if(err) {return res.status(403).send({status:false,message:"Invalid token!"}) }
            // else{       
                if(!ObjectId.isValid(decoded.userId)) {
                    res.status(400).send({status: false, message: ` not a valid token id`})
                    return
                }
                const theUser = await Author.findOne({_id:decoded.userId})
                if(!theUser){ return res.status(401).json({status: false, msg: "author not login"})}
                req.userId = decoded.userId
                next()
            // }
         })
    } catch (error) {
        res.status(500).send({status:false, message: error.message});
    }
};

const auth4 = async(req,res,next)=>{
    try {
        const token = req.headers["x-api-key"]
        
        if(!token) return res.status(401).send({status:false, message:"token is requires!"});

        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
            if(err) {return res.status(404).send({status:false,message:"Invalid token!"}) }
            else{       
                if(!ObjectId.isValid(decoded.userId) || !ObjectId.isValid(req.body.authorId)) {
                    res.status(400).send({status: false, message: `Not a valid author id`})
                    return
                }
                const theUser = await Author.findOne({_id:decoded.userId})
                if(!theUser){ return res.status(401).json({status: false, msg: "author not login"}) }
                
                next()               
            }
         })
        
    } catch (error) {
        res.status(500).send({status:false, message: error.message});
    }
};
const auth2 = async(req,res,next)=>{
    try {
        // const token = req.headers.authorization.split(" ")[1];
        const token = req.headers["x-api-key"]
        // console.log(token)
        let user = {}
        if(!token){ return res.status(401).send({status:false, message:"token is requires!"}) }
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoding) => {
            if(err){ return res.status(404).send({status:false,message:"Invalid token!"})}
            else{
                if(!ObjectId.isValid(decoding.userId)) {
                    res.status(400).send({status: false, message: `not a valid token id`})
                    return
                }

                user = await Author.findOne({_id:decoding.userId})
            }
         })
        
        let id={}
        if(req.params.blogId){
            
            id = await Blog.findOne({_id:req.params.blogId})
            console.log(user._id, id.authorId)
        }else if(Object.keys(req.query).length !== 0){
            const filters = {};
            for (const key in req.query) {
                if (key == 'tags' || key == 'subcategory') {
                    filters[key] = { $in: req.query[key].split(',') };
                } else {
                    filters[key] = req.query[key];
                }
                filters["authorId"]=user._id
            }
            id = await Blog.findOne(filters).select({authorId:1})
            console.log( user._id,req.query,id)
        }else if(Object.keys(req.query).length===0){ return res.status(400).send({status:false, message: "Add Query Parameters"})}
       
        if(id === null){ return res.status(404).send({status:false, message: "Wrong Blog"}) }
        if(id.authorId.toString() != user._id.toString() ) {return res.status(403).send({status:false, message: "user unauthorized"}) }
        
        next();
    } catch (error) {
        res.status(500).send({status:false, message: error.message});
    }
};
module.exports = {auth,auth2,hashPass, auth3,auth4};