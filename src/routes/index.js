const express = require('express')
const router = express.Router();
const {createAuthor} = require("../controller/authorController")

const {deleteBlog,deleteBlog1} = require("../controller/delete")

const {createBlog,blogs,filterBlogs} = require('../controller/blogs')

router.post('/authors',createAuthor)

router.post('/blogs',createBlog)

router.get('/blogs',blogs)
router.get('/filter',filterBlogs)


router.post('/authors',createAuthor)

router.delete('/blogs/:blogId', deleteBlog)
router.delete('/blogs', deleteBlog1)



module.exports = router;