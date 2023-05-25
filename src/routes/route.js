const express = require('express')
const router = express.Router();
const {createAuthor} = require("../controller/authorController")
const { blogs, filterBlogs, updateBlog } = require("../controller/blogController")

router.post('/authors',createAuthor)
router.post('/authors',createAuthor)
router.get('/blogs',blogs)
router.get('/filterblogs',filterBlogs)
router.put('/blogs/:blogId',updateBlog)



module.exports = router;