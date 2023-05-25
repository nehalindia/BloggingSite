const express = require('express')
const router = express.Router();

const {createBlog,blogs,filterBlogs,updateBlog,createAuthor,deleteBlog,deleteBlogQuery} = require('../controller/blogController')

router.post('/authors',createAuthor)

router.post('/blogs',createBlog)

router.get('/blogs',blogs)
router.get('/filter',filterBlogs)

router.delete('/blogs/:blogId', deleteBlog)
router.delete('/blogs', deleteBlogQuery)

router.put('/blogs/:blogId',updateBlog)

module.exports = router;