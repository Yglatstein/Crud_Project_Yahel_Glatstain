import exp from 'constants';
import express from 'express';
import { getAllPosts, deletePostByID, postAddNewPost, getPostById, patchUpdatePost, searchPost} from './postsCtrl';

const router = express.Router();

router
.get("", getAllPosts)
.get("/:id", getPostById)
.post("/add", postAddNewPost)
.post("/search", searchPost)
.patch("/:id", patchUpdatePost)
.delete("/:id", deletePostByID)



export default router;