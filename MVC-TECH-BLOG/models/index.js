const User = require('./User');
const Post = require('./Post');
const Step = require('./Step');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasOne(Step, {
    foreignKey: 'Post_id'
});

Step.belongsTo(Post, {
    foreignKey: 'Post_id'
});

module.exports = { User, Post, Step };