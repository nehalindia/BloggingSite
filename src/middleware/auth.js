const jwt = require('jsonwebtoken');
const Author = require('../models/authorModel');
const Blog = require('../models/blogsModel')
const bcrypt = require('bcrypt');

const hashPass = async function(req, res, next){
    try{
        if(!req.body.password) { return res.status(404).send({msg : "author password is required"})}
        console.log("hash pass")
        const pass = await bcrypt.hash(req.body.password, 12)
        req.body.password = pass
        next()
    }catch (error) {
        res.status(500).send({msg : error.message})
    }
}

const auth = async (req,res,next)=>{
    try{
        const {email,password} = req.body;
        const user = await Author.findOne({email:email});
        if(!user) return res.status(404).send("invalid user!");
        const hashPass = await bcrypt.compare(password,user.password);
        if(hashPass===true){ 
            next();
        }
    }catch (error) {
        res.status(404).send({msg : error.message})
    }
};
    
const auth2 = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token) return res.send({status:false,message:"token is requires!"});
        const decoding = jwt.verify(token, "secret-key-for-login");
        if(!decoding) return res.send({status:false,message:"Invalid token!"});
        const theUser = await Author.findById(decoding.userId);
        req.Author = theUser;
         let id = await Blog.findOne({authorId:req.params.blogId})
         if(!id) return res.status(403).send({msg :"user unauthorized"})
        next()
    } catch (error) {
        res.status(404).send({error:error.message});
    }
};

module.exports = {auth,auth2,hashPass};