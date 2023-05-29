const express = require('express')
const router = express.Router();

const {createAuthor,login}= require('../controller/authorController')
const {createBlog,blogs,updateBlog,deleteBlog,deleteBlogQuery} = require('../controller/blogController')
const {auth,auth2,hashPass} = require('../middleware/auth')

router.post('/authors',hashPass,createAuthor)
router.post('/login', auth,login)
router.post('/blogs',createBlog)

router.get('/blogs',blogs)
router.put('/blogs/:blogId',auth2,updateBlog)

router.delete('/blogs/:blogId',auth2, deleteBlog)
router.delete('/blogs',auth2, deleteBlogQuery)



module.exports = router;