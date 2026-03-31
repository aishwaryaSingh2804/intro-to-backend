import { Router } from "express";
import {
  createPostController,
  getAllPostsController,
  getPostByIdController,
  updatePostController,
  patchPostController,
  deletePostController
} from "../controllers/post.controller.js";

const router = Router();

router.route("/create").post(createPostController);
router.route("/getPosts").get(getAllPostsController);
router.route("/:id").get(getPostByIdController);
router.route("/:id").put(updatePostController);
router.route("/:id").patch(patchPostController);
router.route("/:id").delete(deletePostController);

export default router;