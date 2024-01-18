import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = Router();

router.route("/").get(protect, getAllPosts).post(protect, createPost);

router
  .route("/:id")
  .get(protect, getPost)
  .patch(protect, updatePost)
  .delete(protect, deletePost);

export default router;
