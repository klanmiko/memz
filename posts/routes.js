const express = require('express');
var router = express.Router();
var postController = require('./controller.js');
router.post('/', postController.get);
router.post('/:id', postController.getPost);
module.exports = router;
