import express from 'express';
import {voteComment,getCommentVotes} from "../controllers/VotingController.js"

const router = express.Router();

router.get('/:commentId/:direction', voteComment);

router.post('/', getCommentVotes);
router.use(express.static('public'));
export default router;