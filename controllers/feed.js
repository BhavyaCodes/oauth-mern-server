const Post = require("../models/post");
const User = require("../models/user");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    error.data = "unable to fetch posts";
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, body } = req.body;
    const post = new Post({
      userId: req.userId,
      title,
      body,
    });
    const savedPost = await post.save();
    const currentUser = await User.findById(req.userId);
    currentUser.posts.push(savedPost);
    await currentUser.save();
    res.status(201).send({
      success: true,
    });
  } catch (error) {
    error.data = "Post not created";
    next(error);
  }
};
