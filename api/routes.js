const express = require('express');
var router = express.Router();
var submitController = require('./submit/controller.js');
var multer = require('multer');
var path = require('path')
var upload = multer({dest: path.join(__dirname, "/submit/uploads")});
var postController = require('./postController.js');
const userService = require('../db/users.js');
router.post('/submit',upload.single('post'), submitController.post);
function rejectNoUser(req, res, next){
    if(!req.user) return res.status(403).send("not logged in");
    next();
}
router.get('/image/:id', submitController.file);
router.post('/register', submitController.register);
router.get('/posts', postController.get);
router.get('/posts/:id', postController.getPost);
router.put('/posts/:id/vote', rejectNoUser, postController.vote);
router.post('/posts/:id/comment', rejectNoUser, postController.comment.create);
router.put('/posts/:id/comment/:commentId/vote', rejectNoUser, postController.comment.vote);
router.post('/posts/:id/comment/:commentId/reply', rejectNoUser, postController.comment.reply);
module.exports = router;
