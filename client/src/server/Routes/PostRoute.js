import  express  from "express";
import { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost, getallPost } from "../Controllers/PostController.js";
const router = express.Router()

router.post('/', createPost)
router.get('/:id', getPost )
router.put('/:id', updatePost )
router.delete("/:id", deletePost)
router.put("/:id/like", likePost)
router.get("/:id/timeline", getTimelinePosts)
router.get('/fetch/all', getallPost )
export default router;