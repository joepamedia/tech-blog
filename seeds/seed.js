const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  // making users
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  // add user id to each post
  const formattedPosts = () => {
    const updatedPost = [];
    postData.forEach((element) => {
      element.user_id = users[Math.floor(Math.random() * users.length)].id;
      updatedPost.push(element);
    });
    return updatedPost;
  };
  const updatedPosts = formattedPosts();
  //  making posts
  const posts = await Post.bulkCreate(updatedPosts, {
    individualHooks: true,
    returning: true,
  });

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      post_id: Math.ceil(Math.random() * commentData.length),
    });
  }

  process.exit(0);
};

seedDatabase();
