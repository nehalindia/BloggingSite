const express = require('express')
const router = express.Router();
const {createAuthor} = require("../controller/authorController")

const {deleteBlog,deleteBlog1} = require("../controller/deleteController")

const {createBlog,blogs,filterBlogs,updateBlog} = require('../controller/blogController')

router.post('/authors',createAuthor)

router.post('/blogs',createBlog)

router.get('/blogs',blogs)
router.get('/filter',filterBlogs)


router.post('/authors',createAuthor)

router.delete('/blogs/:blogId', deleteBlog)
router.delete('/blogs', deleteBlog1)

router.put('/blogs/:blogId',updateBlog)

module.exports = router;