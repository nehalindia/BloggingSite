const Blog = require('../models/blogsModel')
const Author = require('../models/authorModel')

const createBlog = async function(req,res){
    try {
        let data = req.body
        if(!data.title){
            return res.status(400).send({msg : 'blog title is required'})
        }
        if(!data.body){
            return res.status(400).send({msg : 'blog body is required'})
        }
        if(!data.authorId){
            return res.status(400).send({msg : 'blog author id is required'})
        }
        if(!data.tags){
            return res.status(400).send({msg : 'blog tags is required'})
        }
        if(!data.category){
            return res.status(400).send({msg : 'blog category is required'})
        }
        if(!data.subcategory){
            return res.status(400).send({msg : 'blog subcategory is required'})
        }
        const validId = await Author.findById(data.authorId);
        if(validId){
            const blog = await Blog.create(data);
            res.status(201).send({data : blog, msg : 'blog is succesfully created'})
        }
       else{
        res.status(400).send({message : 'maybe author id is not valid'})
       }
        
    } catch (error) {
        res.status(500).send({msg : error.message})
    }

}

const blogs = async (req, res) => {
    try {
      const filters = {};
      for (const key in req.query) {
        if (key == 'tags' || key == 'subcategory') {
          filters[key] = { $in: req.query[key].split(',') };
          } else {
           filters[key] = req.query[key];
         }
      }
      
      filters["isDeleted"] = false
      filters["isPublished"] = true

      const result = await Blog.find(filters);
      res.status(200).json({ status: true, message: "Blogs List", data: result });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message.toString() });
    }
  };


  const updateBlog = async (req, res) => {
    try {
        let blogId = req.params.blogId;
        let data = req.body;
    
        let blog = await Blog.findOne({ _id: blogId, isDeleted: false });
        if (!blog) {
            return res.status(404).send({ 
                status: false,
                message: 'Blog not found'
             });
        }

        const updatedData = {
            ...data,
            title: data.title,
            body: data.body,
            tags: blog.tags.concat(data.tags || []),
            subcategory: blog.subcategory.concat(data.subcategory || []),
            isPublished: data.isPublished,
            publishedAt: data.isPublished ? new Date() : undefined
        };

        const updatedblog = await Blog.findOneAndUpdate(
            { _id: blogId, isDeleted: false }, 
            updatedData, 
            { new: true }
        );
        res.status(200).send({
            status: true,
            message: "Blog updated successfully",
            data: updatedblog
        });
    } catch (err) {
        res.status(500).send({msg:err.message});
    }
}

const deleteBlog = async function(req,res){
  let id = req.params.blogId
  let result = await Blog.findById(id)
  if(!result) {return res.status(404).send({status: false, msg: "Id not found"})}
  if(result.isDeleted) {return res.status(404).send({status: false, msg: "Blog is already Deleted"})}

  const dateUp = {deletedAt : new Date(), isDeleted :true}
  try{
      await Blog.updateOne({_id:id}, {$set : dateUp})
      res.status(200).send({status:true})
  }
  catch(error){
      res.status(500).json({message:error.message})
  }    
}

const deleteBlogQuery = async function(req,res){
    
//   let filters = req.query
const filters = {};
      for (const key in req.query) {
        if (key == 'tags' || key == 'subcategory') {
          filters[key] = { $in: req.query[key].split(',') };
          } else {
           filters[key] = req.query[key];
         }
      }
  let result = await Blog.findOne(filters).select({_id:1,isDeleted:1})
  if(!result) {return res.status(404).send({status: false, msg: "Id not found"})}
  if(result.isDeleted) {return res.status(404).send({status: false, msg: "Blog is already Deleted"})}
  let id = result._id

  const dateUp = {deletedAt : new Date(), isDeleted :true}
  try{
      await Blog.updateOne({_id:id},
          {$set : dateUp},
          {new :true}
      )
      res.status(200).send({status:true})
  }
  catch(error){
      res.status(500).json({message:error.message})
  }    
}

module.exports = {createBlog,blogs,updateBlog,deleteBlog,deleteBlogQuery}