import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  patchPost,
  deletePost
} from "../models/post.model.js";


// CREATE POST
export const createPostController = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || !age) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const result = await createPost({ name, description, age });

    return res.status(201).json({
      message: "Post created",
      postId: result.insertId
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};


// GET ALL POSTS
export const getAllPostsController = async (req, res) => {
  try {
    const posts = await getAllPosts();

    return res.status(200).json(posts);

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};


// GET POST BY ID
export const getPostByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await getPostById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    return res.status(200).json(post);

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};


// UPDATE POST (PUT)
export const updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, age } = req.body;

    if (!name || !description || !age) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const result = await updatePost(id, { name, description, age });

    return res.status(200).json({
      message: "Post updated successfully",
      affectedRows: result.affectedRows
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};


// PATCH POST
export const patchPostController = async (req, res) => {
  try {
    const { id } = req.params;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "No fields provided for update"
      });
    }

    const result = await patchPost(id, req.body);

    return res.status(200).json({
      message: "Post updated successfully",
      affectedRows: result.affectedRows
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};


// DELETE POST
export const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deletePost(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    return res.status(200).json({
      message: "Post deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};