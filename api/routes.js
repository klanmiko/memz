const express = require('express');
var router = express.Router();
var submitController = require('./submit/controller.js');
var multer = require('multer');
var path = require('path')
var upload = multer({dest: path.join(__dirname, "submit/uploads")});
const userService = require('../db/users.js');
router.post('/submit', upload.single('post'), submitController.post);
router.post('/register', submitController.register);
module.exports = router;
