const express = require('express')
const router = express.Router();
const {createAuthor} = require("../controller/authorController")

router.post('/authors',createAuthor)



module.exports = router;