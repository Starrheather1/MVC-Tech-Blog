const express = require('express');
const router = express.Router();
const { Post } = require('../models');

router.get('/', async (req, res) => {

  try {
    // Retrieve all Posts from the database associated with the logged-in user
    let Posts = await Post.findAll();

    // If no Posts found, render the 'Posts' view with a message
    if (Posts.length === 0) {
      return res.render('home', { loggedIn: req.session.logged_in, Posts });
    }

    // Map the Posts to get plain data
    Posts = Posts.map(Post => Post.get({ plain: true }));

    // Render the 'Posts' view with the Posts data
    res.render('home', { loggedIn: req.session.logged_in, Posts });
  } catch (error) {
    console.error('Error fetching Posts:', error);
    res.status(500).render('error', { error: 'An error occurred while fetching Posts.' });
  }


});

router.get('/dashboard', (req, res) => {
  res.render('dashboard', { loggedIn: req.session.logged_in });
});

// login get route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// signup get route
router.get('/signup', async (req, res) => {
  res.render('signup');
})

module.exports = router;
