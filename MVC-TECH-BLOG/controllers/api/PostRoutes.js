const express = require('express');
const router = express.Router();
const PostController = require('./PostControllers');

// GET all Posts
router.get('/', PostController.getAllPosts);

// GET a single Post by ID
router.get('/:id', PostController.getPostById);

// POST a new Post
router.post('/', PostController.createPost);

// DELETE a Post
router.delete('/:id', PostController.deletePost);

module.exports = router;