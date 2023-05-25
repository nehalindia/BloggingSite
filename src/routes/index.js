const express = require('express')
const router = express.Router();
const {createAuthor} = require("../controller/authorController")
const {createBlog,blogs,filterBlogs} = require('../controller/blogs')

router.post('/authors',createAuthor)

router.post('/blogs',createBlog)

router.get('/blogs',blogs)
router.get('/filter',filterBlogs)



module.exports = router;