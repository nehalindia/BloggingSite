const jwt = require('jsonwebtoken');
const Author = require('../models/authorModel');
const Blog = require('../models/blogsModel')
const bcrypt = require('bcrypt');

const hashPass = async function(req, res, next){
    try{
        if(!req.body.password) { return res.status(404).send({msg : "author password is required"})}
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
        res.status(500).send({msg : error.message})
    }
};
    
const auth2 = async(req,res,next)=>{
    try {
        // const token = req.headers.authorization.split(" ")[1];
        const token = req.headers["x-api-key"]
        // console.log(req.headers.authorization)
        if(!token) return res.send({status:false,message:"token is requires!"});
        const decoding = jwt.verify(token, process.env.JWT_SECRET_KEY) //(err, token) => {
        //    if(err) return res.status(404).send({status:false,message:"Invalid token!"});
        // });
        if(!decoding) return res.send({status:false,message:"Invalid token!"});
        const user = await Author.findById(decoding.userId)
        let id={}
        if(req.params.blogId){
            id = await Blog.findOne({_id:req.params.blogId})
            // console.log(user._id, req.params.blogId,id)
        }else if(Object.keys(req.query).length !== 0){
            const filters = {};
            for (const key in req.query) {
                if (key == 'tags' || key == 'subcategory') {
                    filters[key] = { $in: req.query[key].split(',') };
                } else {
                    filters[key] = req.query[key];
                }
                filters["authorId"]=user._id.toString()
            }
            id = await Blog.findOne(filters).select({authorId:1})
            console.log( user._id,req.query,id)
        }else if(Object.keys(req.query).length===0) return res.status(403).send({msg :"Add Query Parameters"})
       
        if(id === null) return res.status(403).send({msg :" Data not found"})
        if(id.authorId != user._id ) return res.status(403).send({msg :"user unauthorized"})
        
        next()
    } catch (error) {
        res.status(500).send({error:error.message});
    }
};

const auth3 = async(req,res,next)=>{
    try {
        const token = req.headers["x-api-key"]
        if(!token) return res.send({status:false,message:"token is requires!"});
        const decoding = jwt.verify(token, process.env.JWT_SECRET_KEY) //(err, token) => {
            // if(err) return res.status(404).send({status:false,message:"Invalid token!"});
        // });
        if(!decoding) return res.send({status:false,message:"Invalid token!"});
        const theUser = await Author.findById(decoding.userId);

        // if(req.body.authorId != theUser._id) return res.status(404).send({msg : "Not valid a author!"})
        next()
    } catch (error) {
        res.status(500).send({error:error.message});
    }
};

module.exports = {auth,auth2,hashPass, auth3};