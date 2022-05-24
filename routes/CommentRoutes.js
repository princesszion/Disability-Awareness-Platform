import express from 'express';
import {getComments, getCommentById, getCommentsByRoot, postComment, postSubComment} from "../controllers/CommentController.js"

const router = express.Router();
router.use(express.static('public'));
router.get('/', getComments);
  
router.get('/root/:rootId', getCommentsByRoot);
  
router.get('/:id', getCommentById);
  
router.post('/', postComment);

router.post('/sub', postSubComment);

export default router