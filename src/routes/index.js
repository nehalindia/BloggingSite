const express = require('express')
const router = express.Router();
const {createAuthor} = require("../controller/authorController")
const deleteB = require("../controller/delete")

router.post('/authors',createAuthor)

router.delete('/blogs/:blogId', deleteB.deleteBlog)
router.delete('/blogs', deleteB.deleteBlog1)



module.exports = router;