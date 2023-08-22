const { Post, Step } = require('../../models');

const PostController = {
    getAllPosts: async (req, res) => {
        
        try {
            // Retrieve all Posts from the database associated with the logged-in user
            let Posts = await Post.findAll();

            // If no Posts found, render the 'Posts' view with a message
            if (Posts.length === 0) {
                return res.render('Posts', { loggedIn: req.session.logged_in, Posts });
            }

            // Map the Posts to get plain data
            Posts = Posts.map(Post => Post.get({ plain: true }));

            // Render the 'Posts' view with the Posts data
            res.render('Posts', { loggedIn: req.session.logged_in, Posts });
        } catch (error) {
            console.error('Error fetching Posts:', error);
            res.status(500).render('error', { error: 'An error occurred while fetching Posts.' });
        }
    },

    getPostById: async (req, res) => {
        if (!req.session.user_id) {
            return res.render("unauthorized")
        }
        try {
            // retrieve a single Post by ID from the database
            const PostID = req.params.id;
            const Post = await Post.findByPk(PostID, {
                include: [
                    {
                        model: Step,
                    }
                ]
            });
            const PostSer = Post.get({ plain: true });
            // check if the Post exists
            if (!Post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            // send the Post as a JSON response
            res.render('singlePost', PostSer);
        } catch (error) {
            console.error('Error fetching Post by ID:', error);
            res.status(500).json({ error: 'Unable to fetch Post' });
        }
    },

    createPost: async (req, res) => {
        if (!req.session.user_id) {
            return res.render("unauthorized")
        }
        try {
            console.log(req.body)
            // extract Post details from the request body
            const { title, content } = req.body;
            let user_id = req.session.user_id
            // create a new Post in the database
            const newPost = await Post.create({
                title, content, user_id
                // you may also associate the Post with the currently logged-in user if you have authentication implemented.
            });

            // send the newly created Post as a JSON response
            res.redirect("/");
        } catch (error) {
            console.error('Error creating Post:', error);
            res.status(500).json({ error: 'Unable to create Post' });
        }
    },

    deletePost: async (req, res) => {
        if (!req.session.user_id) {
            return res.render("unauthorized")
        }
        try {
            // Retrieve the Post with the given ID
            const Post = await Post.findOne({ where: { id: req.params.id } });

            // Check if the Post exists and if it belongs to the logged-in user
            if (!Post || Post.user_id !== req.session.user_id) {
                return res.status(404).json({ error: 'Post not found' });
            }

            // Delete the Post
            await Post.destroy();

            // Redirect to the Posts page
            res.redirect('/api/Posts');
        } catch (error) {
            console.error('Error deleting Post:', error);
            res.status(500).json({ error: 'Unable to delete Post' });
        }
    },
};

module.exports = PostController;