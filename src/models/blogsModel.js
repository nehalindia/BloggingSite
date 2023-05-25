const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({    
        title : {
            type : String,
            required : true
        },
        body : {
            type : String,
            required : true
        },
        authorId : {
            ref : "Author",
            type : mongoose.Schema.Types.Mixed,
            required : true,
        },
        tags : {
            type : [String],
        },
        category : {
            type : String,
            required : true,
           
        },
        subcategory : {
            type : [String],

        },
        deletedAt : {
            type : Date,
        },
        isDeleted : {
            type : Boolean,
            default : false
        },
        publishedAt : {
            type : Date,
        },
        isPublished : {
            type : Boolean,
            default : false
        },

},{timestamps : true})

const Blog = mongoose.model("Blog",blogSchema);

module.exports = Blog;

