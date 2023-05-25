const blogModel = require('../models/blogsModel');
const authorModel = require('../models/authorModel');

const blogs = async (req,res)=>{
    try {
        const result = await blogModel.find({$and:[
            {isDeleted:false},
            {isPublished:true}
        ]}); 
        res.status(200).json({status:true,message:"Blogs List",data:result});
    } catch (error) {
        res.status(404).json({status:false,message:error.mesage});
    }
};

const filterBlogs = async (req, res) => {
    try {
      const filter = {};

      if (req.query.authorId) {
        filter.authorId = req.query.authorId;
      }
      if (req.query.category) {
        filter.category = req.query.category;
      }
      if (req.query.tags) {
        filter.tags = req.query.tags;
      }
      if (req.query.subCategory) {
        filter.subCategory = req.query.subCategory;
      }
      const result = await new blogModel.find({filter});
      res.status(200).json({ status: true, message: "Blogs List", data: result });
    } catch (error) {
      res.status(404).json({ status: false, message: error.message.toString() });
    }
  };


const updateBlog = async (req, res) => {
    try {
        let blogId = req.params.blogId;
        let data = req.body;
    
        let blog = await blogModel.findOne({ _id: blogId, isDeleted: false });
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

        const updatedblog = await blogModel.findOneAndUpdate(
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
        res.status(500).send(err);
    }
}


module.exports = { 
    blogs,
    filterBlogs,
    updateBlog 
} 