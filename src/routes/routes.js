const express = require('express')
const router = express.Router();

const {createAuthor}= require('../controller/authorController')

const {createBlog,blogs,filterBlogs,updateBlog,deleteBlog,deleteBlogQuery} = require('../controller/blogController')

router.post('/authors',createAuthor)
router.post('/blogs',createBlog)

router.get('/blogs',blogs)
router.get('/filter',filterBlogs)

router.put('/blogs/:blogId',updateBlog)

router.delete('/blogs/:blogId', deleteBlog)
router.delete('/blogs', deleteBlogQuery)



module.exports = router;