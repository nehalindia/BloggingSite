const express = require('express')
const router = express.Router();

const {createAuthor,login}= require('../controller/authorController')
const {createBlog,blogs,updateBlog,deleteBlog,deleteBlogQuery} = require('../controller/blogController')
const {auth,auth2,hashPass,auth3,auth4} = require('../middleware/auth')

router.post('/authors',hashPass,createAuthor)
router.post('/login', auth,login)
router.post('/blogs',auth3,createBlog)

router.get('/blogs',auth3,blogs)
router.put('/blogs/:blogId',auth3,updateBlog)

router.delete('/blogs/:blogId',auth3, deleteBlog)
router.delete('/blogs',auth3, deleteBlogQuery)



module.exports = router;