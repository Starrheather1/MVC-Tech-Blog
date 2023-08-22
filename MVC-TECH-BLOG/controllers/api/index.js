const express = require('express');
const router = express.Router();
const PostRoutes = require('./PostRoutes');
const userRoutes = require('./UserRoutes');

//maybe change to /Post and /user
router.use('/posts', PostRoutes);
router.use('/users', userRoutes);

module.exports = router;
