const express = require('express');
const router = express.Router();

const {createPost,readPost,updatePost,deletePost} = require('../controllers/post/CRUD');

router.post('/createpost',createPost);
router.get('/readpost',readPost);
router.put('/updatepost',updatePost);
router.delete('/deletepost/:id',deletePost);

module.exports = router