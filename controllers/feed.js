const Post = require("../models/post");

exports.getPosts = (req, res, next) => {};

exports.createPost = async (req, res, next) => {
  try {
    const { title, body } = req.body;
    const post = new Post({
      userId: req.userId,
      title,
      body,
    });
    const savedPost = await post.save();
    res.status(201).send({
      success: true,
    });
  } catch (error) {
    error.data = "Post not created";
    next(error);
  }
};
